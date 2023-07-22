import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service'
//import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {ApiService } from '../../../../../shared service/api.service';
//import { Injectable } from '@angular/core';
import { HttpClient, /*HttpHeaders*/ } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { service,/*ServicesModule*/} from '@capstone-meet-app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';



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
  //userType: string | undefined;
 
  valid=true;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: service,private service:service,private alertController: AlertController,
    private toastController: ToastController,private activatedRoute: ActivatedRoute) {}


  firstname="";
  username='';
  lastname="";
  email = ''; 
  password= '';   

  signupData_user:any;

  userSignup_payload= {
    access_token:'',
    message:''
  };

  
  signupData_org:any;

  orgSignup_payload= {
    access_token:'',
    message:''
  };


  //user type from the welcome page 
  userType:string|null = '';

  confirmpassword="";
  
  access:string|null='';
  
  submitClicked = false;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmpassword: ['', Validators.required]
    });
     
    
  
    //this.SignUpUser('Scoot','Henderson','HAX0808','Akani43@gmail.com','admin08','0789657845','Pretoria','');
    //this.SignUpOrg('Dave','Anderson','EventforUS','EventforUS@gmail.com','Us1234','0153425467','We do events any type of event on an affordable rate');
    
    //get the userType from the Welcome page 
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
      console.log('User Type:', this.userType);
    });

    const access_token=this.apiService.getToken();
    console.log('access',access_token);

  }
  
 

  //SignUp for a User
  async SignUpUser(username:string,password:string,profilePicture:string,region:string)
  {
    await this.apiService.createUser(username,password,profilePicture,region).subscribe((response) => {
      console.log('API response:', response);
      this.signupData_user=response;
      this.userSignup_payload=this.signupData_user
    });
  }

  
  //SignUp for a Organisation 
  async SignUpOrg(username:string,name:string,password:string,events:string[])
  {
    await this.apiService.createOrginiser(username,password,name,events).subscribe((response) => {
      console.log('API response:', response);
      this.signupData_org=response;
      this.orgSignup_payload=this.signupData_org
    });
  }

  /*
  checkPasswordStrength(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
  }
  */

  

  signup()
  {
    const firstname = this.loginForm.value.firstname;
    const lastname = this.loginForm.value.lastname;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const confirmpassword = this.loginForm.value.confirmpassword;
    const username=this.loginForm.value.username;



    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
    
    if (!strongRegex.test(password) && this.loginForm.invalid) {   
      this.valid=false;
    }

    
    

    
    //this.SignUpUser(firstname,lastname,username,email,password,'0789657845','Pretoria','');
    //this.SignUpOrg(firstname,lastname,username,email,password,'0153425467','We do events any type of event on an affordable rate');
    
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    console.log(confirmpassword);

}
async showErrorAlert(message: string) {
  const alert = await this.alertController.create({
    header: 'Account Created',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
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
  
  onSubmit(username: string, email: string,phoneNo:string, password: string,confirmPass:string) {
   /* this.signupService.signup(username, email,phoneNo, password,confirmPass).subscribe(
      {
        complete: () => console.info('signup successfull') ,
        error: (err: any) => {
          // Handle any errors that occur during the request
          console.error(err);
        }
      }
      
    );*/
      
  }
    
  /*onSubmit() {
    if (this.loginForm.valid) {
      const loginInfo = {
        username: this.loginForm.get('name')?.value,
        email: this.loginForm.get('email')?.value,
        phoneNumber: this.loginForm.get('phoneNumber')?.value,
        password: this.loginForm.get('password')?.value,
        confirmPassword: this.loginForm.get('confirmPassword')?.value
      };
      console.log("kman");
      console.log('Form values:', loginInfo);

      const result = this.apiService.loginMock(loginInfo);
      console.log("kman");
      if (result) {
        // Login success
        console.log('Login successful');
        this.router.navigate(['/home']);
        console.log(result);
        // this.router.navigate(['/signup']);
      } else {
        // Login failed
        console.log('Login failed');
      }
    }

    

  }*/


  onSignUp() {
    this.router.navigate(['/signup']);
  }
}






  
