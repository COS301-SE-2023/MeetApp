import { bootstrapApplication } from "@angular/platform-browser";
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation
} from "@angular/router";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appRoutes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import{ApiService}from '@capstone-meet-app/app/shared service'

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),ApiService],
}).catch((err) => console.error(err));
