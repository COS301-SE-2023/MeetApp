import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { service } from '@capstone-meet-app/app/services'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  standalone:true,
  selector: 'capstone-meet-app-settings',
  imports: [ IonicModule,CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[service,Router,],
})
export class SettingsComponent {
  constructor(private service:service,private router:Router){

  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  nagivateToHome(): void {
    this.router.navigate(['/home']);
  }
}
