import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [CommonModule],
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
      title: 'Joburg Art Fair 1',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'Joburg Art Fair 1',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    },
    {
      imageSrc: 'path/to/your/image1.jpg',
      title: 'Joburg Art Fair 1',
      location: 'Sandton',
      date: '8-10 September 2023',
      description: 'The annual Joburg Art Fair will showcase the best in contemporary African art and design, with 23 galleries and 11'
    }
    
  ];
}






