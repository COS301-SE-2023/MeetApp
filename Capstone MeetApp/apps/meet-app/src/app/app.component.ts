import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LoginComponent } from 'libs/app/login/feature/src/lib/login/login.component';
import { SignupComponent } from 'libs/app/signup/feature/src/lib/signup/signup.component';
import { FormsModule } from '@angular/forms';


import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomepageComponent, } from 'libs/app/Welcome/feature/src/lib/welcomepage/welcomepage.component';
import { HomepageComponent } from 'libs/app/home/feature/src/lib/homepage/homepage.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent,FormsModule, RouterModule,LoginComponent,SignupComponent, IonicModule,WelcomepageComponent,HomepageComponent],
  selector: "capstone-meet-app-root",
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "meet-app";
}
