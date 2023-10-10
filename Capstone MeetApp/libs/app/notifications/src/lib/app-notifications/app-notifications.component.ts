import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {service} from '@capstone-meet-app/app/services';


@Component({
  selector: 'capstone-meet-app-app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule],
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.css'],
})
export class AppNotificationsComponent {

  notifications = [
    { text: 'you have a new friend request from' },
    
    
  ];

  requesters=[{
      _id:'',
      username:''
      ,requestSent:''
  }];

  constructor(private apiService: service) { 
    this.apiService.checkTokenAndRedirect();
  }

  async ngOnInit() {
    this.getRequest();
  }

  async getRequest(){

    await this.apiService.getFriendRequest().subscribe((response:any) =>{
      this.requesters=response;
      
    });
  }

  
  async acceptRequest(requester: string,request:any){
     await this.apiService.acceptFriendRequest(requester).subscribe((response:any) =>{
     
      this.getRequest();
    });

    request.requestSent = true;
  }
  

}
