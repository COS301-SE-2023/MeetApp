import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LoginComponent } from 'libs/app/login/feature/src/lib/login/login.component';
import { SignupComponent } from 'libs/app/signup/feature/src/lib/signup/signup.component';
import { FormsModule } from '@angular/forms';
import {service} from 'libs/services/src/lib/servises.service';
import { ServicesModule} from 'libs/services/src/lib/services.module';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { IonText } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomepageComponent, } from 'libs/app/Welcome/feature/src/lib/welcomepage/welcomepage.component';
import { HomepageComponent } from 'libs/app/home/feature/src/lib/homepage/homepage.component';

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
