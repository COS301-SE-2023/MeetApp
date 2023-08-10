import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import {service,events} from '@capstone-meet-app/services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'capstone-meet-app-event',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers:[service,Router]
})
export class EventComponent {
  
  eventID='';
  
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

  attandance_list=[{
    id:'',
    username:''
  }]

  attendance=0;
  
  constructor(private apiService: service,private route: ActivatedRoute,) { 
  }
  

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      this.getEventbyID(eventId);
      this.eventID=eventId
    });
  
    this.getAttendance(this.eventID);
    this.getListAttendances(this.eventID);
  }


  async getEventbyID(id:string)
  {
    await this.apiService.getEventByID(id).subscribe((response:any)=>{
      this.event=response;
      console.log('Returned EventByID',this.event)
    });
  }


  async attendEvent(eventID: string)
  {
    const access_token=this.apiService.getToken()
    await this.apiService.attendEventUser(access_token,eventID).subscribe((response:any) => {
      console.log('API response:', response);
    });
  }


  addEvent()
  {
    console.log('eventID',this.eventID);
    this.attendEvent(this.eventID);
  }


  async getAttendance(id:string)
  {
    await this.apiService.getEventAttendanceCount(id).subscribe((response:any) => {
      console.log('API response:', response);
      this.attendance=response;
    });
  }


  async getListAttendances(id:string)
  {
    await this.apiService.getEventAttendance(id).subscribe((response:any) =>{
      this.attandance_list=response;
      console.log('Attendace List :',this.attandance_list);
    });
  }

}

