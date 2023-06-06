import { AfterViewInit, Component } from '@angular/core';

import { environment } from './environment';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
declare const google: any;

@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  imports: [CommonModule,FormsModule],
  providers: [GoogleMapsModule]
})
export class MapsComponent implements AfterViewInit {
  selectedRegion!: string;
  apikey = environment.API_KEY;

  map: any;
  zoom = 12;
  center = { lat: -25.750227, lng: 28.236448 }; // Hatfield
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 25,
    minZoom: 8,
  } as google.maps.MapOptions;

  constructor(private m: GoogleMapsModule) {}

  ngAfterViewInit() {
      this.selectRegion();// No initialization required here since we're waiting for region selection
  }
  onRegionChange() {
    switch (this.selectedRegion) {
      case 'JHB':
        this.updateMapForJohannesburg();
        break;
      case 'DBN':
        this.updateMapForDurban();
        break;
      case 'CPT':
        this.updateMapForCapeTown();
        break;
      case 'PTA':
        this.updateMapForPretoria();
        break;
      default:
        // Handle unknown region or default case
        break;
    }
  }

  updateMapForJohannesburg() {
    this.center = { lat: -26.2041, lng: 28.0473 }; // Update center for Johannesburg
    // Perform other map updates specific to Johannesburg
  }

  updateMapForDurban() {
    this.center = { lat: -29.8587, lng: 31.0218 }; // Update center for Durban
    // Perform other map updates specific to Durban
  }

  updateMapForCapeTown() {
    this.center = { lat: -33.9249, lng: 18.4241 }; // Update center for Cape Town
    // Perform other map updates specific to Cape Town
  }

  updateMapForPretoria() {
    this.center = { lat: -25.7461, lng: 28.1881 }; // Update center for Pretoria
    // Perform other map updates specific to Pretoria
  }
  selectRegion() {
    const region = this.selectedRegion;
    if (region) {
      const selectedRegion = this.getRegionCoordinates(region.toUpperCase());
      if (selectedRegion) {
        this.center = selectedRegion;
        this.initMap();
      } else {
        alert('Invalid region selection!');
      }
    } else {
      alert('No region selected!');
    }
  }

  getRegionCoordinates(region: string) {
    switch (region) {
      case 'JHB':
        return { lat: -26.2041, lng: 28.0473 }; // Johannesburg coordinates
      case 'DUR':
        return { lat: -29.8587, lng: 31.0218 }; // Durban coordinates
      case 'CPT':
        return { lat: -33.9249, lng: 18.4241 }; // Cape Town coordinates
      case 'PTA':
        return { lat: -25.7461, lng: 28.188 }; // Pretoria coordinates
      default:
        return null;
    }
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
    const selectedRegion = this.center;

    // Create map
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: this.center,
     // zoom: this.zoom,
      options: this.options,
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
      '<p> <img src="https://lh3.googleusercontent.com/nVURMfU_P9tbGD4_tkSBZE4g2akKMtOcPXGwtkDGKLNgtwA-INpPtFKBFi6u4XZIwHKgUF237oLHrT2xKSWBm-o7nrwSLUzZ6Pw=s640" alt="Image" style="height: 60px; width: 60px;">' +
      '</p>' +
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
      content: svgIcon
      //icon: customIcon
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