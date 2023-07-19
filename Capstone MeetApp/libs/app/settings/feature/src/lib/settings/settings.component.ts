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
   
     this.updatepassword("akani","kman78@gmail.com", ["hockey,swimming"],"kubi","a cdog running","durban");
    //sthis.updatePassword('kman123');
  }
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/home']);
  }

   
  async updatepassword( username: string, email: string,  interests: string[], password: string, profifilePicture:string,region:string) {
     const userId = '64a351ddc7dc405eb315b3ba'; 
    //this.newEmail="akani@gmail.com";
   await this.service.updateSettings(userId, username, email, interests,password, profifilePicture,region).
   subscribe((response: any) =>
       {
            
         console.log(response);

       }
     );
 }
 
}
  
  


