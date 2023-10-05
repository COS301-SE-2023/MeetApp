import { Component } from '@angular/core';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { CommonModule,Location } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {service} from '@capstone-meet-app/services';
import { RouterModule } from '@angular/router';


@Component({
  standalone:true,
  selector: 'capstone-meet-app-friends',
  templateUrl: './friends.component.html',
  imports: [CommonModule, FormsModule,IonicModule,Ng2SearchPipeModule,RouterModule],
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
  
  status: string|undefined
  friends = [
    {
      _id:'',
      username:'',
      profilePicture:'' 
    }
  ];
  filteredData: any[] = [];
      searchQuery = '';
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.friends;
    } else {
      this.filteredData = this.friends.filter((item ) =>
        item.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  
  constructor(private servicesService: service,private serviceProvider: service) {}
   ngOnInit()
  {
    this.getFriends();
  }
  async getFriendAccountFriends(username:string|null){
    await this.serviceProvider.getFriendsbyUsername(username).subscribe((response:any)=>{
      console.log(response);
      this.friends=response;
     
    });
  }
  
  async getFriends()
  {
      
    this.servicesService.getFriends().subscribe((response:any)=>{
     
      this.friends=response;
      console.log(response);
    
     
    });
          
  }
 
   
  
}