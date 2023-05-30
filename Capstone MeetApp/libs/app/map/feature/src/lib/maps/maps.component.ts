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
  
  constructor(private m:GoogleMapsModule){}
  ngAfterViewInit() {
    this.initMap();
  }
  
  apikey=environment.API_KEY;
  map:any;
  zoom = 12;
  center={ lat: -25.750227, lng: 28.236448 };//Hatfield
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  zoomIn() {
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
      url: './icon.png',
      scaledSize: new google.maps.Size(50, 50)
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
      '</div>' +
      '</div>';

    // Info windows
    const infowindowZou = new google.maps.InfoWindow({
      content: contentStringZanzou,
      ariaLabel: 'Mock',
    });

    // Markers
    const markerZou = new google.maps.Marker({
      position: Zanzou,
      map: this.map,
      title: 'LocationMarker',
      icon: svgIcon
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
