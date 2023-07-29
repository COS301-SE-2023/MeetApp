import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'capstone-meet-app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[service,Router]
})
export class CalendarComponent {

  selectedDate!: string;
  constructor(private service:service,private router:Router){

  }

  data= [{
    id:'',
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
filteredEvents: events[] = [];

filterEvents() {
  // Filter events based on the selected date
  if (this.selectedDate) {
    
    const selectedDate = new Date(this.selectedDate).toISOString().split('T')[0];
    console.log("fff",selectedDate)
    // Filter events based on the selected date
    this.filteredEvents = this.data.filter(events => events.date === selectedDate);
  } else {
    // If no date is selected, display all events
    this.filteredEvents = this.data;
  }
 
}
  async ngOnInit() {
    this.service.getAllEvents().subscribe((response: any) => { 
      this.data = response;
      for (let i = 0; i < this.data.length; i++) {
        const event: events = this.data[i];
        const region = event.region;
        const date=event.date;
       // console.log(date);
       
      }
      this.data
    });
}
}
