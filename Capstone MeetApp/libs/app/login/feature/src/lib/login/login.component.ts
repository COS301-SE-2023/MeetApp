import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonText } from '@ionic/angular';
import { Router } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service';
import { service,ServicesModule} from '@capstone-meet-app/services';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface User {
  username:string,
  password:string,
  profilePicture:string,
  region:string
}

@Component({
  selector: 'capstone-meet-app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [service,HttpClient],
})
export class LoginComponent {
  loginForm!: FormGroup;
  email = ''; // Initialize the property
  password= ''; // Initialize the property

  constructor( private router: Router, private formBuilder: FormBuilder,private service: service) {}
  
  data= [{
    username:'',
    password:'',
    profilePicture:'',
    region:''
  }];
  
  async ngOnInit() {
    await this.service.getUsers().subscribe((response: any) => { 
      console.log(response);
      this.data = response;
      console.log('This function Works');
      console.log(this.checkAuth('mike_johnson','securepass'));
      
    });
  }

  checkAuth(username?:string , password?:string) : boolean
  {
      let check:boolean=false;

      for (let i = 0; i < this.data.length; i++) {
        const users:User=this.data[i];
        if(users.username==username && users.password==password)
        {
          console.log('User Exist');
          console.log(users);
          check=true;
          break;
        }
      }
      return check;
  }


  login() {
    // Perform any necessary validation or additional processing here

    // Call the login() method of the authentication service
    /*this.authenticationService.login(this.email, this.password)
      .subscribe({
        next: response => {
          // Handle the response from the server
          console.log(response);
        },
        error: error => {
          // Handle any errors that occur during the request
          console.error(error);
        }
      });*/
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
