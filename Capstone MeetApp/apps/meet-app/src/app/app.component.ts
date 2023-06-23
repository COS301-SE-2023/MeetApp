import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LoginComponent } from '@capstone-meet-app/app/login/feature';
import { SignupComponent } from '@capstone-meet-app/app/signup/feature';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import {service} from 'libs/services/src/lib/servises.service';
import { ServicesModule} from 'libs/services/src/lib/services.module';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomepageComponent } from '@capstone-meet-app/app/welcome/feature';
import { HomepageComponent } from '@capstone-meet-app/app/home/feature';

@Component({
  standalone: true,
  imports: [HttpClientModule,ServicesModule,NxWelcomeComponent,FormsModule, RouterModule,LoginComponent,SignupComponent, IonicModule,WelcomepageComponent,HomepageComponent],
  selector: "capstone-meet-app-root",
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"],
  providers:[service,HttpClient]
})
export class AppComponent {
  title = "meet-app";
}
