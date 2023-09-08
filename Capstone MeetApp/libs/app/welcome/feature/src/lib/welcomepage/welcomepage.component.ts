import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class WelcomepageComponent implements OnInit{

  constructor(private router: Router)  {}

  @Output() loginType = new EventEmitter<string>();
  user='Not set';
  //Loader variable default true before page load
  loader = true;

  ngOnInit(): void {
    
     //Loader variable set false after page load
    setTimeout(()=>{                           
      this.loader = false;
  }, 200);
  }
  onSignUp() {
    this.router.navigate(['/login']);
  }

  setUserType(userType: string): void {
    this.router.navigate(['/login', { userType }]);
  }

}
