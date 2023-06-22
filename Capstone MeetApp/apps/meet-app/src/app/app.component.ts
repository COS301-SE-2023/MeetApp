import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LoginComponent } from '@capstone-meet-app/app/login/feature';
import { SignupComponent } from '@capstone-meet-app/app/signup/feature';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { IonButton } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomepageComponent } from '@capstone-meet-app/app/welcome/feature';
import { HomepageComponent } from '@capstone-meet-app/app/home/feature';

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
