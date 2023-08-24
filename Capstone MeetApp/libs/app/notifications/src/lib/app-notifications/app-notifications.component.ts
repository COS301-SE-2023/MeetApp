import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service,events} from '@capstone-meet-app/app/services'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

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
}
