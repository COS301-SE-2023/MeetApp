import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {service} from '@capstone-meet-app/app/services';


@Component({
  selector: 'capstone-meet-app-app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.css'],
})
export class AppNotificationsComponent {

  constructor(private apiService: service) { 
  }

  async ngOnInit() {
    this.getRequest();
  }

  async getRequest(){
    const token=this.apiService.getToken();
    await this.apiService.getFriendRequest(token).subscribe((response:any) =>{
      console.log('FriendRequest List :',response);
    });
  }

/*
  async acceptRequest(){

  }
  */
}
