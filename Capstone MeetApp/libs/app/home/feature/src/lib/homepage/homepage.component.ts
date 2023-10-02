import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { RouterModule} from '@angular/router';
import { service,ServicesModule} from '@capstone-meet-app/services';
import { Platform } from '@ionic/angular'
import { Injectable } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { Observable } from 'rxjs'


@Component({
  selector: 'capstone-meet-app-homepage',
  standalone: true,
  imports: [IonicModule,RouterModule,CommonModule,FormsModule,Ng2SearchPipeModule,ServicesModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [service,HttpClient],
  
})

export class HomepageComponent {
  slideOpts = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16
  };
  
  loader=true;
  data= [{
    _id:'',
    name:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    eventDate: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:'',
    eventPoster:''
    
  }];

  recommend= [{
    _id:'',
    name:'',
    organisation: '',
    description:'',
    date: '',
    startTime: '',
    endTime: '',
    eventDate: '',
    location: {latitude:0 , longitude:0},
    category:'',
    region:'',
    eventPoster:''
    
  }];
 
  current_user={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
 }

  attendanceData: { [_id: string]: number } = {};

  userType:string|null = '';
  attendance=0;
  
  filteredData: any[] = [];
  searchQuery = '';
   updatedData = this.data.map(item => ({
    ...item, 
    attendance: this.attendance
  }));

   
 
  isLiked = false;
  toggleLike() {
    this.isLiked = !this.isLiked;
  }
  

  
  constructor(private service: service,private router: Router,private http: HttpClient,private activatedRoute: ActivatedRoute,private platform: Platform) {
  
  }
  
  refreshPage() {
    
    this.platform.ready().then(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (const registration of registrations) {
            registration.unregister();
          }
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
  
    });
    
    
  }
  async ngOnInit() {
    this.service.getAllEvents().subscribe((response: any) => { 
      this.data = response;
      for (let i = 0; i < this.data.length; i++) {
        this.getAttendance(this.data[i]._id);
      }
      this.getCurrentUser();
      setTimeout(()=>{                           
        this.loader = false;
    }, 200);
    })
    const currentUsername = await this.current_user.username
    this.service.getRecomendations(currentUsername).subscribe((response: any) => { 
      this.data = response;
      for (let i = 0; i < this.data.length; i++) {
        this.getAttendance(this.data[i]._id);
      }
      
      setTimeout(()=>{                           
        this.loader = false;
    }, 200);
    }
    
    );

    this.activatedRoute.paramMap.subscribe(params => {
      this.userType = params.get('userType');
    });
  
  }
 
  async getAttendance(id:string,)
  {
    await this.service.getEventAttendanceCount(id).subscribe((response:any) => {
      this.attendance=response;
      this.attendanceData[id] = response;
    });
  }

  viewEvent(eventId: string) {
    this.router.navigate(['events', eventId]);
  }

  
    
  search(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  gotomap() {
    this.router.navigateByUrl('/map');
  }

  gotohome() {
    this.router.navigateByUrl('/home');
  }

  gotoprofile() {
    this.router.navigateByUrl('/profile');
  }

  gotocalendar() {
    this.router.navigateByUrl('/calendar');
  }

  gotosettings() {
    this.router.navigateByUrl('/settings');
    
  }
  gotoSuggestedFriends() {
    this.router.navigate(['/suggestedfriends']);
  }
  gotoorganiser() {
    this.router.navigateByUrl('/organisers');
  }
  gotonotifications() {
    this.router.navigateByUrl('/notifications');
  }
  
  async getCurrentUser()
  {
    await this.service.getLogedInUser().subscribe((response:any) => {
      
      const username=this.service.getUsername();
     
      console.log(username);

      if(username==null)
      {
        this.current_user=response;
       
        this.getProfile(this.current_user.username);
      }
      else
      {
        this.getProfile(username);
      }
      
    });

  }

  async getProfile(username :string|null){
    await this.service.getRecomendations(username).subscribe((response:any)=>{ 
      this.recommend = response;
      console.log(response);
    });
  }
}
