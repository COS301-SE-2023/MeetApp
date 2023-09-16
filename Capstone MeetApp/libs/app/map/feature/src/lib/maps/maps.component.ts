import { AfterViewInit, Component } from '@angular/core';
import { environment } from './environment';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { Injectable } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { events,service,ServicesModule} from '@capstone-meet-app/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//import { log } from 'console';


declare const google: any;
interface location{
  lat: number;
  lng: number;
}
interface DateRange {
  startDate: string|undefined;
  endDate: string|undefined;
}
interface Event {
    name:string,
    organisation:string,
    description:string,
    date: string,
    startTime: string,
    endTime: string,
    location: {latitude:number , longitude:number},
    category:string,
    region:string,
    eventPoster:string
}


 
@Component({
  standalone: true,
  selector: 'capstone-meet-app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  imports: [CommonModule, FormsModule,IonicModule],
  providers: [GoogleMapsModule,service,HttpClient]
  
})
export class MapsComponent implements AfterViewInit {

 

  selectedRange: DateRange = {
    startDate: undefined,
    endDate: undefined
  };

 // Marker icons
 svgIcon = {
  //url: 'assets/marker-2.jpg'
  url: 'https://www.clipartmax.com/png/small/1-19420_ruidoso-river-resort-ruidosos-condo-location-marker-png-transparent.png',
  scaledSize: new google.maps.Size(25, 25)
};


  selectedRegion="Pretoria";
  selectedTab = "maps"; 
  center = { lat: -25.750227, lng: 28.236448 }; // hatfield
  apikey = environment.API_KEY;
  
  map: any;
  zoom = 12;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 25,
    minZoom: 12,
  } as google.maps.MapOptions;
    filterEvents:Event[]=[{
    name:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude:0, longitude:0},
    category:'',
    region:'',
    eventPoster:''}]
  //services
 data= [{
    name:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude:0, longitude:0},
    category:'',
    region:'',
    eventPoster:''
}];


  private initializeMap(region: string) {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: this.center,
     // zoom: this.zoom,
      options: this.options,
      mapId: 'MeetApp',
    });
    this.fillEvents(region,this.data);
    
  }

  constructor(private m: GoogleMapsModule,private router: Router,private service: service) {
    //this.getData();
    
  }
  async ngOnInit() {
    await this.service.getAllEvents().subscribe((response: any) => { 
      this.data = response;
      for (let i = 0; i < this.data.length; i++) {
     const event: Event = this.data[i];
        const region = event.region;
        const date=event.date;
      }
    });
   
  }
  
  ngAfterViewInit() {
    console.log(this.apikey);
    setTimeout(() => {
      this.initializeMap(this.selectedRegion);
    }, 0);
    
  }

  async getEventsByDate(startDate?:string, endDate?:string){

    console.log(startDate+" "+endDate)
    await this.service.getEventsByRange(startDate,endDate).subscribe((response:any)=>{
       
      this.data=response;
    });
  }

  zoomIn() {
    if (this.options && this.zoom < 25) {
      this.zoom++;
      this.map.setZoom(this.zoom);
    }
  }

  zoomOut() {
    if (this.options ) {
      this.zoom--;
      this.map.setZoom(this.zoom);
    }
  }


  
  

  

  async fillEvents(region: string, events?: Event[]) {
    
    this.getEventsByRegion(region)
      .then((events) => {
        console.log(events);
        for (let i = 0; i < events.length; i++) {
          //const event = this.events[i];
          const event: Event = events[i];
          const region = event.region;
          const date=event.date;
          const createContent =
            '<div id="content" (click)=viewEvent()>' +
            '<h1 id="firstHeading" class="firstHeading">' + event.name + '</h1>' +
            '<div id="bodyContent">' +
            '<p><b>' + event.name + ' event</b> ' + event.description + '</p>' +
            '<p>Date: ' + event.date + '</p>' +
            '<p>Organiser: ' + event.organisation + '</p>' +
            '</div>' +
            '</div>';
  
          const infoWin = new google.maps.InfoWindow({
            content: createContent,
            ariaLabel: 'Mock',
          });

          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(event.location.latitude, event.location.longitude),
            map: this.map,
            title: event.name,
            icon: this.svgIcon,
          });
  
          marker.addListener('click', () => {
            infoWin.open({
              anchor: marker,
              map: this.map,
            });
          });
        }
      }
      )
      .catch(error => {
        // Handle error
      });
  }
  
  onSubmit() {
    if (this.selectedRegion) {
      const regionCenter = this.getRegionCenter(this.selectedRegion);
      if (regionCenter) {
        this.center = regionCenter;
        this.initializeMap(this.selectedRegion);  
      }
  
      const startDate = this.selectedRange?.startDate||null ;
      const endDate = this.selectedRange?.endDate ||null;
      
      if(startDate===null&&endDate===null){
        this.fillEvents(this.selectedRegion,this.data);
      }else{
        console.log(startDate?.slice(0,10),endDate?.slice(0,10));
        this.getEventsByDate(`${startDate?.slice(0,10)}`,`${endDate?.slice(0,10)}`);
        this.fillEvents(this.selectedRegion,this.data);  
        //location.reload();


      }
      
    }
  }
  getRegionCenter(region: string): location | null {
    switch (region) {
      case 'Pretoria':
        return { lat: -25.7479, lng: 28.2293 };
      case 'Joburg':
        return { lat: -26.2444, lng: 28.2316 };
      default:
        return null;
    }
  
  }

  BACKTOHOME(): void {
    this.router.navigate(['/home']);
  }
  goToListView() {
    this.router.navigate(['/home']);
    // Add implementation for goToListView method
  }

  goToMapView() {
    this.router.navigate(['/map']);
    // Add implementation for goToMapView method
  }

  
   getEventsByRegion(region: string): Promise<Event[]> {
    //const events: Event[] = [
      // Event objects here
    //];
  
    // Filter events based on the specified region
    const filteredEvents = this.data.filter(event => event.region === region);
  
    return Promise.resolve(filteredEvents);
  }
  viewEvent(eventId: string) {
    this.router.navigate(['events', eventId]);
  }
  
}



