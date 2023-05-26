import { Route } from "@angular/router";
import { RouterModule, Routes } from '@angular/router';
import { Component } from "@angular/core";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '@capstone-meet-app/app/login/feature';
import { SignupComponent } from '@capstone-meet-app/app/signup/feature';
import { HomepageComponent } from '@capstone-meet-app/app/home/feature';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { WelcomepageComponent, } from 'libs/app/Welcome/feature/src/lib/welcomepage/welcomepage.component';
import {ProfileComponent} from 'libs/app/profile/feature/src/lib/profile/profile.component'
export const appRoutes: Route[] = [
   { path: "", component: WelcomepageComponent },
   { path: "home", component: HomepageComponent },
   { path: "signup", component: SignupComponent }
   ,{ path: "login", component: LoginComponent }
   ,{ path: "profile", component: ProfileComponent}
   

   
];
