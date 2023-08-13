

import { Component } from '@angular/core';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { CommonModule,Location } from '@angular/common';
import {IonicModule } from '@ionic/angular';
//import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'capstone-meet-app-app-suggested-friends',
  standalone: true,
  imports: [CommonModule,Ng2SearchPipeModule,FormsModule,IonicModule],
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
}
