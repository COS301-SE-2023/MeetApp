import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { events,service,ServicesModule} from '@capstone-meet-app/services';
@Component({
  selector: 'capstone-meet-app-event',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [service,HttpClient],
})
export class EventComponent {
  
  //store current user info
  organisationID='';
  eventID='';
  userID='';
  
  //Array that holds all the data in the getAllEvents response
  data= [{
    eventName:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:'',
    eventPoster:''
  }];

  //Interface to hold one event from getEventbyID
  event:events={
    eventName:'',
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

  constructor(private apiService: service) { 
  }

  async ngOnInit() {

    await this.apiService.getAllEvents().subscribe((response: any) => { 
      console.log(response);
      this.data = response;
    });
  }

  // Get one Event by ID
  async getEventbyID(id:string)
  {
    await this.apiService.getEventByID(id).subscribe((response:any)=>{
      console.log(response);
      this.event=response;
    });
  }

  // Post the attendace of an evebt by the user 
  async attendEvent(orgID: string,eventID: string,userID: string)
  {
    await this.apiService.attendEvent(orgID,eventID,userID).subscribe((response) => {
      console.log('API response:', response);
    });
  }


}