import { Route } from "@angular/router";
import { RouterModule, Routes } from '@angular/router';
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from 'libs/app/home/feature/src/lib/homepage/homepage.component';
import { LoginComponent } from 'libs/app/login/feature/src/lib/login/login.component';
import { SignupComponent } from 'libs/app/signup/feature/src/lib/signup/signup.component';
import { WelcomepageComponent, } from 'libs/app/Welcome/feature/src/lib/welcomepage/welcomepage.component';
export const appRoutes: Route[] = [
   { path: "", component: WelcomepageComponent },
   { path: "home", component: HomepageComponent },
   { path: "signup", component: SignupComponent }
   ,{ path: "login", component: LoginComponent }
   

   
];
