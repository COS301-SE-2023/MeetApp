import { bootstrapApplication } from "@angular/platform-browser";
import { ReactiveFormsModule } from '@angular/forms';
import {
  RouteReuseStrategy,
  provideRouter,
  withEnabledBlockingInitialNavigation
} from "@angular/router";
import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appRoutes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "./environment";

//import{ApiService}from '../../../libs/app/shared service/api.service'

bootstrapApplication(AppComponent, {
  providers: [{
    provide:RouteReuseStrategy,useClass :IonicRouteStrategy},importProvidersFrom(IonicModule.forRoot({}),AngularFireModule.initializeApp(environment.firebase)), provideRouter(appRoutes, withEnabledBlockingInitialNavigation())],

}).catch((err) => console.error(err));

