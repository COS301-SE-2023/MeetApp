import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { service } from '@capstone-meet-app/services';

@Component({
  selector: 'capstone-meet-app-welcomepage',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
 
  
})
export class WelcomepageComponent {
  constructor(private router: Router,private service:service) {}

  onSignUp() {
    this.router.navigate(['/login']);
  }
  setUserType(userType: string): void {
    this.service.setUserType(userType);
  }
}
