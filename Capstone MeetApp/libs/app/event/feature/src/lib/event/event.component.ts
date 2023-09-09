import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { service,events} from '@capstone-meet-app/services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'capstone-meet-app-event',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers:[service]
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


  attendance=0;
  
  constructor(private apiService: service,private route: ActivatedRoute,private router: Router) { 
  }
  

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      this.getEventbyID(eventId);
      this.eventID=eventId
    });
  
    this.getAttendance(this.eventID);
  }


  async getEventbyID(id:string)
  {
    await this.apiService.getEventByID(id).subscribe((response:any)=>{
      this.event=response;
    });
  }


  async attendEvent(eventID: string)
  {
    await this.apiService.attendEventUser(eventID).subscribe();
  }


  addEvent()
  {
    this.attendEvent(this.eventID);
  }

  viewAttendees()
  {
    this.router.navigateByUrl('/attendees');
    this.router.navigate(['attendees', this.eventID]);
  }

  async getAttendance(id:string)
  {
    await this.apiService.getEventAttendanceCount(id).subscribe((response:any) => {
      this.attendance=response;
    });
  }

}

