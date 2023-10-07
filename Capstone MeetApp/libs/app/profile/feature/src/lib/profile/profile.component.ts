import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  
import { ModalController } from '@ionic/angular';
import { user,service} from '@capstone-meet-app/services';
import { Location } from '@angular/common';

@Component({
  selector: 'capstone-meet-app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profilePictureUrl: string | null = null
  profileName: string |undefined;
  isEditMode: boolean;
  newProfileName:string | undefined;
  newProfilePicUrl: string | null = null;

  
  profile:user={emailAddress:'',username:'',password:'',profilePicture:'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',region:'',interests: []};
  eventCount='';
  friendCount=0;
  userEvents = [
    {
      eventID:'',
      organisationID:'',
      userID:''
    }
  ];

  events=[{
    _id:'',
    name:'',
    organisation:'',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude: 0 , longitude:0},
    category: '',
    region: ''
  }]

  current_user={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
 }

  user_payload:any;

  orgIDs='';
  profileId='';
  constructor(private router: Router,private modalController: ModalController,private serviceProvider: service,private location: Location) {
    this.profileId='64722456cd65fc66879ed7ba';
    this. profilePictureUrl = 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg';
    this.isEditMode = false;
  }
  

  async ngOnInit(){
    
    this.getEventCount();
    this.getUserEvents();
    this.getFriendCount();
    this.getCurrentUser();
    
  }

  goBack() {
    this.location.back();
  }
  
  gotofriends() {
    this.router.navigate(['/friends']);
    
  }

  async getEventCount(){
    await this.serviceProvider.getUserAttendancesCount().subscribe((response:any)=>{
      this.eventCount = response;
    });
  }
  
  async updateProfile(emailAddress?:string,username?:string ,password?:string,profilePicture?:string,region?:string,interests?: string[]){
    await this.serviceProvider.updateUser(emailAddress,username,password,profilePicture,region,interests).subscribe();
  }

  async getUserEvents()
  {
    await this.serviceProvider.getUserAttendances().subscribe((response:any)=>{
      this.events = response;
    });
  }

  async getCurrentUser()
  {
    await this.serviceProvider.getLogedInUser().subscribe((response:any) => {
      
      const username=this.serviceProvider.getUsername();
     
      if(username==null)
      {
        this.current_user=response;
       
        this.getProfile(this.current_user.username);
      }
      else
      {
        this.getProfile(username);
      }
      
    });

  }

  async getProfile(username :string|null){
    await this.serviceProvider.getUserByUsername(username).subscribe((response:any)=>{ 
      this.profile = response;
     
    });
  }

  async getFriendCount()
  {
    await this.serviceProvider.getFriendCount().subscribe((response:any) => {
      this.friendCount=response;
    });
  }
  
  toggleEditProfile() {
    this.isEditMode = !this.isEditMode;
    this.newProfileName = this.profileName;
    this.newProfilePicUrl = '';
  }

  onProfilePicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProfilePicUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
   
    if(this.newProfileName&&this.newProfilePicUrl){
      this.profileName = this.newProfileName;
      this. profilePictureUrl = this.newProfilePicUrl;
      this.serviceProvider.setUsername(this.newProfileName);
      this.convertImageToBase64(this.profilePictureUrl);
      this.updateProfile(this.newProfileName,this.profile.password,this.newProfilePicUrl,this.profile.region);
    
      this.updateProfile(this.profile.emailAddress,this.newProfileName,this.profile.password,this.newProfilePicUrl,this.profile.region,this.profile.interests);
    
    }else if(this.newProfileName){
      this.profileName = this.newProfileName;
      this.serviceProvider.setUsername(this.newProfileName);
      this.updateProfile(this.profile.emailAddress,this.newProfileName,this.profile.password,this.profile.profilePicture,this.profile.region,this.profile.interests);
    }else if(this.newProfilePicUrl){
      this. profilePictureUrl = this.newProfilePicUrl;
      this.convertImageToBase64(this.profilePictureUrl);
      this.updateProfile(this.profile.username,this.profile.password,this.profilePictureUrl,this.profile.region);
    
      this.updateProfile(this.profile.emailAddress,this.profile.username,this.profile.password,this.profilePictureUrl,this.profile.region,this.profile.interests);
    
    }

    
    this.isEditMode = false;
    this.refreshPageWithDelay(4000); 

    
  }
  
  refreshPage() {
    window.location.reload();
  }

  refreshPageWithDelay(delayInMilliseconds: number) {
    setTimeout(() => { 
      this.getCurrentUser();
    }, delayInMilliseconds);
  }
  
  async  convertImageToBase64(imageUrl: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String);
          this.profilePictureUrl=base64String;
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  cancelEditProfile() {
    this.isEditMode = false;
  }
  
  openEditProfilePopover() {
    this.isEditMode = true;
  }
  
  closeEditProfilePopover() {
    this.isEditMode = false;
  }
  
  viewEvent(eventId: string) {
    this.router.navigate(['events', eventId]);
  }

}
