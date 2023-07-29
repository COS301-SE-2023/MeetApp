import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { service } from '@capstone-meet-app/services'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  standalone:true,
  selector: 'capstone-meet-app-settings',
  imports: [ IonicModule,FormsModule,CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[service],
})
export class SettingsComponent {
  newEmail='';
  newPassword='';
  confirmPassword='';
  NewLocation='';
  constructor(private service:service,private router:Router,private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){

      const access_token=this.service.getToken();
      console.log(access_token);
      if (access_token !== null) {
      
      this.updatepassword(access_token,"test123");
      console.log("kman rocks");
      
    }
    this.updatepassword(access_token,"test123");
    
     //this.updateUsername("kmantheceh,quebook");
     //this.updateRegion("pretoria")
     //sthis.updatePassword('kman123');
  }
  
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/login']);
  }
  
  
  
 async updatepassword(access_token:string|null, email? :string) {
  //const userId = '64a351ddc7dc405eb315b3ba'; 
 //this.newEmail="akani@gmail.com";
   access_token=this.service.getToken();
  await this.service.updateSettingspassword(access_token, email).
  subscribe((response: any) =>
      {     
        console.log(response);
      }
    );
 }
  
  async updateUsername(access_token:string, username? :string) {
    //const userId = '64a351ddc7dc405eb315b3ba'; 
    
   //this.newEmail="akani@gmail.com";
    await this.service.updateSettingsusername(access_token, username).
    subscribe((response: any) =>
        {

          console.log(response);

        }
      );

}
  
async updateRegion( access_token:string, region? :string) {
  const userId = '64a351ddc7dc405eb315b3ba'; 
 //this.newEmail="akani@gmail.com";
  await this.service.updateSettingsRegion(access_token,region).
  subscribe((response: any) =>
      {

        console.log(response);

      }
    );

}
  
 
}
  
  


