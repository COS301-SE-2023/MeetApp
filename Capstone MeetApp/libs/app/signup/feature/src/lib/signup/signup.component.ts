import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiService } from '../../../../../shared service/api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'capstone-meet-app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ApiService]
})

export class SignupComponent {
   
  loginForm!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
        
    });
    
  }

  onSubmit() {
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
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }
}






