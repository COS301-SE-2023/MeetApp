import { AfterViewInit, Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { DotenvParseOutput } from 'dotenv';
import { environment } from './environment';
declare const google: any;
@Component({

  standalone:true,
  imports:[GoogleMapsModule],
  selector: 'app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})


export class MapsComponent implements AfterViewInit {
  
  apikey=environment.API_KEY;
 
  map:any;
  zoom = 12;
  center={ lat: -25.750227, lng: 28.236448 };//Hatfield
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 25,
    minZoom: 8,
  } as google.maps.MapOptions;
  constructor(private m:GoogleMapsModule, ){}
  ngAfterViewInit() {
    this.initMap();
  }
  
 
 
  zoomIn() {

    if (this.options && this.zoom < 25) {
      this.zoom++;
      this.map.setZoom(this.zoom);
    }
  
    //if (this.zoom < this.options.maxZoom) this.zoom++;
  }
 
  zoomOut() {
    //if (this.zoom > this.options.minZoom) this.zoom--;
  }

  private initMap() {
    const selectedRegion = { lat: -25.748733, lng: 28.238043 }; // Hatfield

    // Create map
    this.map = new google.maps.Map(document.getElementById('map'),{
      zoom: 15,
      center: selectedRegion,
      mapId: 'MeetApp',
    });

    

    // Locations
    const hatfieldPlaza = { lat: -25.750227, lng: 28.236448 };
    const theFields = { lat: -25.749628, lng: 28.23444 };
    const Zanzou = { lat: -25.75237, lng: 28.240068 };
    const upMainCampus = { lat: -25.756495, lng: 28.231066 };
    const theSocialClub = { lat: -25.750725, lng: 28.236427 };
    const upHPC = { lat: -25.74907, lng: 28.246678 };

    // Marker icons
    const svgIcon = {
      url: 'https://www.clipartmax.com/png/small/5-51701_marker-icon-google-maps.png',
      scaledSize: new google.maps.Size(150, 150)
    };

    // Marker content
    const contentStringZanzou =
      '<div id="content">' +
      '<h1 id="firstHeading" class="firstHeading">Kabza Tour</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Kabza</b> will be performing all his smash hits!</p>' +
      '<p>Date: Tomorrow 04:00</p>' +
      '<p>Organiser: Mock</p>' +
      '<p>Interests: 122</p>' +
      '<p> <img src="https://lh3.googleusercontent.com/nVURMfU_P9tbGD4_tkSBZE4g2akKMtOcPXGwtkDGKLNgtwA-INpPtFKBFi6u4XZIwHKgUF237oLHrT2xKSWBm-o7nrwSLUzZ6Pw=s640" alt="Image" style="height: 60px; width: 60px;">'
      '</p>'
      '</div>' +
      '</div>';

    // Info windows
    const infowindowZou = new google.maps.InfoWindow({
      content: contentStringZanzou,
      ariaLabel: 'Mock',
    });

    // Markers
    const customIcon = {
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
    const markerZou = new google.maps.Marker({
      position: Zanzou,
      map: this.map,
      title: 'LocationMarker',
      content:svgIcon
      //icon:customIcon
    });

    // Event listener for marker click
    markerZou.addListener('click', () => {
      infowindowZou.open({
        anchor: markerZou,
        map: this.map
      });
    });
  }
}
