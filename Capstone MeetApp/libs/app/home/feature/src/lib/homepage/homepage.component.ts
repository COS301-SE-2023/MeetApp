import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// eslint-disable-next-line @nx/enforce-module-boundaries
//import { IEvent } from '@capstone-meet-app/utils';

//import { HomepageService } from 'libs/api/home/feature/src/homepage.service';
//import {events, service} from '';
import { events,service,ServicesModule} from '@capstone-meet-app/services';



@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule,ServicesModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [service,HttpClient],
  
})
export class HomepageComponent {
  eventName='';
  organisation='';
  date='';
  starttime='';
  endtime='';
  eventDate='';
  locationln='';
  locactionlat='';
  category='';
  region='';

  events:any =[];
  data= [{
    eventName:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    eventDate: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:'',
    eventPoster:''
  }];
  
  constructor(private service: service) {
    console.log('Constructor');
  }
  

  getEvents()
  {
    return this.service.getAllEvents().subscribe(res=>
      {
        const newEvent={} as events;
        
        Object.values(res).forEach((event: { category: string; date: string; endTime: string; eventName: string; organisation: string; region: string; starttime: string; }) => {
          newEvent.category=event.category;
          newEvent.date=event.date;
          newEvent.endTime=event.endTime;
          newEvent.eventName=event.eventName;
          newEvent.organisation=event.organisation;
          newEvent.date=event.date;
          newEvent.region=event.region;
          newEvent.startTime=event.starttime; 
        });
        console.log(newEvent);
        console.log('fhsh  '+newEvent)
      });
  }
 

  /* async ngOnInit() {
      this.service.getAllEvents().subscribe((response: any) => { 
      this.data = response;
      for(let i=0;i<this.data.length;i++){
        console.log(this.data.at(i));
      }
        
      //this.events=this.data.values;
      this.events=this.data;
    });   

  
    //console.log(this.events);
    for(let i=0;i<this.events.length;i++){
      console.log(this.events.at(i));
    }
    
  } */


   async ngOnInit() {
      this.service.getAllEvents().subscribe((response: any) => { 
        this.data = response;
        for (let i = 0; i < this.data.length; i++) {
          const event: events = this.data[i];
          const region = event.region;
          const date=event.date;
          console.log(date);
         
        }
      });
    }
 
  

    filteredData: any[] = [];
    searchQuery = '';
    
   search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item) =>
        item.eventName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
   }




}
