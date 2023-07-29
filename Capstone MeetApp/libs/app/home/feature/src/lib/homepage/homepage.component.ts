import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormBuilder,  Validators } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';


// eslint-disable-next-line @nx/enforce-module-boundaries
//import { IEvent } from '@capstone-meet-app/utils';

//import { HomepageService } from 'libs/api/home/feature/src/homepage.service';
//import {events, service} from '';

//http://localhost:3000/api/events/647218a0cd65fc66878b99ad/attendance-count
import { events,service,ServicesModule} from '@capstone-meet-app/services';



@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [IonicModule,RouterModule,CommonModule,FormsModule,Ng2SearchPipeModule,ServicesModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [service,HttpClient],
  
})
export class HomepageComponent {

  name='';
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
    id:'',
    name:'',
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

  userType:string|null = '';

  isLiked = false;
  toggleLike() {
    this.isLiked = !this.isLiked;
  }
  
  
  constructor(private service: service,private router: Router,private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started');
      }
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended successfully');
      }
      if (event instanceof NavigationError) {
        console.error('Navigation error:', event.error);
      }
      if (event instanceof NavigationCancel) {
        console.warn('Navigation canceled');
      }
    });
  }
  

  getEvents()
  {
    return this.service.getAllEvents().subscribe(res=>
      {
        const newEvent={} as events;
        
        Object.values(res).forEach((event: { id:string;category: string; date: string; endTime: string; name: string; organisation: string; region: string; starttime: string; }) => {
          newEvent.id=event.id
          newEvent.category=event.category;
          newEvent.date=event.date;
          newEvent.endTime=event.endTime;
          newEvent.name=event.name;
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
  viewEvent(eventId: string) {
    this.router.navigate(['events', eventId]);
  }


   async ngOnInit() {
      this.service.getAllEvents().subscribe((response: any) => { 
        this.data = response;
        for (let i = 0; i < this.data.length; i++) {
          const event: events = this.data[i];
          //const region = event.region;
          const date=event.date;
          
         
        }
        this.data
      });

      this.activatedRoute.paramMap.subscribe(params => {
        this.userType = params.get('userType');
        console.log('User Type:', this.userType);
      });
    
    }
 
  

    filteredData: any[] = [];
    searchQuery = '';
    
   search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
   }


   gotomap() {
    this.router.navigate(['/map']);
  }
  gotohome() {
    this.router.navigate(['/home']);
  }
  gotoprofile() {
    this.router.navigate(['/profile']);
  }
  gotocalendar() {
    this.router.navigate(['/calendar']);
  }
  gotosettings() {
    this.router.navigate(['/settings']);
    
  }
  gotoorganiser() {
    this.router.navigate(['/organisers']);
  }
  

}
