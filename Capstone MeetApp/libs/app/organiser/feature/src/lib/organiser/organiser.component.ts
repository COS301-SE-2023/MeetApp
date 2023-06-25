import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Import FormsModul
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  standalone: true,
  selector: 'capstone-meet-app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.css'],
 
  imports:[IonicModule , CommonModule,
    FormsModule,]
})
export class OrganiserComponent {
  profilePictureUrl: string | null = null
  description: string | null = null
  selectedRegion:string | null = null;
  eventName :string | null = null;
  
 
  selectedRange: { startDate: string; endDate: string } = {
    startDate: '',
    endDate: '',
  };
  startDateControl = new FormControl();
  endDateControl = new FormControl();
  
  ngOnInit() {
    this.startDateControl.setValue(this.selectedRange.startDate);
    this.endDateControl.setValue(this.selectedRange.endDate);
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
  constructor(private alertController: AlertController) {
    this.profilePictureUrl = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80';
    this.description='';
    this.selectedRegion='';
    this.eventName='';
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
    }
  
  async saveProfile() {
    if (
      this.selectedRange.startDate &&
      this.selectedRange.endDate &&
      this.description &&
      this.selectedRegion
      &&this.eventName
    ) {
      console.log('Start Date:', this.selectedRange.startDate);
      console.log('End Date:', this.selectedRange.endDate);
      console.log('Description:', this.description);
      console.log('Selected Region:', this.selectedRegion);
      console.log('Selected Region:', this.eventName);
  
      
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
