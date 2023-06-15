import { AfterViewInit, Component } from '@angular/core';
import { environment } from './environment';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';


declare const google: any;
interface location{
  lat: number;
  lng: number;
}
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
interface Event {
  eventName: string;
  eventPoster: string;
  eventDescription: string;
  eventLocation: location;
 
  startDate: string; 
  endDate: string
  eventOrganiser: string;
  interestTags: string;
  region: string;
}


 
@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [GoogleMapsModule]
})
export class MapsComponent implements AfterViewInit {
  selectedRange: DateRange = {
    startDate: null,
    endDate: null
  };
  //selectedRegion: string ;
  selectedRegion="Pretoria";
  center = { lat: -25.750227, lng: 28.236448 }; // hatfield
  apikey = environment.API_KEY;
  
  map: any;
  zoom = 15;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 25,
    minZoom: 8,
  } as google.maps.MapOptions;
   events: Event[] = [
    {
      eventName: "Event 1",
      eventPoster: "poster1.jpg",
      eventDescription: "Event 1 description",
      eventLocation: { lat:  -25.75237, lng:28.240068 },
      startDate: "2023-06-15T12:30:00.000Z",
      endDate: "2023-06-20T12:30:00.000Z",
      eventOrganiser: "Organiser 1",
      interestTags: "Tag1, Tag2",
      region: "Pretoria",
    },
    {
      eventName: "Event 2",
      eventPoster: "poster2.jpg",
      eventDescription: "Event 2 description",
      eventLocation: { lat: -25.749628, lng: 28.23444  },
      startDate: "2023-06-15", // Valid date string format for start date
      endDate: "2023-06-20",
      eventOrganiser: "Organiser 2",
      interestTags: "Tag3, Tag4",
      region: "jhb",
    },
   
  ];
  private initializeMap(region: string) {
   

    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
    
  
      center: this.center,
     // zoom: this.zoom,
      options: this.options,
      mapId: 'MeetApp',
    });
    this.fillEvents(region, this.selectedRange);
    
  }
    
  
  constructor(private m: GoogleMapsModule) {
  }

  

  
    ngAfterViewInit() {
      setTimeout(() => {
        this.initializeMap(this.selectedRegion);
      }, 0);
    }
  

  zoomIn() {
    if (this.options && this.zoom < 25) {
      this.zoom++;
      this.map.setZoom(this.zoom);
    }
  }

  zoomOut() {
    if (this.options && this.zoom > 8) {
      this.zoom--;
      this.map.setZoom(this.zoom);
    }
  }


  
  // Marker icons
  svgIcon = {
    url: 'https://www.clipartmax.com/png/small/5-51701_marker-icon-google-maps.png',
    scaledSize: new google.maps.Size(150, 150)
  };

  // Markers
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

  fillEvents(region: string, range?: DateRange) {
    // Clear existing markers if needed
    // ...
  
    this.getEventsByRegion(region)
      .then((events: Event[]) => {
        if (range) {
          // Filter events based on the specified date range
          events = events.filter(event =>
            isWithinRange(event.startDate, event.endDate, range.startDate, range.endDate)
          );
        }
  
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
  
          const createContent =
            '<div id="content">' +
            '<h1 id="firstHeading" class="firstHeading">' + event.eventName + '</h1>' +
            '<div id="bodyContent">' +
            '<p><b>' + event.eventName + ' event</b> ' + event.eventDescription + '</p>' +
            '<p>Date: ' + event.startDate + '</p>' +
            '<p>Organiser: ' + event.eventOrganiser + '</p>' +
            '<p>Interests: ' + event.interestTags + '</p>' +
            '<p> <img src="' + event.eventPoster + '" alt="Image" style="height: 60px; width: 60px;"></p>' +
            '</div>' +
            '</div>';
  
          const infoWin = new google.maps.InfoWindow({
            content: createContent,
            ariaLabel: 'Mock',
          });
  
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(event.eventLocation.lat, event.eventLocation.lng),
            map: this.map,
            title: event.eventName,
            icon: this.customIcon,
          });
  
          marker.addListener('click', () => {
            infoWin.open({
              anchor: marker,
              map: this.map,
            });
          });
        }
      })
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
  
      const startDate = this.selectedRange?.startDate || null;
      const endDate = this.selectedRange?.endDate || null;
      const dateRange: DateRange = { startDate, endDate };
  
      this.fillEvents(this.selectedRegion, dateRange);
    }
  }
  getRegionCenter(region: string): location | null {
    switch (region) {
      case 'Pretoria':
        return { lat: -25.7479, lng: 28.2293 };
      case 'Johannesburg':
        return { lat: -26.2041, lng: 28.0473 };
      default:
        return null;
    }
  
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
function isWithinRange(eventStartDate: string, eventEndDate: string, rangeStartDate: Date | null, rangeEndDate: Date | null): boolean {
  const startDate = rangeStartDate ? rangeStartDate.getTime() : null;
  const endDate = rangeEndDate ? rangeEndDate.getTime() : null;

  if (!startDate && !endDate) {
    return true; // If no date range specified, include all events
  }

  const eventStartTime = new Date(eventStartDate).getTime();
  const eventEndTime = new Date(eventEndDate).getTime();

  // Check if event start or end time falls within the specified date range
  if ((startDate === null || eventStartTime >= startDate) && (endDate === null || eventEndTime <= endDate)) {
    return true; // Event falls within the range
  }

  return false; // Event does not fall within the range
}




