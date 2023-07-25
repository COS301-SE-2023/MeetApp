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
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'capstone-meet-app-login',
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [service,HttpClient]
})
export class LoginComponent {
  valid=true;
  loginForm!: FormGroup;
  email = ''; 
  password= ''; 


  constructor( private router: Router, private formBuilder: FormBuilder, private apiService: service,  private alertController: AlertController,
    private toastController: ToastController, private authservice: service,private activatedRoute: ActivatedRoute) { 
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
    user:'',
    access_token:'',
    message:''
  };

  orgLogin_payload= {
    organisation:'',
    access_token:'',
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

  userType:string|null = '';

 

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

    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
      console.log('User Type:', this.userType);
    });
    
      
      
    
    //this.LogInUser('jane_smith','bibo@gmail.com');

    //this.LogInOrg('LTDProevents','marketspass');
  }
  
    
    
  
  

  //Login Function for User
  async LogInUser(username:string,password:string)
  {
    await this.apiService.authUser(username,password ).subscribe((response) => {
      console.log('API response:', response);
      this.loginData_user=response;
      this.userLogin_payload=this.loginData_user;
      console.log('username:',this.userLogin_payload.user)
      console.log('access token:',this.userLogin_payload.access_token)
      this.authservice.setToken(this.userLogin_payload.access_token)
      console.log('message:',this.userLogin_payload.message);
      this.current(this.userLogin_payload.access_token);
      this.getUser(this.userLogin_payload.access_token);
    });

   
   

  for (let i = 0; i < this.data_user.length; i++) {

    if((this.data_user[i].username==username || this.data_user[i].email==this.email) && this.data_user[i].password==password)
    {
      const errorMessage = 'you have succesfully logged in';
      this.showErrorAlert(errorMessage); 
      this.router.navigate(['/home',{ userType: this.userType }]);
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
      this.orgLogin_payload=this.loginData_organiser;
      console.log('username:',this.orgLogin_payload.organisation)
      console.log('access token:',this.orgLogin_payload.access_token)
      console.log('message:',this.orgLogin_payload.message);
    });
  }


  async current(token:string)
  {
    await this.apiService.getLogedInUser(token).subscribe((response) => {
      console.log('API response',response)
    });
  }

  async getUser(token:string)
  {
    await this.apiService.getUser(token).subscribe((response) => {
      console.log('API response',response)
    });
  }

  onCreate() {
    this.router.navigate(['/signup', { userType: this.userType }]);
  }

  login(email: string,password: string) {
    console.log('email:', email);
    console.log('password',password);

    if(this.userType=='user')
    {
      this.LogInUser(email,password);
      
    }

    if(this.userType=='organiser')
    {
      this.LogInOrg(email,password);
    }
   
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