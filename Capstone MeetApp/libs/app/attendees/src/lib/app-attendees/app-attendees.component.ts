import { Component } from '@angular/core';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { CommonModule,Location } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service,events} from '@capstone-meet-app/app/services'
import { Router ,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'capstone-meet-app-app-attendees',
  standalone: true,
  imports: [CommonModule,Ng2SearchPipeModule,FormsModule,IonicModule,RouterModule ],
  templateUrl: './app-attendees.component.html',
  styleUrls: ['./app-attendees.component.css'],
})
export class AppAttendeesComponent {
   
  attandance_list=[{
    _id:'',
      username:'',
      profilePicture:'' ,
  }]

  eventID='';
  

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
  constructor(private apiService: service,private route: ActivatedRoute) { 
    this.apiService.checkTokenAndRedirect();
  }
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.followers;
    } else {
      this.filteredData = this.followers.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const eventId = params['eventId'];
      this.eventID=eventId
    });
  
    this.getListAttendances(this.eventID);
    this.getRequest();
  }

  async getListAttendances(id:string)
  {
    await this.apiService.getEventAttendance(id).subscribe((response:any) =>{
      this.attandance_list=response;
      console.log('Attendace List :',response);
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

}
