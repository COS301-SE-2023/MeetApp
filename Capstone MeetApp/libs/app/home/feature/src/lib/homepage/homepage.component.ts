import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
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
  filteredData: any[] = [];
  searchQuery = '';

  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }




}
