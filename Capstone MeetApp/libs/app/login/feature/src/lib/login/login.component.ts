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
import { user,organiser,service,ServicesModule} from '@capstone-meet-app/services';

@Component({
  selector: 'capstone-meet-app-login',
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [service,HttpClient],
})
export class LoginComponent {
  loginForm!: FormGroup;
  email = ''; // Initialize the property
  password= ''; // Initialize the property

  constructor( private router: Router, private formBuilder: FormBuilder, private apiService: service) { 
  }

  
  //storing the users data
  data_user= [{
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    interests:[''],
    region:'',
    profilePicture:''
  }];

    
  //storing the organisers data  
  data_organiser= [{
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    orgDescription:'',
    categories:[''],
    events:['']
  }];

  //Initialise data for User and Organiser using the services 
  async ngOnInit() {

    await this.apiService.getAllUsers().subscribe((response: any) => { 
      console.log(response);
      this.data_user = response;  
    });

    await this.apiService.getAllOrganisers().subscribe((response: any) => { 
      console.log(response);
      this.data_user = response;
    });
  }

  //Login Function for User
  checkAuthUser(username?:string , password?:string) : boolean
  {
      let check=false;

      for (let i = 0; i < this.data_user.length; i++) {
        const users:user=this.data_user[i];
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

  //Login Function for Organisation
  checkAuthOrg(username?:string , password?:string) : boolean
  {
      let check=false;

      for (let i = 0; i < this.data_organiser.length; i++) {
        const org:organiser=this.data_organiser[i];
        if(org.username==username && org.password==password)
        {
          console.log('User Exist');
          console.log(org);
          check=true;
          break;
        }
      }
      return check;
  }


  onCreate() {
    this.router.navigate(['/signup']);
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
