import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { service } from '@capstone-meet-app/app/services'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  standalone:true,
  selector: 'capstone-meet-app-settings',
  imports: [ IonicModule,CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[service,Router,],
})
export class SettingsComponent {
  newEmail: string| undefined
  newPassword: string| undefined
  constructor(private service:service,private router:Router){

  }

  ngOnInit(){
   
     this.updatepassword("testing123");
     this.updateUsername("kmanthecehquebook");
     this.updateRegion("pretoria")
    //sthis.updatePassword('kman123');
  }
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/home']);
  }

   
  async updatepassword( password? :string) {
     const userId = '64a351ddc7dc405eb315b3ba'; 
    //this.newEmail="akani@gmail.com";
   await this.service.updateSettingspassword(userId, password).
   subscribe((response: any) =>
       {
            
         console.log(response);

       }
     );
 }
 async updateemail( email? :string) {
  const userId = '64a351ddc7dc405eb315b3ba'; 
 //this.newEmail="akani@gmail.com";
await this.service.updateSettingspassword(userId, email).
subscribe((response: any) =>
    {
         
      console.log(response);

    }
  );
 }
  async updateUsername( username? :string) {
    const userId = '64a351ddc7dc405eb315b3ba'; 
   //this.newEmail="akani@gmail.com";
  await this.service.updateSettingsusername(userId, username).
  subscribe((response: any) =>
      {
           
        console.log(response);
  
      }
    );



}
async updateRegion( region? :string) {
  const userId = '64a351ddc7dc405eb315b3ba'; 
 //this.newEmail="akani@gmail.com";
await this.service.updateSettingsRegion(userId, region).
subscribe((response: any) =>
    {
         
      console.log(response);

    }
  );



}
 
}
  
  


