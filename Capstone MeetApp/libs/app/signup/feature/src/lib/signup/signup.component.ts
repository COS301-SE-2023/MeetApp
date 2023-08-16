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
 
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: service,private alertController: AlertController,
    private toastController: ToastController,private activatedRoute: ActivatedRoute,private location: Location) {}
   
  events:any =[];
  firstname="";
  username='';
  lastname="";
  email = ''; 
  password= '';   
  region='';

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

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
     /*  firstname: ['', Validators.required],
   lastname: ['', Validators.required],*/
    username: ['', Validators.required],
   // email: ['', [Validators.required, Validators.email]],
    region:['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmpassword: ['', Validators.required],
    name:['', Validators.required]
    });
     
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
      console.log('User Type:', this.userType);
    });

  }

  goBack() {
    this.location.back();
  }

  async SignUpUser(username:string,password:string,profilePicture:string,region:string)
  {
    await this.apiService.createUser(username,password,profilePicture,region).subscribe((response:any) => {
      console.log('API response:', response);
      this.userSignup_payload=response;
      this.apiService.setToken(this.userSignup_payload.access_token);
      console.log('SignUp Access Token',this.userSignup_payload.access_token);
      console.log('Message',this.userSignup_payload.message);
    });
  }

  async SignUpOrg(username:string,name:string,password:string,events:string[])
  {
    await this.apiService.createOrginiser(username,password,name,events).subscribe((response:any) => {
      console.log('API response:', response);
      this.orgSignup_payload=response;
      this.apiService.setToken(this.orgSignup_payload.access_token);
      console.log('SignUp Access Token',this.orgSignup_payload.access_token);
      console.log('Message',this.orgSignup_payload.message);
    });
  }

  /*
  checkPasswordStrength(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
  }
  */

  valid=true;

  signup(){
    const firstname = this.loginForm.value.firstname;
    const lastname = this.loginForm.value.lastname;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const confirmpassword = this.loginForm.value.confirmpassword;
    const username=this.loginForm.value.username;
    const region=this.loginForm.value.region;
    const name =this.loginForm.value.name;
    // const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
    //!strongRegex.test(password) &&
    if ( this.loginForm.invalid) {  
      const errorMessage = 'choose a stronger password';
      this.showErrorToast(errorMessage); 
      this.valid=false;
    }
    else
    {
      this.valid=true;

    }
    
    if(this.userType=='user' )
    {
        this.SignUpUser(username,password,'',region);
    }
    else  if(this.userType=='organiser'){
      this.SignUpOrg(username,name,password, this.events)
    }

    console.log(name);
    console.log(password);
    console.log(region);
    
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

  isvalid()
  {

    if (this.valid)
    {
      const errorMessage = 'Account Created Successfully';
      this.showErrorAlert(errorMessage); 
      this.router.navigate(['/home']);
    }

  }
  
  onSignUp() {
    this.router.navigate(['/home']);
  }


}






  
