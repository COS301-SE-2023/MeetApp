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
   
     this.updateEmail("kman@gmail.com")

  }
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/home']);
  }

   async updateEmail(Email: string) {
     const userId = '647223decd65fc66879e13dc'; 
     //this.newEmail="akani@gmail.com";
    await this.service.updateSettings(userId, Email).
    subscribe((response: any) =>
        {
             
          console.log(response);

        }
      );
  }

  updatePassword() {
    const userId = '123'; 
  
    this.service.updateSettings(userId, undefined)
      .subscribe(
        response => {
          
          console.log('Password updated successfully');
        },
        error => {
          // Handle error
          console.error('Error updating password:', error);
        }
      );
  }
  

}
