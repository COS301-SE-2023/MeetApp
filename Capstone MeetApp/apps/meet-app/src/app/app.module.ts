import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageService } from 'libs/api/home/feature/src/homepage.service';

import { AppComponent } from './app.component';

@NgModule({
  //declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [HomepageService ],
 //bootstrap: [AppComponent]
})
export class AppModule {}
