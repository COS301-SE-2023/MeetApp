import { AfterViewInit, Component } from '@angular/core';
import { environment } from './environment';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { Injectable } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonModule, Location } from '@angular/common';
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
  selector: 'capstone-meet-app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  imports: [CommonModule, FormsModule,IonicModule],
  providers: [GoogleMapsModule,service,HttpClient]
  
})
export class MapsComponent implements AfterViewInit {

  constructor(private m: GoogleMapsModule,private router: Router,private service: service) {
    //this.getData();
    
  }
  svgIcon = {
    url: 'https://www.clipartmax.com/png/small/5-51701_marker-icon-google-maps.png',
    scaledSize: new google.maps.Size(50, 50)
  };
  selectedRange: DateRange = {
    startDate: undefined,
    endDate: undefined
  };
  selectedRegion="Pretoria";
  selectedTab = "maps"; 
  center = { lat: -25.750227, lng: 28.236448 }; // hatfield
  apikey = environment.API_KEY;
  map: any;
  zoom = 8;
  image="https://www.specialevents.com/sites/specialevents.com/files/styles/article_featured_standard/public/gallery_promo_image/InVision_Shaklee_Global_Live.jpg?itok=9X3-HJLi";
  //selectedRegion: string ;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 25,
    minZoom: 8,
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
events: Event[] = [
    {
      name:'Event 1',
      organisation:'Organiser 1',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-15',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.74237 , longitude:28.240068},
      category:'Technology',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 2',
      organisation:'Organiser 2',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-16',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.791375 , longitude:28.220088},
      category:'food',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 3',
      organisation:'Organiser 3',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-17',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.71348 , longitude:28.270119},
      category:'science',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 4',
      organisation:'Organiser 4',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-18',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.72118 , longitude:28.290789},
      category:'picnic',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 5',
      organisation:'Organiser 5',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-19',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.73438 , longitude:28.201289},
      category:'music',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 6',
      organisation:'Organiser 6',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-20',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -26.223444 , longitude:28.200099},
      category:'Technology',
      region:'johannesburg',
      eventPoster:''
    },
    {
      name:'Event 7',
      organisation:'Organiser 7',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-21',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -26.288744 , longitude:28.270779},
      category:'Technology',
      region:'johannesburg',
      eventPoster:''
    },
    {
      name:'Event 8',
      organisation:'Organiser 8',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-22',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -26.20144 , longitude:28.230879},
      category:'Technology',
      region:'johannesburg',
      eventPoster:''
    },
    {
      name:'Event 9',
      organisation:'Organiser 9',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-23',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.727738 , longitude:28.210249},
      category:'Technology',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 10',
      organisation:'Organiser 10',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-24',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -25.791138 , longitude:28.220329},
      category:'Technology',
      region:'Pretoria',
      eventPoster:''
    },
    {
      name:'Event 11',
      organisation:'Organiser 11',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-25',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -26.211344 , longitude:28.210739},
      category:'Technology',
      region:'johannesburg',
      eventPoster:''
    },
    {
      name:'Event 12',
      organisation:'Organiser 12',
      description:'dbjvbhodjhcdhc',
      date: '2023-06-26',
      startTime: '12:30',
      endTime: "12:30",
      location: {latitude: -26.256744 , longitude:28.201289},
      category:'Technology',
      region:'johannesburg',
      eventPoster:''
    }
  ];
customIcon = {
  url: 'https://lh3.googleusercontent.com/nVURMfU_P9tbGD4_tkSBZE4g2akKMtOcPXGwtkDGKLNgtwA-INpPtFKBFi6u4XZIwHKgUF237oLHrT2xKSWBm-o7nrwSLUzZ6Pw=s640',
  size: new google.maps.Size(100, 100),
  anchor: new google.maps.Point(15, 34),
  labelOrigin: new google.maps.Point(15, 10),
  scaledSize: new google.maps.Size(130, 134),
  origin: new google.maps.Point(0, 0),
  label: {
    text: 'Custom Marker',
    color: '#ffffff'
  }
};
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

  

  
   

  private initializeMap(region: string) {
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: this.center,
     // zoom: this.zoom,
      options: this.options,
      mapId: 'MeetApp',
    });
    this.fillEvents(region, this.selectedRange);
    
  }

  
  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeMap(this.selectedRegion);
    }, 0);
    
  }
   
   async getEventsByDate(startDate?:string, endDate?:string){
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


  
  // Marker icons
  

  // Markers
  

  async fillEvents(region: string, range?: DateRange) {
    // Clear existing markers if needed
    // ...
    /*if (range) {
          // Filter events based on the specified date range
          events = events.filter(events =>
            isWithinRange(events.date, range.startDate, range.endDate)
          );
        }*/
    this.getEventsByRegion(region)
      .then((events:Event[]) => {
        console.log(this.data);
        for (let i = 0; i < this.events.length; i++) {
          //const event = this.events[i];
          const event: Event = this.data[i];
          const region = event.region;
          const date=event.date;
          const createContent =
            '<div id="content">' +
            '<h1 id="firstHeading" class="firstHeading">' + event.name + '</h1>' +
            '<div id="bodyContent">' +
            '<p><b>' + event.name + ' event</b> ' + event.description + '</p>' +
            '<p>Date: ' + event.date + '</p>' +
            '<p>Organiser: ' + event.organisation + '</p>' +
            '<p> <img src="' + event.eventPoster + '" alt="Image" style="height: 60px; width: 60px;"></p>' +
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
        this.fillEvents(this.selectedRegion);
      }else{
        console.log(startDate?.slice(0,10),endDate?.slice(0,10));
        this.getEventsByDate(`${startDate?.slice(0,10)}`,`${endDate?.slice(0,10)}`);
        this.fillEvents(this.selectedRegion);
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
    const filteredEvents = this.events.filter(event => event.region === region);
  
    return Promise.resolve(filteredEvents);
  }
  
  
}
/*function isWithinRange(eventDate: string,rangeStartDate: Date | null, rangeEndDate: Date | null): boolean {
  console.log('Event 0');
  const eventTime = new Date(eventDate);
  console.log(eventDate);
  console.log(eventTime);
  console.log(rangeStartDate,rangeEndDate);
  const startDate = rangeStartDate ? rangeStartDate : null;
  const endDate = rangeEndDate ? rangeEndDate: null;

  console.log('Event 1');
  console.log(eventDate);
  console.log(startDate,endDate);
  if (!startDate && !endDate) {
    return true; // If no date range specified, include all events
  }
  console.log('Event 2');
  console.log(eventTime);
  console.log(startDate,endDate);
  //const eventTime = new Date(eventDate).getDate();
  console.log('Event 3');
  console.log(eventTime);
  console.log(startDate,endDate);
  // Check if event start or end time falls within the specified date range
  if (( eventTime >= startDate && eventTime <= endDate)) {
    return true; // Event falls within the range
  }
  return false; // Event does not fall within the range
}*/




