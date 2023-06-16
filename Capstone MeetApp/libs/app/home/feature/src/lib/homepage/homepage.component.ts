import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { FormBuilder,  Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
//import {ApiService } from '@capstone-meet-app/app/shared service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {HomepageModule} from 'libs/app/home/feature/src/lib/homepage/homepage.module';
import { HomepageService } from 'libs/api/home/feature/src/homepage.service';


// eslint-disable-next-line @nx/enforce-module-boundaries
//import { IEvent } from '@capstone-meet-app/utils';


@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[HomepageService]
})
export class HomepageComponent {
 // data: any[] = [];
  data = [
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'Joburg Art Fair 1',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'CottonFest',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'Knysna Oyster Festival',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'standard Bank jazzfest',
      location: 'pretoria',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    }
    
  ];
  
 constructor(private homepageService: HomepageService,private router: Router,private http: HttpClient) {}
  //constructor(private router: Router) {}

  filteredData: any[] = [];
  searchQuery = '';
  
 
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.homepageService.getEvents().subscribe({
      next: (response) => {
        this.data = response;
        // Perform any additional operations with the data
      },
      error: (error) => {
        console.error('Failed to fetch events:', error);
      }
    });
  }
  
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  onSignUp() {
    
    this.router.navigate(['/event']);
  }

}
