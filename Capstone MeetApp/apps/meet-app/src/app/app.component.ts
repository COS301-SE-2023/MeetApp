import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LoginComponent } from '@capstone-meet-app/app/login/feature';
import { SignupComponent } from '@capstone-meet-app/app/signup/feature';
import { ProfileComponent} from '@capstone-meet-app/app/profile/feature'
import { MapsComponent} from '@capstone-meet-app/map';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { service } from "@capstone-meet-app/app/services";
import { ServicesModule } from "@capstone-meet-app/app/services";
import { HttpClient, HttpClientModule} from '@angular/common/http';

import {SettingsComponent} from '@capstone-meet-app/settings/feature'
import { CalendarComponent} from '@capstone-meet-app/calendar/feature'
import { EventComponent } from "@capstone-meet-app/app/event/feature";
import {OrganiserComponent}from '@captone-meet-app/organiser';
import {FriendsComponent} from '@capstone-meet-app/friends';
import {AppAttendeesComponent} from '@capstone-meet-app/app/attendees';

import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { IonButton } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomepageComponent } from '@capstone-meet-app/app/welcome/feature';
import { HomepageComponent } from '@capstone-meet-app/app/home/feature';

@Component({
  standalone: true,
  imports: [HttpClientModule,ServicesModule,CalendarComponent,NxWelcomeComponent,FormsModule, RouterModule,AppAttendeesComponent,FriendsComponent,OrganiserComponent,EventComponent ,SettingsComponent,MapsComponent,ProfileComponent,LoginComponent,SignupComponent, IonicModule,WelcomepageComponent,HomepageComponent],
  selector: "capstone-meet-app-root",
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"],
  providers:[service,HttpClient]
})
export class AppComponent {
  title = "meet-app";
}
