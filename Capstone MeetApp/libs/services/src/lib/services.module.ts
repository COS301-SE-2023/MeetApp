import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {service} from 'libs/services/src/lib/servises.service';

@NgModule({
  imports: [CommonModule,],
  providers:[service]
})
export class ServicesModule {}
