

import { Component } from '@angular/core';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { CommonModule,Location } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'capstone-meet-app-app-suggested-friends',
  standalone: true,
  imports: [CommonModule,Ng2SearchPipeModule,FormsModule,IonicModule,RouterModule],
  templateUrl: './app-suggested-friends.component.html',
  styleUrls: ['./app-suggested-friends.component.css'],
})
export class AppSuggestedFriendsComponent {
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
  eventID='';

  suggested_friends = [
    {
      _id:'',
      username:'',
      profilePicture:'' 
    }
  ];


  current_user={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
 }

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

  
  constructor(private apiService: service,private route: ActivatedRoute) { 
    this.apiService.checkTokenAndRedirect();
  }

  async ngOnInit() {
    
      this.route.params.subscribe(params => {
        const eventId = params['eventId'];
        this.eventID=eventId
      });
    
    this.getSuggestedFriends();
    this.getCurrentUser();
  }

  async getCurrentUser()
  {
    await this.apiService.getLogedInUser().subscribe((response:any) => {
      this.current_user=response;
    
      this.getMutualFriends(this.current_user.username);
    });

  }
  
  async getSuggestedFriends(){

    await this.apiService.getSuggestedFriends().subscribe((response:any) =>{
      this.suggested_friends=response;
      console.log('Friend Suggestion List :',response);
    });
  }
  sendRequest(requestee:string, friend: any)
  {
    this.apiService.sendfriendrequest(requestee).subscribe((response:any) =>{
      console.log('Send Request :',response);
    });
    friend.requestSent = true;
  }
  
  async getRequest(){

    await this.apiService.getFriendRequest().subscribe((response:any) =>{
      //this.requesters=response;
      console.log('FriendRequest List :',response);
    });
  }

  async getMutualFriends(username:string|null){

    await this.apiService.getMutualFriends(username).subscribe((response:any) =>{
      console.log('Friend Mutual List :',response);
    });
  }


}
