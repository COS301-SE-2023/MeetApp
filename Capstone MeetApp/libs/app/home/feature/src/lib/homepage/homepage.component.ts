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
import {events, service} from 'libs/services/src/lib/servises.service';
import { ServicesModule} from 'libs/services/src/lib/services.module';



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
    loactionln='';
    locactionlat='';
   // location:Record<number,unknown>;
    category='';
    region='';
  data = [
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: this.eventName,
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'CottonFest',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'Knysna Oyster Festival',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'standard Bank jazzfest',
      location: 'pretoria',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    }
    
  ];
  
  constructor(private service: service) {}
  filteredData: any[] = [];
  searchQuery = '';


  getEvents()
  {
    return this.service.getAllEvents().subscribe(res=>
      {
        const newEvent={} as events;
        
        Object.values(res).forEach((event: { category: string; date: string; endTime: string; eventName: string; organisation: string; loactionln: number; region: string; starttime: string; }) => {
         
          newEvent.category=event.category;
          newEvent.date=event.date;
          newEvent.endTime=event.endTime;
          newEvent.name=event.eventName;
          newEvent.organisation=event.organisation;
          newEvent.date=event.date;
          newEvent.lng=event.loactionln;
          newEvent.region=event.region;
          newEvent.startTime=event.starttime;

         

          
        });
        console.log('fhsh  '+newEvent)
      });
  }
 

  gOnInit(): void {
    this.getEvents();
    console.log('fhsh');
  }

 
  

  
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }




}
