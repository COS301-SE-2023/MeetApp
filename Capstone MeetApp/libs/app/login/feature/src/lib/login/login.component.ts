import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { service} from '@capstone-meet-app/services';
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
  loginForm!: FormGroup;
  email = ''; 
  password= ''; 
  username='';

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
  

  async ngOnInit() {
  
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    await this.apiService.getAllUsers().subscribe((response: any) => { 
      this.data_user = response;  
    });
  
    await this.apiService.getAllOrganisers().subscribe((response: any) => { 
      this.data_organiser = response;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
      console.log('User Type:', this.userType);
    });
    
  }
   
  
  valid=true;

  async LogInUser(username:string,password:string)
  {
    await this.apiService.authUser(username,password ).subscribe((response:any) => {
      this.userLogin_payload=response;
      this.authservice.setToken(this.userLogin_payload.access_token)
    });

    for (let i = 0; i < this.data_user.length; i++) {

      if((this.data_user[i].username==username ||this.data_user[i].email==this.email) && this.data_user[i].password==password)
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

  
  async LogInOrg(username:string,password:string)
  {
    await this.apiService.authOrganiser(username,password ).subscribe((response:any) => {
      this.orgLogin_payload=response;
    });

    for (let i = 0; i < this.data_organiser.length; i++) {

      if((this.data_organiser[i].username==username || this.data_organiser[i].email==this.email) && this.data_organiser[i].password==password)
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


  onCreate() {
    this.router.navigate(['/signup', { userType: this.userType }]);
  }

  login(username: string,password: string) {
    if(this.userType=='user')
    {
      this.LogInUser(username,password);
      
    }

    if(this.userType=='organiser')
    {
      this.LogInOrg(username,password);
    }
   
  }
 

}