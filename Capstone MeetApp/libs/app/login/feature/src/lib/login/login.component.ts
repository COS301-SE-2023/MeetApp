import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service';
//import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user,organiser,service,ServicesModule} from '@capstone-meet-app/services';
import { ConnectableObservable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';


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
  email = ''; 
  password= ''; 

  constructor( private router: Router, private formBuilder: FormBuilder, private apiService: service,  private alertController: AlertController,
    private toastController: ToastController) { 
    
  }

  
  //storing the users data
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

  userLogin_payload= {
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    region:'',
    profilePicture:'',
    message:''
  };

  orgLogin_payload= {
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    region:'',
    profilePicture:'',
    message:''
  };

  //stores the login response for user
  loginData_user:any;

    
  //storing the organisers data  
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

  //stores the login response for user
  loginData_organiser:any;


  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'login Successful',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
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
  
  
  //Initialise data for User and Organiser using the services 
  async ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    await this.apiService.getAllUsers().subscribe((response: any) => { 
      console.log(response);
      this.data_user = response;  
    });

    await this.apiService.getAllOrganisers().subscribe((response: any) => { 
      console.log(response);
      this.data_organiser = response;
      console.log(this.data_organiser[0]._id);
    });
    
    
  }
  valid=true;

  //Login Function for User
  async LogInUser(username:string,password:string)
  {
    await this.apiService.authUser(username,password ).subscribe((response) => {
      console.log('API response:', response);
      this.loginData_user=response;
      this.userLogin_payload=this.loginData_user;
      console.log('message:',this.userLogin_payload.message);
    });

   
   

  for (let i = 0; i < this.data_user.length; i++) {

    if((this.data_user[i].username==username || this.data_user[i].email==this.email) && this.data_user[i].password==password)
    {
      const errorMessage = 'you have succesfully logged in';
      this.showErrorAlert(errorMessage); 
      this.router.navigate(['/home']);
      this.valid=false;
    }
    
  }
  if(this.valid)
  {
    const errorMessage = 'wrong username or password';
      this.showErrorToast(errorMessage);
  }
                   
    

  }

  
  
 

  //Login Function for Organisation
  async LogInOrg(username:string,password:string)
  {
    await this.apiService.authOrganiser(username,password ).subscribe((response) => {
      console.log('API response:', response);
      this.loginData_organiser=response;
      this.orgLogin_payload=this.loginData_user;
      console.log('message:',this.orgLogin_payload.message);
    });
  }


  onCreate() {
    this.router.navigate(['/signup']);
  }

  login(email: string,password: string) {
    console.log('email:', email);
    console.log('password',password);
    console.log(this.data_user);
    this.LogInUser(email,password);
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