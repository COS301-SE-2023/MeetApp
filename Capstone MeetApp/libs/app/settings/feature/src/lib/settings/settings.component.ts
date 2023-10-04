import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { service , user } from '@capstone-meet-app/services'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonModal } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { RouterModule} from '@angular/router';

import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  standalone:true,
  selector: 'capstone-meet-app-settings',
  imports: [ IonicModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[service],
})
export class SettingsComponent {
  @ViewChild(IonModal)
  modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  newEmail='';
  newPassword='';
  confirmPassword='';
  NewLocation='';
  
  isEditMode!: boolean ;
  current_user={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
  }
  userType:string|null = '';
  profile:user={emailAddress:'',username:'',password:'',profilePicture:'',region:'',interests: []};

  user_payload:any;
 
  
  constructor(private service:service,private router:Router,private location: Location,private activatedRoute: ActivatedRoute){

  }

  async ngOnInit(){
    this.getCurrentUser();
    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
    });
  }
  
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.service.removeToken();
    this.service.removeUsername();
    this.router.navigate(['/']);
  }
  
  async getCurrentUser()
  {
    await this.service.getLogedInUser().subscribe((response:any) => {
      this.current_user=response;
    
      this.getProfile(this.current_user.username);
    });

  }
  
  async updateProfile(emailAddress?:string,username?:string ,password?:string,profilePicture?:string,region?:string,interests?: string[]){
    await this.service.updateUser(emailAddress,username,password,profilePicture,region,interests).subscribe();
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

   
    this.updateProfile(this.profile.emailAddress,this.profile.username, this.newPassword, this.profile.profilePicture, this.profile.region,this.profile.interests);
  }

  saveRegion()
  {
    this.updateProfile(this.profile.emailAddress,this.profile.username,this.profile.password,this.profile.profilePicture,this.NewLocation,this.profile.interests);
  }

  saveEmail()
  {
    this.updateProfile(this.newEmail,this.profile.username,this.profile.password,this.profile.profilePicture,this.profile.region,this.profile.interests);
  }
  gotoorganiser() {
    this.router.navigateByUrl('/analytics;userType=organiser');
  }
  toggleEditProfile() {
    this.isEditMode = !this.isEditMode;
  }
  
  closeEditProfilePopover() {
    this.isEditMode = false;
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
  







