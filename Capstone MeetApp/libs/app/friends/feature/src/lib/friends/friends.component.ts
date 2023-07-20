import { Component } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import {IonicModule } from '@ionic/angular';
//import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'capstone-meet-app-friends',
  templateUrl: './friends.component.html',
  imports: [CommonModule, FormsModule,IonicModule],
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  
  followers= [{
    name:'shiluvelo',
    profilepicture:'assets/profile.png'
  },
  {
    name:'shiluvelo',
    profilepicture:'assets/profile.png'
  },
  {
    name:'shiluvelo',
    profilepicture:'assets/profile.png'
  },
  {
    name:'shiluvelo',
    profilepicture:'assets/profile.png'
  },
  {
    name:'shiluvelo',
    profilepicture:'assets/profile.png'
  }
];

constructor(private location: Location)
{}
goBack() {
  this.location.back();
}
}
