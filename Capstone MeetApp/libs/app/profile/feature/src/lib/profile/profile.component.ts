import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // A
import { ModalController } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { user,service} from '@capstone-meet-app/services';

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

  imageList = [
    'https://img.freepik.com/free-photo/table-setting-with-focus-goblets-plates_8353-9901.jpg?w=2000',
    'data:image/jpeg;base64,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',
    'https://c8.alamy.com/comp/C9F17J/the-gala-dinner-honoring-the-nobel-prize-laureates-in-the-blue-hall-C9F17J.jpg',
    'https://cdn.roadtrips.com/wp-content/uploads/2017/09/semi-final.jpg',
    'https://supercars.net/blog/wp-content/uploads/2016/06/rpm_indy500-07_1440x960.jpg',
    'https://wpamelia.com/wp-content/uploads/2021/09/launch.jpg',
    'https://cdn10.phillymag.com/wp-content/uploads/sites/3/2017/05/reach-and-raise.jpg',
    'https://www.nepalisansar.com/wp-content/uploads/2020/10/bungee-jump-nepal.jpg',
    'https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/bungee-jumping-in-south-africa-cover.jpg',
    // Add more image URLs as needed
  ];
  
  profile:user={username:'',password:'',profilePicture:'',region:''};
  eventCount='';
  userEvents = [
    {
      eventID:'',
      organisationID:'',
      userID:''
    }
  ];

  events=[{
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

  orgIDs='';
  profileId='';
  constructor(private router: Router,private modalController: ModalController,private serviceProvider: service) {
    this.profileId='64722456cd65fc66879ed7ba';
    this. profilePictureUrl = 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg';
    this.isEditMode = false;
  }

  async ngOnInit(){
    this.getProfile(this.profileId);
    this.getEventCount(this.profileId);
    this.getEvents(this.profileId);
    
    
  }
  
  async getProfile(id :string){
    await this.serviceProvider.getUserByID(id).subscribe((response:any)=>{ 
      this.profile = response;
    })
  }

  async getEventCount(id : string){
    await this.serviceProvider.getUserAttendancesCount(id).subscribe((response:any)=>{
      this.eventCount = response;
      console.log(this.eventCount);
    });
  }

  async updateProfile(id:string,username?:string,profifilePicture?:string,region?:string){
    await this.serviceProvider.updateUser(id,username,profifilePicture,region).subscribe((response) => {
      console.log('API response:', response);
   
    });
  }

  async getEvents(id : string){
    await this.serviceProvider.getUserAttendances(id).subscribe((response:any)=>{
      this.userEvents = response;
      console.log(this.userEvents);

      for(let i=0;i<this.userEvents.length;i++)
      {
        if(i==this.userEvents.length-1)
        {
          this.orgIDs+=this.userEvents[i].organisationID;
        }
        else
        {
          this.orgIDs+=this.userEvents[i].organisationID+',';
        }
        
        
        
      }
      console.log(this.orgIDs);
      this.fetchByIds('fetch-by-ids',this.orgIDs);
    });
  }

  async fetchByIds(id:string ,eventIds:string)
  {
    await this.serviceProvider.getEventByIDs(id,eventIds).subscribe((response:any)=>{
      console.log(response);
      this.events = response;
      console.log(this.events);
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
      console.log('THE FUNCTION IS RUNNING');
    if(this.newProfileName&&this.newProfilePicUrl){
      this.profileName = this.newProfileName;
      this. profilePictureUrl = this.newProfilePicUrl;
      this.updateProfile(this.profileId,this.newProfileName,this.newProfilePicUrl);
      console.log(this. profilePictureUrl);
    }else if(this.newProfileName){
      this.profileName = this.newProfileName;
      this.updateProfile(this.profileId,this.newProfileName);
    }else if(this.newProfilePicUrl){
      this. profilePictureUrl = this.newProfilePicUrl;
      this.convertImageToBase64(this. profilePictureUrl);
      this.updateProfile(this.profileId,this.profileName,this.profilePictureUrl);
      console.log(this. profilePictureUrl);
    }

    location.reload();
    this.isEditMode = false;
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
  
}
