import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { FormGroup} from '@angular/forms';

import { HttpClient, HttpClientModule} from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'capstone-meet-app-app-forgotpassword',
  standalone: true,
  imports: [CommonModule,IonicModule,FormsModule , RouterModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './app-forgotpassword.component.html',
  styleUrls: ['./app-forgotpassword.component.css'],
  providers: [service,HttpClient]
})
export class AppForgotpasswordComponent {
  userType:string|null = '';
  password = '';
  confirmPassword = '';
  constructor( private router: Router, private formBuilder: FormBuilder, private apiService: service,  private alertController: AlertController,
    private toastController: ToastController, private loadingController: LoadingController,private authservice: service,private activatedRoute: ActivatedRoute) { 
  }
  
  resetPassword() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    console.log(` Password: ${this.password}, Confirm Password: ${this.confirmPassword}`);
    this.router.navigate(['/login',{ userType: this.userType }]);
  }
  
  async ngOnInit(){
  this.activatedRoute.paramMap.subscribe(params => {
    this.userType = params.get('userType');
  });

  }
  cancel(){
    this.router.navigate(['/login',{ userType: this.userType }]);

  }
  
  async verifyLink(emailAddress:string,token:string)
    {
      await this.apiService.verifyPasswordRequest(emailAddress,token).subscribe((response: any) => { 
        console.log(response);
      });
    }

}
