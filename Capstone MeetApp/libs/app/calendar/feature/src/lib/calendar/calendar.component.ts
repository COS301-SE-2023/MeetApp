import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule } from '@ionic/angular';
import {service} from '@capstone-meet-app/app/services'
@Component({
  selector: 'capstone-meet-app-calendar',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[service]
})
export class CalendarComponent {
  constructor(private service:service){

  }
}
