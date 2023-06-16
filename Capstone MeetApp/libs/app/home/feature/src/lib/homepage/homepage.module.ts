import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from 'libs/app/home/feature/src/lib/homepage/homepage.component';
import { HomepageService } from 'libs/api/home/feature/src/homepage.service';
@NgModule({
  
  imports: [IonicModule,HttpClientModule,HomepageComponent],
  
})
export class HomepageModule {}



