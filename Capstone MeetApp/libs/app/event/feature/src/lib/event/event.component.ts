import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import {service,events} from '@capstone-meet-app/services';
import { Router } from '@angular/router';
import {  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'capstone-meet-app-event',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers:[service,Router]
})
export class EventComponent {
  
  //store current user info
  organisationID='';
  eventID='';
  userID='';
  
  //Array that holds all the data in the getAllEvents response
  data= [{
    _id:'',
    name:'',
    organisation: '',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:''
    
  }];

  //storing the organisers data  
  data_organiser= [{
    _id:'',
    name:'',
    surname:'',
    username:'',
    email:'',
    password:'',
    phoneNumber:'',
    orgDescription:'',
    events:[]
  }];

  //Interface to hold one event from getEventbyID
  event:events={
    id:'',
    name:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:'',
    eventPoster:''
  };
  
  attendance=0;
  
  constructor(private apiService: service,private route: ActivatedRoute,private location: Location) { 
  }
  goBack() {
    this.location.back();
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      this.getEventbyID(eventId);
      console.log('Ntoto',eventId);
    });
    

    await this.apiService.getAllEvents().subscribe((response: any) => { 
      console.log('Events data',response);
      this.data = response;
    });

    await this.apiService.getAllOrganisers().subscribe((response: any) => { 
      console.log('Organiser data',response);
      this.data_organiser = response;
      this.getEventID('PriceToPay');
      this.getOrganiserID('LTDProevents')
    });

    //this.getEventbyID('647218a0cd65fc66878b99ad');
    
  }


  // Get one Event by ID
  async getEventbyID(id:string)
  {
    await this.apiService.getEventByID(id).subscribe((response:any)=>{
      //console.log(response);
      this.event=response;
      console.log('Returned EventByID',this.event)
    });
  }

  // Post the attendace of an event by the user 
  async attendEvent(orgID: string,eventID: string,userID: string)
  {
    await this.apiService.attendEvent(orgID,eventID,userID).subscribe((response:any) => {
      console.log('API response:', response);
    });
  }

  //Get eventID
  getEventID(eventName:string)
  {
    for (let i = 0; i < this.data.length; i++) {
      if(this.data[i].name==eventName)
      {
        this.eventID=this.data[i]._id; 
        
        break;
      }
    }
    console.log('Returned EventID',this.eventID);
  }


  //Get organistaionID
  getOrganiserID(organisation:string)
  {
    for (let i = 0; i < this.data_organiser.length; i++) {
      if(this.data_organiser[i].name==organisation)
      {
        this.organisationID=this.data_organiser[i]._id;
        break;
      }
    }
    console.log('Returned OrganiserID',this.organisationID);
  }

  async getAttendance(id:string)
  {
    await this.apiService.getEventAttendance(id).subscribe((response:any) => {
      console.log('API response:', response);
      this.attendance=response;
    });
  }


}
