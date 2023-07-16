import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'capstone-meet-app-welcomepage',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
 
})
export class WelcomepageComponent {
  constructor(private router: Router) {}

  onSignUp() {
    this.router.navigate(['/login']);
  }
}