import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import {service,events} from '@capstone-meet-app/services';
import { Router } from '@angular/router';
@Component({
  selector: 'capstone-meet-app-event',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers:[service,Router]
})
export class EventComponent {
  constructor(private service:service,private router:Router){

  }
  data= [{
    name:'',
    organisation: '',
    date: '',
    startTime: '',
    endTime: '',
    eventDate: '',
    lng: 0,
    lat: 0,
    location: {latitude:'' , longitude:''},
    category:'',
    region:'',
    description:''
}
  
];

//Fix below just to return event with a specific id
  async ngOnInit() {
    this.service.getAllEvents().subscribe((response: any) => { 
      this.data = response;
      for (let i = 0; i < this.data.length; i++) {
        const event: events = this.data[i];
        const region = event.region;
        const date=event.date;
        console.log(date);
       
      }
      this.data
    });

  }
}
