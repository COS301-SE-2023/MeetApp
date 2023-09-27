import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { service} from '@capstone-meet-app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';



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
  valid=true;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: service,private alertController: AlertController,
    private toastController: ToastController,private activatedRoute: ActivatedRoute,private location: Location, public loadingController: LoadingController) {}
    selectedOptions: string[] = [];
  options: string[] = ['Concert', 'Sports', 'Conference', 'Charity','Expos','Trade Shows']; 

  events:any =[];
  firstname="";
  username='';
  lastname="";
  email = ''; 
  password= '';   
  region='';

  userSignup_payload= {
    access_token:'',
    message:''
  };

  orgSignup_payload= {
    access_token:'',
    message:''
  };

  userType:string|null = '';

  confirmpassword="";
  
  access:string|null='';
  
  submitClicked = false;
  loader=true;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    region:['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmpassword: ['', Validators.required],
    name:['', Validators.required],
    email:['',Validators.required]
    });
     
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
    });

    setTimeout(()=>{                           
      this.loader = false;
  }, 400);

  }

  goBack() {
    this.location.back();
  }

  async SignUpUser(emailAddress:string,username:string,password:string,profilePicture:string,region:string,interests: string[])
  {
    await this.apiService.createUser(emailAddress,username,password,profilePicture,region,interests).subscribe((response:any) => {
      this.userSignup_payload=response;
      this.apiService.setToken(this.userSignup_payload.access_token);
    });
  }

  async SignUpOrg(emailAddress:string,username:string,name:string,password:string,events:string[])
  {
    await this.apiService.createOrginiser(emailAddress,username,password,name,events).subscribe((response:any) => {
      this.orgSignup_payload=response;
      this.apiService.setToken(this.orgSignup_payload.access_token);
    });
  }

 
  async signup(){
    const password = this.loginForm.value.password;
    const username=this.loginForm.value.username;
    const region=this.loginForm.value.region;
    const name =this.loginForm.value.name;
    const email=this.loginForm.value.email;
    

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    // Simulate some asynchronous operation
    setTimeout(() => {
      loading.dismiss();
      if (this.valid==false ) {  
        const errorMessage = 'choose a stronger password';
        this.showErrorToast(errorMessage); 
        this.valid=false;
      }
      else if(this.valid==true)
      {
        this.valid=true;
        if(this.userType=='user' )
    {
        this.SignUpUser(email,username,password,'',region,this.selectedOptions);
    }
    else  if(this.userType=='organiser'){
      this.SignUpOrg(email,username,name,password, this.events)
    }
  
      }
      
    }, 100);
    
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

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Account Created',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  onCreate() {
    this.router.navigate(['/login']);
  }

  isvalid()
  {

    if (this.valid)
    {
      const errorMessage = 'Account Created Successfully';
      this.showErrorAlert(errorMessage); 
      
    }

  }
  
  onSignUp() {
    this.router.navigate(['/home']);
  }


}






  
