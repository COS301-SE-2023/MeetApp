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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { service } from '@capstone-meet-app/app/services';



@Component({
  selector: 'capstone-meet-app-signup',
  standalone: true,
  imports: [CommonModule,IonicModule , FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  //providers: [ApiService]
})

export class SignupComponent {
  
  loginForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private service:service/* private apiService: ApiService*/) {}
  userType: string | undefined;

  firstname="";
  lastname="";
  email = ''; 
  password= ''; 


  confirmpassword="";
  
  constructor(private router: Router, private formBuilder: FormBuilder) {}
  submitClicked = false;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmpassword: ['', Validators.required]
    });

     
    this.service.getUserType().subscribe(userType => {
      this.userType = userType;
      console.log('User type:', this.userType);
    });
  }
 
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.checkPasswordStrength
  ]);

  }

  
  
  
 
  valid=true;
  signup()
  {
    const firstname = this.loginForm.value.firstname;
    const lastname = this.loginForm.value.lastname;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const confirmpassword = this.loginForm.value.confirmpassword;


    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
    
    if (!strongRegex.test(password) && this.loginForm.invalid) {
      this.valid=false;
    }
    

    
   
console.log(firstname);
console.log(lastname);
console.log(email);
console.log(password);
console.log(confirmpassword);
}
isvalid()
{

  if (this.valid)
  {
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
      
    );
      */
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






