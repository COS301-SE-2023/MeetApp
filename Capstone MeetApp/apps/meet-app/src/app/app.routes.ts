import { Route } from "@angular/router";
import { RouterModule, Routes } from '@angular/router';
import { Component } from "@angular/core";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@capstone-meet-app/app/login/feature';
import { SignupComponent } from '@capstone-meet-app/app/signup/feature';
import { HomepageComponent } from '@capstone-meet-app/app/home/feature';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { WelcomepageComponent, } from 'libs/app/Welcome/feature/src/lib/welcomepage/welcomepage.component';
import {ProfileComponent} from 'libs/app/profile/feature/src/lib/profile/profile.component'
import {SettingsComponent}from 'libs/app/settings/feature/src/lib/settings/settings.component'
import {MapsComponent}from 'libs/app/map/feature/src/lib/maps/maps.component'
import { EventComponent } from "@capstone-meet-app/app/event/feature";
import {FriendsComponent} from 'libs/app/friends/feature/src/lib/friends/friends.component';
export const appRoutes: Route[] = [
   { path: "", component: WelcomepageComponent },
   { path: "home", component: HomepageComponent },
   { path: "signup", component: SignupComponent }
   ,{ path: "login", component: LoginComponent }
   ,{ path: "profile", component: ProfileComponent}
   ,{path: "settings", component: SettingsComponent}
   ,{path: "map", component: MapsComponent}
   ,{path: "event", component: EventComponent}
   ,{path: "friends", component: FriendsComponent}

   
];
