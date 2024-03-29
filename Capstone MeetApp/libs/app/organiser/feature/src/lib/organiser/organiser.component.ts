import { Component, Injectable, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import {service,ServicesModule} from '@capstone-meet-app/services';
import { HttpClient } from '@angular/common/http';



@Component({
  standalone: true,
  selector: 'capstone-meet-app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.css'],
  providers: [service,HttpClient],
 
  imports:[IonicModule , CommonModule,
    FormsModule,ServicesModule]
})

@Injectable()
export class OrganiserComponent  {
  
  //FORM DATA TYPE DECLARATION
  EventForm!: FormGroup;
  profilePictureUrl: string | null = null;
  description: string | null = null;
  selectedRegion:string | null = null;
  eventName :string | null = null;
  OrganisationName:string| null=null;
  category :string| null=null;

  selectedRange: { startDate: string; startTime: string , endTime: string} = {
    startDate: '',
    startTime: '',
    endTime: '',
  };


  showForm: |boolean = false;
  address: string ;
  showDateTimeFields = false;
  SelectedRangeControl = new FormControl();
  formGroup: FormGroup<{ startDate: FormControl<string | null>; startTime: FormControl<string | null>; endTime: FormControl<string | null>; }> | undefined;
  myForm: any;
  showCalendar=false;

  current_org={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
  }

  organiser={
    _id:'',
    username:'',
    password:'',
    name:'',
    events:[]
  }

  errorMessage='';
 
  location: {latitude :number , longitude:number  }=
  {
    latitude:0,
    longitude:0
  }
  
  startDate=this.selectedRange.startDate;
  startTime= this.selectedRange.startTime;
  endTime= this.selectedRange.endTime;
    
  
  options: string[] = ['Music', 'Technology', 'Art', 'Charity','Expos','Trade Shows']; 

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {  
    this.getOrganiserName();
  }

  constructor(private alertController: AlertController,private router: Router,private service:service,private llocation: Location,private http:HttpClient) {
    this.profilePictureUrl = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80';
    this.description='';
    this.selectedRegion='';
    this.eventName='';
    this.OrganisationName='';
    this.address = '';
    this.category=''
    this.formGroup = new FormGroup({
      startDate: new FormControl(this.selectedRange.startDate),
      startTime: new FormControl(this.selectedRange.startTime),
      endTime: new FormControl(this.selectedRange.endTime)
    });

    this.service.checkTokenAndRedirect();
  }
  
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  goBack() {
    this.llocation.back();
  }
  

  
  submitForm() {
    
    if (
      this.eventName !== null &&
      this.OrganisationName !== null &&
      this.description !== null &&
      this.profilePictureUrl !== null &&
      this.selectedRange.startDate !== null &&
      this.selectedRange.startTime !== null &&
      this.selectedRange.endTime !== null &&
      this.category !== null &&
      this.selectedRegion !== null
    ) {
      this.service.getCoordinates(this.address).subscribe((data: any) => {
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          this.location.latitude = location.lat;
          this.location.longitude = location.lng;
          // After getting the coordinates, call createEvents
          this.callCreateEvents();
        } else {
          console.error('Geocoding failed. Status:', data.status);
          const errorMessage = 'Invalid Address';
          this.showErrorAlert(errorMessage); 
         
        }
      });
    }
    else
    {
      this.showErrorAlertF();
    }

  }
 
  callCreateEvents() {
    if (
      this.location.latitude !== undefined &&
      this.location.longitude !== undefined
    ) {
      this.service
        .createEvents(
          this.eventName,
          this.OrganisationName,
          this.description,
          this.profilePictureUrl,
          this.selectedRange.startDate,
          this.selectedRange.startTime,
          this.selectedRange.endTime,
          this.location,
          this.category,
          this.selectedRegion
        )
        .subscribe((response) => {
          console.log('API response:', response);
          const errorMessage = 'Event created successfully';
          this.showErrorAlertCreation(errorMessage);
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
  
   this.convertImageToBase64(this. profilePictureUrl);
   
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
      
      /*
      console.log('Description:', this.description);
      console.log('Selected Region:', this.selectedRegion);
      console.log('EventName:', this.eventName);
      console.log('Organiser:', this.OrganisationName);
      console.log('startDate',this.selectedRange.startDate)
      console.log('endTime',this.selectedRange.endTime)
      console.log('startTime',this.selectedRange.startTime)

      console.log('latitude',this.location.latitude)
      console.log('longitude',this.location.longitude)
      console.log('category',this.category)*/
     //this.router.navigate(['/home']);
      
    } else {
      const alert = await this.alertController.create({
        header: 'Incomplete Fields',
        message: 'Please fill in all fields.',
        buttons: ['OK'],

      });
  
      await alert.present();
      
    }
  }
  gotohome()
  {
    this.router.navigate(['/home',{ userType: 'organiser' }]);
   
  }
  toggleForm() {
  
    this.showForm = !this.showForm;

    if (!this.showForm) {
      this.myForm.reset();
      this.router.navigate(['/home']);
    }
 
}


  getOrganiserName(){
    this.service.getLogedInOrg().subscribe((response:any) => {
      this.current_org=response;
      this.getCurrentOrganiser(this.current_org.username)
    
    });
  }


  getCurrentOrganiser(username:string|null){
    this.service.getOrgbyUsername(username).subscribe((response:any) => {
      this.organiser=response;
    
      this.OrganisationName=this.organiser.name;
    
    });
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Event not created',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showErrorAlertCreation(message: string) {
    const alert = await this.alertController.create({
      header: 'Event Created',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showErrorAlertF() {
    const alert = await this.alertController.create({
      header: 'Incomplete Fields',
      message: 'Please fill in all fields.',
      buttons: ['OK'],

    });
    await alert.present();
  }

}
