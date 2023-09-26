import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { service , user } from '@capstone-meet-app/services'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  current_user={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
  }

  profile:user={username:'',password:'',profilePicture:'',region:''};

  user_payload:any;

  constructor(private service:service,private router:Router,private location: Location,private activatedRoute: ActivatedRoute){

  }

  async ngOnInit(){
    this.getCurrentUser();
  }
  
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/']);
  }
  
  async getCurrentUser()
  {
    await this.service.getLogedInUser().subscribe((response:any) => {
      this.current_user=response;
    
      this.getProfile(this.current_user.username);
    });

  }
  
  async updateProfile(username?:string ,password?:string,profilePicture?:string,region?:string){
    await this.service.updateUser(username,password,profilePicture,region).subscribe((response) => {
      console.log('API response:', response);
   
    });
  }

  
  async getProfile(username :string|null){
    await this.service.getUserByUsername(username).subscribe((response:any)=>{ 
      this.profile = response;
    
    });
  }
  

  savePassword() {
    if (this.newPassword !== this.confirmPassword) {
      // Handle password mismatch
     
      return;
    }

   
    this.updateProfile(this.profile.username, this.newPassword, this.profile.profilePicture, this.profile.region);
  }

  saveRegion()
  {
    this.updateProfile(this.profile.username,this.profile.password,this.profile.profilePicture,this.NewLocation);
  }
 
}
  







