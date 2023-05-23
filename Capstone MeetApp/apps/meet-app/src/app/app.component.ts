import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LoginComponent } from 'libs/app/login/feature/src/lib/login/login.component';
import { SignupComponent } from 'libs/app/signup/feature/src/lib/signup/signup.component';

import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomepageComponent, } from 'libs/app/Welcome/feature/src/lib/welcomepage/welcomepage.component';
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule,LoginComponent,SignupComponent, IonicModule,WelcomepageComponent],
  selector: "capstone-meet-app-root",
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "meet-app";
}
