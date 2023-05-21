import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'capstone-meet-app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent {
   
  loginForm!: FormGroup;
  

  constructor(private router: Router ,private formBuilder: FormBuilder) {}
  
 
  ngOninit():void {
    
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSignUp(){
   
   
     
    //this.router.navigate( ['/signup']);
  };

}

