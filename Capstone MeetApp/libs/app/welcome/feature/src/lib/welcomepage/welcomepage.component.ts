import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'capstone-meet-app-welcomepage',
  standalone: true,
  imports: [CommonModule,IonicModule],
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
 
})
export class WelcomepageComponent {

  constructor(private router: Router)  {}

  @Output() loginType = new EventEmitter<string>();
  user='Not set';

  onSignUp() {
    this.router.navigate(['/login']);
  }

  setUserType(userType: string): void {
    this.router.navigate(['/login', { userType }]);
  }

}
