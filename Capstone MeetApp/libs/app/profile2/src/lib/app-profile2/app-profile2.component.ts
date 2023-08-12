import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'capstone-meet-app-app-profile2',
  standalone: true,
  imports: [CommonModule,FormsModule ,IonicModule],
  templateUrl: './app-profile2.component.html',
  styleUrls: ['./app-profile2.component.css'],
})
export class AppProfile2Component {

  constructor(private router: Router)
  {}

  gotofriends() {
    this.router.navigate(['/friends']);
    
  }
}
