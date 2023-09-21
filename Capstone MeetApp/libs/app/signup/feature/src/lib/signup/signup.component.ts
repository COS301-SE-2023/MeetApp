import { Component } from '@angular/core';
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
  
  loginForm!: FormGroup;
  valid=true;
  valid_user=false;
  valid_pass=false;
  valid_passregex=false;
 

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: service,private alertController: AlertController,
    private toastController: ToastController,private activatedRoute: ActivatedRoute,private location: Location, public loadingController: LoadingController) {}
    selectedOptions: string[] = [];
  options: string[] = ['Concert', 'Sports', 'Conference', 'Charity','Expos','Trade Shows']; 

  events:any =[];
  firstname="";
  username='';
  lastname="";
  email = ''; 
  password= '';   
  region='';

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

  userType:string|null = '';

  confirmpassword="";
  
  access:string|null='';
  
  submitClicked = false;
  loader=true;

  ngOnInit() {
     
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
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
    });

    if(this.userType=='user')
    {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        region:['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmpassword: ['', Validators.required]
        });

    }
    else if(this.userType=='organiser')
    {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        name: ['', Validators.required]
        });
    }


    setTimeout(()=>{                           
      this.loader = false;
  }, 1000);


  }

  goBack() {
    this.location.back();
  }

  async SignUpUser(username:string,password:string,profilePicture:string,region:string)
  {
    await this.apiService.createUser(username,password,profilePicture,region).subscribe((response:any) => {
      this.userSignup_payload=response;
      this.apiService.setToken(this.userSignup_payload.access_token);
    });
  }

  async SignUpOrg(username:string,name:string,password:string,events:string[])
  {
    await this.apiService.createOrginiser(username,password,name,events).subscribe((response:any) => {
      this.orgSignup_payload=response;
      this.apiService.setToken(this.orgSignup_payload.access_token);
    });
  }

  
  signup(){
    const password = this.loginForm.value.password;
    const username=this.loginForm.value.username;
    const region=this.loginForm.value.region;
    const name =this.loginForm.value.name;
    const confirmpassword = this.loginForm.value.confirmpassword;

      console.log(this.loginForm.invalid);

      if(this.loginForm.invalid) {  
        this.valid=false;
      }
      else 
      {
        this.valid=true;
        if(this.userType=='user' )
        {

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

          console.log('Password is equal to CP',this.valid_pass);
          console.log('Regex',this.valid_passregex);
          console.log('Valid User name ',this.valid_user);

          if(this.valid_pass && this.valid_user && this.valid_passregex)
          {
            this.SignUpUser(username,password,'',region);
          }

          
        }
        else  if(this.userType=='organiser'){

          if(this.username_org.includes(username)==false) 
          {
            this.valid_user=true;
          }
          else
          {
            this.valid_user=false;
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

          if(this.valid_pass && this.valid_user && this.valid_passregex)
          {
          
            this.SignUpOrg(username,name,password, this.events)
          
          }

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

  onCreate() {
    this.router.navigate(['/login']);
  }

  async isvalid()
  {

    const loading = await this.loadingController.create({
      message: 'Loading...',
      });
      await loading.present();

      // Simulate some asynchronous operation
      setTimeout(() => {
      loading.dismiss();
      if(this.valid)
      {

        if(this.valid_pass && this.valid_user && this.valid_passregex)
        {
          
          const errorMessage = 'Account Created Successfully';
          this.showErrorAlert(errorMessage); 
          this.onSignUp();
        }

        if(this.valid_user==false)
        {
          const errorMessage = 'User Already Taken';
          this.showErrorAlert(errorMessage); 
          
        }

        if(this.valid_pass==false)
        {
          const errorMessage = 'Invalid Password';
          this.showErrorAlert(errorMessage); 
         
        }
        

        if(this.valid_passregex==false)
        {
          const errorMessage = 'Password must strength low';
          this.showErrorAlert(errorMessage); 
         
        }


        
      }
      else
      {
        const errorMessage = 'incomplete form';
        this.showErrorToast(errorMessage); 
      }
      }, 3000);

    


  }
  
  onSignUp() {
    this.router.navigate(['/home']);
  }

  checkPasswordStrength(password:string)
  {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }


}






  
