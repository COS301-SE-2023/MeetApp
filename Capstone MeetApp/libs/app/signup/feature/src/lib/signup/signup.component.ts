import { Component , ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { service} from '@capstone-meet-app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'capstone-meet-app-signup',
  standalone: true,
  imports: [CommonModule,IonicModule , FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [service,HttpClient]
})

export class SignupComponent {
  @ViewChild('popover') Popover: any;
  
  loginForm!: FormGroup;
  valid=true;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: service,private alertController: AlertController,
    private toastController: ToastController,private activatedRoute: ActivatedRoute,private location: Location, public loadingController: LoadingController) {}
    selectedOptions: string[] = [];
  options: string[] = ['Concert', 'Sports', 'Conference', 'Charity','Expos','Trade Shows']; 
  user='Not set';
  events:any =[];
  firstname="";
  username='';
  lastname="";
  email = ''; 
  password= '';   
  region='';
  OTP = 0;

  isOpen=false;

  valid_user=false;
  valid_pass=false;
  valid_passregex=false;
  valid_email=false;

  data_organiser= [{
    _id:'',
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    orgDescription:'',
    events:[]
  }];

  data_user= [{
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    region:'',
    profilePicture:''
  }];

  username_user=[''];
  username_org=[''];

  userSignup_payload= {
    access_token:'',
    message:''
  };

  orgSignup_payload= {
    access_token:'',
    message:''
  };

  verify_payload={
    payload: null, 
    message: ''
  }

  userType:string|null = '';

  confirmpassword="";
  
  access:string|null='';
  
  default_pp='https://images-ext-1.discordapp.net/external/P8I_PanYzrNyOtLaGFi2svOw_odBwa1eNGDXVBvTOVc/https/www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png?width=672&height=589'
  submitClicked = false;
  loader=true;
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
    });

    if(this.userType=='user')
    {
      this.loginForm = this.formBuilder.group({
        name:['', Validators.required],
        username: ['', Validators.required],
        region:['', Validators.required],
        selectedOptions: [[]],
        password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(this.passwordPattern)]],
        confirmpassword: ['', Validators.required],
        email:['',Validators.pattern(this.emailPattern)]

        });
        

    }
    else if(this.userType=='organiser')
    {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        name: ['', Validators.required],
        email:['',Validators.pattern(this.emailPattern)]
        });
    }

    this.validateUsername();
    setTimeout(()=>{                           
      this.loader = false;
  }, 400);

  }

  goBack() {
    this.location.back();
  }

  async SignUpUser(emailAddress:string,username:string,password:string,profilePicture:string,region:string,interests: string[])
  {
    await this.apiService.createUser(emailAddress,username,password,profilePicture,region,interests).subscribe((response:any) => {
      this.userSignup_payload=response;
      this.apiService.setToken(this.userSignup_payload.access_token);
    });
  }

  async SignUpOrg(emailAddress:string,username:string,name:string,password:string,events:string[])
  {
    await this.apiService.createOrginiser(emailAddress,username,password,name,events).subscribe((response:any) => {
      this.orgSignup_payload=response;
      this.apiService.setToken(this.orgSignup_payload.access_token);
    });
  }

 
  signup(){
    const password = this.loginForm.value.password;
    const username=this.loginForm.value.username;
   
    const name =this.loginForm.value.name;
    const email=this.loginForm.value.email;
    const confirmpassword = this.loginForm.value.confirmpassword;
   
    const regionControl = this.loginForm.get('region');
    const selectedOptionsControl = this.loginForm.get('selectedOptions');
  
    
    if (regionControl && selectedOptionsControl) {
      
      const region = regionControl.value;
      const selectedOptions = selectedOptionsControl.value;
  
     
    
      if(this.userType=='user' )
      {

        if(email!==null && username!==null && region!==null && password!==null && confirmpassword!==null && this.selectedOptions!==null)
        {
          this.valid=true;
              
            if(this.username_user.includes(username)==false) 
            {
              this.valid_user=true;
            }
            
            else
            {
              this.valid_user=false;
            }
            console.log('password',password);
            console.log('confirmpassword',confirmpassword);

            if(password==confirmpassword)
            {
              this.valid_pass=true;
            }
            else
            {
              this.valid_pass=false;
            }
            

            if(this.checkPasswordStrength(password)==true)
            {
              this.valid_passregex=true;
            }
            else
            {
              this.valid_passregex=false;
            }

            if(this.checkEmail(email)==true){
              this.valid_email=true;
            }else{
              this.valid_email=false;
            }

            console.log('Password is equal to CP',this.valid_pass);
            console.log('Regex',this.valid_passregex);
            console.log('Valid User name ',this.valid_user);

            if(this.valid_pass && this.valid_user && this.valid_passregex && this.valid_email)
            {
              console.log(region);
              console.log(this.selectedOptions);
              //this.SignUpUser(email,username,password,this.default_pp,region,selectedOptions);
              this.sendEmailVerification(email,'User');
            }

            
          }
        }
        else{
          this.valid=false;
        }

        this.isvalid();
        
  }
  else
  {
    
    
    if(this.userType=='organiser'){

      if(username!==null && name!==null && password!==null)
      {
        this.valid=true;
          if(this.username_org.includes(username)==false) 
          {
            this.valid_user=true;
          }
          else
          {
            this.valid_user=false;
          }

          if(this.checkEmail(email)==true){
            this.valid_email=true;
          }else{
            this.valid_email=false;
          }

          console.log('password',password);
          console.log('confirmpassword',confirmpassword);

          if(password)
          {
            this.valid_pass=true;
          }
          else
          {
            this.valid_pass=false;
          }
          

          if(this.checkPasswordStrength(password)==true)
          {
            this.valid_passregex=true;
          }
          else
          {
            this.valid_passregex=false;
          }

          
          console.log('Password is equal to CP',this.valid_pass);
          console.log('Regex',this.valid_passregex);
          console.log('Valid User name ',this.valid_user);
          console.log('valid email',this.valid_email);
          if(this.valid_pass && this.valid_user && this.valid_passregex )
          {
          
            //this.SignUpOrg(email,username,name,password, this.events)
            this.sendEmailVerification(email,'Organiser');
          
          }

      }
      else
      {
        this.valid=false;
      }

      this.isvalid();
    
    }
    
  }

  
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });

    await toast.present();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Account Created',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showErrorAlertVal(message: string) {
    const alert = await this.alertController.create({
      header: 'SignUp Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  onCreate() {
    this.router.navigate(['/signup', { userType: this.userType }]);
  }

   async isvalid()
  {

    console.log('valid',this.valid);
    
      if(this.valid)
      {

        if(this.valid_pass && this.valid_user && this.valid_passregex)
        {
          //this.showPopover = true;
          
        }

        if(this.valid_user==false)
        {
          const errorMessage = 'User Already Taken';
          this.showErrorAlertVal(errorMessage); 
          
        }

        if(this.valid_pass==false)
        {
          const errorMessage = 'Invalid Password';
          this.showErrorAlertVal(errorMessage); 
         
        }
        

        if(this.valid_passregex==false)
        {
          const errorMessage = 'Password strength low. Need one Uppercase latter, atleast 3 lowercase , atleast 3 numbers and a special character [ @$!%*?& ]';
          this.showErrorAlertVal(errorMessage); 
         
        }

        
        if(this.valid_email==false){
          const errorMessage="One or more characters for the (username) before the @ symbol. should contain domain e.g. com , org etc...";
          this.showErrorAlertVal(errorMessage);
        }

        
        
      }
      else
      {
        const errorMessage = 'incomplete form';
        this.showErrorToast(errorMessage); 
      }
      


  }
  
  async verify()
  {
    const email=this.loginForm.value.email;
    if(this.OTP==0)
    {
      const errorMessage = 'Please Enter OTP';
      this.showErrorAlertVal(errorMessage); 
    }
    else
    {
      const loading = await this.loadingController.create({
        message: 'Loading...',
        });
        await loading.present();
  
        // Simulate some asynchronous operation
        setTimeout(() => {
          loading.dismiss();
  
          if(this.userType=='organiser'){
            this.verifyEmailVerificationOrg(email,this.OTP);

          }
  
          if(this.userType=='user'){
            this.verifyEmailVerificationUser(email,this.OTP);
  
        }
      
        }, 3000);
  
      loading.present();
    }

  }

  onSignUp() {
    this.router.navigate(['/home',{ userType: this.userType }]);
  }

  checkPasswordStrength(password:string)
  {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }
  checkEmail(mail:string){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(mail);
  }
  setUserType(userType: string): void {
    this.router.navigate(['/login', { userType }]);
  }

  validateUsername()
  {
    this.apiService.getAllUsers().subscribe((response: any) => { 
      this.data_user = response;
      for (let i = 0; i < this.data_user.length; i++) {
        this.username_user[i]=this.data_user[i].username;
      }
    });
  
    this.apiService.getAllOrganisers().subscribe((response: any) => { 
      this.data_organiser = response;
      for (let i = 0; i < this.data_organiser.length; i++) {
        this.username_org[i]=this.data_organiser[i].username;
      }
    });  
  }
 
  sendEmailVerification(emailAddress:string,type:string)
  {
    this.apiService.sendEmailVerification(emailAddress,type).subscribe((response: any) => { 
     console.log(response);
    });
  }

  verifyEmailVerificationUser(emailAddress:string,code:number)
  {
    this.apiService.verifyEmailVerification(emailAddress,code,'User').subscribe((response: any) => { 
      console.log(response);
      this.verify_payload=response;

      const password = this.loginForm.value.password;
      const username=this.loginForm.value.username;
      const email=this.loginForm.value.email;

      const regionControl = this.loginForm.get('region');
      const selectedOptionsControl = this.loginForm.get('selectedOptions');
  
  
      if(this.verify_payload.message=='Account verified!')
      {
        this.Popover.dismiss();
        if (regionControl && selectedOptionsControl) {
      
          const region = regionControl.value;
          const selectedOptions = selectedOptionsControl.value;
          this.SignUpUser(email,username,password,this.default_pp,region,selectedOptions); 
          this.onSignUp();
        }
      }

     });
  }

  verifyEmailVerificationOrg(emailAddress:string,code:number,)
  {
    this.apiService.verifyEmailVerification(emailAddress,code,'Organiser').subscribe((response: any) => { 
      console.log(response);
      this.verify_payload=response;

      const password = this.loginForm.value.password;
      const username=this.loginForm.value.username;
    
      const name =this.loginForm.value.name;
      const email=this.loginForm.value.email;
   
   

      if(this.verify_payload.message=='Account verified!')
      {
        this.Popover.dismiss();
        this.SignUpOrg(email,username,name,password, this.events);
        this.onSignUp();
      }
     });
  }
  

  presentPopover(e: Event) {
    if(this.valid)
      {

        if(this.valid_pass && this.valid_user && this.valid_passregex)
        {
          this.Popover.event = e;
          this.isOpen = true;       
        }
      }
    
  }

}






  






  
