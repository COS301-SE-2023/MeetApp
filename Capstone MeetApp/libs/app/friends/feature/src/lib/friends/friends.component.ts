import { Component } from '@angular/core';

import { CommonModule,Location } from '@angular/common';
import {IonicModule } from '@ionic/angular';
//import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { events,service,ServicesModule} from '@capstone-meet-app/services';

@Component({
  standalone:true,
  selector: 'capstone-meet-app-friends',
  templateUrl: './friends.component.html',
  imports: [CommonModule, FormsModule,IonicModule],
  styleUrls: ['./friends.component.css'],
  providers:[service],
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


  //goBack() {
  // this.location.back();
  //}
  filteredData: any[] = [];
      searchQuery = '';
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.followers;
    } else {
      this.filteredData = this.followers.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  status: string|undefined
  constructor(private servicesService: service) {}

    ngOnInit(){
      this.sendFriendRequest();
    // this.acceptRequest();
    // this.deletefriend();
    }

    async sendFriendRequest() {
    const requesterID = '647223decd65fc66879e13dc'; // Replace with the actual requester ID
    const requesteeID = '647223f8cd65fc66879e3f1f'; // Replace with the actual requestee ID
    status ='false';
    const access_token=this.servicesService.getToken();
    this.servicesService
        .sendfriendrequest(access_token,requesterID, requesteeID, status)
        .subscribe((response: any) => {
          console.log(response);
          // Handle the res ponse or UI updates after the friend request is sent successfully
        }) 
    }

    async acceptRequest() {
      const requesterID = '647223decd65fc66879e13dc'; // Replace with the actual requester ID
      const requesteeID = '647223f8cd65fc66879e3f1f'; // Replace with the actual requestee ID
      status ='true';
      const access_token=this.servicesService.getToken();
      this.servicesService
          .acceptFriendRequest(access_token,requesterID, requesteeID, status)
          .subscribe((response: any) => {
            console.log(response);
          
            // Handle the res ponse or UI updates after the friend request is sent successfully
          }) 
    }

    async deletefriend() {
      const requesterID = '647223decd65fc66879e13dc'; // Replace with the actual requester ID
      const requesteeID = '647223f8cd65fc66879e3f1f'; // Replace with the actual requestee ID
      status ='true';
      const access_token=this.servicesService.getToken();
      this.servicesService
          .deleteFriendRequest(access_token,requesterID, requesteeID)
          .subscribe((response: any) => {
            console.log(response);
            // Handle the res ponse or UI updates after the friend request is sent successfully
          })

    }

}