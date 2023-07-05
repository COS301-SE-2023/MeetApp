import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonText } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'capstone-meet-app-login',
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 // providers: [ApiService],
})
export class LoginComponent {
  loginForm!: FormGroup;
  email = ''; 
  password= ''; 

  constructor( private router: Router, private formBuilder: FormBuilder/*, private apiService: ApiService*/) {

   
  }
  onCreate() {
    this.router.navigate(['/signup']);
  }
 login(email: string,password: string) {
  console.log('email:', email);
  console.log('password',password)

   
  }
 /* onSubmit() {
    if (this.loginForm.valid) {
      const loginInfo = {
        username: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      console.log('Form values:', loginInfo);

      const result = this.apiService.loginMock(loginInfo);

      if (result) {
        // Login success
        console.log('Login successful');
        console.log(result);
        this.router.navigate(['/home']);
       // this.router.navigate(['/signup']);
      } else {
        // Login failed
        console.log('Login failed');
      }
    }
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }*/
}
