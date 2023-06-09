import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Import FormsModul
import { CommonModule } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { FormControl, FormGroup } from '@angular/forms';
import { events,service,ServicesModule} from '@capstone-meet-app/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'capstone-meet-app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.css'],
  providers: [service,HttpClient],
 
  imports:[IonicModule , CommonModule,
    FormsModule,ServicesModule]
})
export class OrganiserComponent {
  profilePictureUrl: string | null = null;
  description: string | null = null;
  selectedRegion:string | null = null;
  eventName :string | null = null;
  OrganisationName:string| null=null;
  selectedRange: { startDate: string; startTime: string , endTime: string} = {
    startDate: '',
    startTime: '',
    endTime: '',
  };
 
  showDateTimeFields = false;
  SelectedRangeControl = new FormControl();
  formGroup: FormGroup<{ startDate: FormControl<string | null>; startTime: FormControl<string | null>; endTime: FormControl<string | null>; }> | undefined;
 
  
  ngOnInit() {
    this.formGroup = new FormGroup({
      startDate: new FormControl(this.selectedRange.startDate),
      startTime: new FormControl(this.selectedRange.startTime),
      endTime: new FormControl(this.selectedRange.endTime)
    });
   
  }
  pickerOptions = {
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Done',
      },
    ],
  };
  constructor(private alertController: AlertController,private service: service) {
    this.profilePictureUrl = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80';
    this.description='';
    this.selectedRegion='';
    this.eventName='';
    this.OrganisationName='';
  }

  

//services
  location: {latitude :string , longitude:string }| null = null;
  myLocation = {
    latitude: "40.7128",
    longitude: "-74.0060",
  };
  //category:string | null = null;
 
  startDate=this.selectedRange.startDate;
  startTime= this.selectedRange.startTime;
  endTime= this.selectedRange.endTime;
  category="science Fair";

  
submitForm() {
  if (this.eventName !== null && this.OrganisationName !== null && this.description !== null && this.profilePictureUrl !== null && this.selectedRange.startDate !== null && this.selectedRange.startTime !== null && this.selectedRange.endTime !== null && this.myLocation !== null && this.category !== null && this.selectedRegion !== null) {
    this.service.createEvents(
      this.eventName,
      this.OrganisationName,
      this.description,
      this.profilePictureUrl,
      this.selectedRange.startDate,
      this.selectedRange.startTime,
      this.selectedRange.endTime,
      this.myLocation,
      this.category,
      this.selectedRegion
    ).subscribe((response) => {
      console.log('API response:', response);
   
    });
  }
  
}





  changeProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
  
    input.click();
  
    input.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
  
        reader.addEventListener('load', (event) => {
          const profilePictureUrl = event.target?.result as string;
          if (profilePictureUrl) {
            this.saveProfilePicture(profilePictureUrl);
          }
        });
      }
    });
  }
  
  
    saveProfilePicture(profilePictureUrl: string) {
      this.profilePictureUrl=profilePictureUrl;
      console.log('Profile picture URL:', profilePictureUrl);
      console.log("before conversion"+this. profilePictureUrl)
     this.convertImageToBase64(this. profilePictureUrl);
      console.log(this. profilePictureUrl)
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
    
  async saveProfile() {
    if (
       this.OrganisationName&&
       this.selectedRange&&
      this.description &&
      this.selectedRegion
      &&this.eventName
    ) {
      
      
      console.log('Description:', this.description);
      console.log('Selected Region:', this.selectedRegion);
      console.log('EventName:', this.eventName);
      console.log('Organiser:', this.eventName);
      console.log('startDate',this.selectedRange.startDate)
      console.log('endTime',this.selectedRange.endTime)
      console.log('startTime',this.selectedRange.startTime)
  
      
    } else {
      const alert = await this.alertController.create({
        header: 'Incomplete Fields',
        message: 'Please fill in all fields.',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }
  
}
