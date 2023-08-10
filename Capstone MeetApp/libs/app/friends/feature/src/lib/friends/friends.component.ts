import { Component } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule} from '@angular/common';
import {IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {service} from '@capstone-meet-app/services';

@Component({
  standalone:true,
  selector: 'capstone-meet-app-friends',
  templateUrl: './friends.component.html',
  imports: [CommonModule, FormsModule,IonicModule,Ng2SearchPipeModule],
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

   
}