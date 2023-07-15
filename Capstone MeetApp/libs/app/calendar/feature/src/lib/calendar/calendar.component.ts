import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
@Component({
  selector: 'capstone-meet-app-calendar',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[service]
})
export class CalendarComponent {
  constructor(private service:service){

  }

  data= [{
    name:'',
    organisation: '',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:'',
    description:'',
    eventPoster:''
}
  
];
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
