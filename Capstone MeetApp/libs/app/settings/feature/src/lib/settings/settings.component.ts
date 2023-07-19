import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { service } from '@capstone-meet-app/app/services'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  standalone:true,
  selector: 'capstone-meet-app-settings',
  imports: [ IonicModule,FormsModule,CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[service,Router,],
})
export class SettingsComponent {
  newEmail='';
  newPassword='';
  confirmPassword='';
  NewLocation='';
  constructor(private service:service,private router:Router){

  }

  ngOnInit(){
   
     this.updatepassword("bibo@gmail.com")
    //sthis.updatePassword('kman123');
  }
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/home']);
  }

   
  async updatepassword(password: string) {
    const userId = '647223decd65fc66879e13dc'; 
    //this.newEmail="akani@gmail.com";
   await this.service.updateSettings(userId, password).
   subscribe((response: any) =>
       {
            
         console.log(response);

       }
     );
 }

  
  

}
