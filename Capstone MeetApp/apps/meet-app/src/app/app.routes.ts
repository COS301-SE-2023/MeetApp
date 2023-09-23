import { Route } from "@angular/router";
import { RouterModule, Routes } from '@angular/router';
import { Component } from "@angular/core";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {CalendarComponent} from "@capstone-meet-app/calendar/feature"
import { LoginComponent } from '@capstone-meet-app/app/login/feature';
import { SignupComponent } from '@capstone-meet-app/app/signup/feature';
import { HomepageComponent } from '@capstone-meet-app/app/home/feature';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { WelcomepageComponent } from '@capstone-meet-app/app/welcome/feature';

import {ProfileComponent} from '@capstone-meet-app/app/profile/feature'
import {SettingsComponent} from '@capstone-meet-app/settings/feature'
import {MapsComponent}from '@capstone-meet-app/map'
import { EventComponent } from "@capstone-meet-app/app/event/feature";
import {OrganiserComponent}from '@captone-meet-app/organiser';
import {FriendsComponent} from '@capstone-meet-app/friends';
import {AppAttendeesComponent} from '@capstone-meet-app/app/attendees';
import {AppProfile2Component} from '@capstone-meet-app/app/profile2';
import {AppSuggestedFriendsComponent} from '@capstone-meet-app/app/suggested-friends';
import {AppNotificationsComponent} from '@capstone-meet-app/app/notifications';
import {AppAnalyticsComponent} from '@capstone-meet-app/app/analytics'
import {AppChatroomComponent}  from '@capstone-meet-app/app/chatroom';
export const appRoutes: Route[] = [
   { path: "", component: WelcomepageComponent },
   { path: "home", component: HomepageComponent },
   { path: "signup", component: SignupComponent }
   ,{ path: "login", component: LoginComponent }
   ,{ path: "profile", component: ProfileComponent}
   ,{path: "settings", component: SettingsComponent}
   ,{path: "map", component: MapsComponent}
   ,{path: "events/:eventId", component: EventComponent}
   ,{path: "friends", component: FriendsComponent},
   {path: "organisers", component: OrganiserComponent},
   {path: "calendar",component:CalendarComponent},
   {path: "profileusers/:username",component:AppProfile2Component},
   {path: "attendees/:eventId",component:AppAttendeesComponent},
   {path:"suggestedfriends",component:AppSuggestedFriendsComponent},
   {path:"notifications",component:AppNotificationsComponent},
   {path:"analytics",component:AppAnalyticsComponent},
   {path:"chatroom",component:AppChatroomComponent}
];
