
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiService } from '../../../../../shared service/api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// eslint-disable-next-line @nx/enforce-module-boundaries
import { IEvent } from 'libs/app/utils/interfaces/event.interface';


@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [ApiService]
})
export class HomepageComponent {

  results: IEvent[];
  constructor(private router: Router, private apiService: ApiService){
     
    this.results = this.apiService.getAllEventsMock();
  }
  
  
  
    
  
}
  



