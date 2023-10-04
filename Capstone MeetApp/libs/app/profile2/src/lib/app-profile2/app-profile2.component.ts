import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { user,service} from '@capstone-meet-app/services';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'capstone-meet-app-app-profile2',
  standalone: true,
  imports: [CommonModule,FormsModule ,IonicModule],
  templateUrl: './app-profile2.component.html',
  styleUrls: ['./app-profile2.component.css'],
})
export class AppProfile2Component {


  constructor(private router: Router,private serviceProvider: service,private activatedRoute: ActivatedRoute)
  {}


  profile={_id:'',username:'',password:'',profilePicture:'', region:''};
  eventCount='';
 
  friendCount=0;

  friends = [
    {
      _id:'',
      username:'',
      profilePicture:'' 
    }
  ];

  userEvents = [
    {
      _id:'',
      name:'',
      organisation:'',
      description:'',
      eventPoster:'',
      date: '',
      startTime: '',
      endTime: '',
      location: {latitude: 0 , longitude:0},
      category: '',
      region: ''
    }
  ];

  username:string|null='';

  async ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
    
    });

    this.getFriendAccount(this.username);
    
  }


  async getFriendAccount(username:string|null){
    await this.serviceProvider.getUserByUsername(username).subscribe((response:any)=>{
      this.profile = response;
    
      this.getFriendAttandance(this.profile._id);
      this.getFriendAttandanceCount(this.profile._id);
      this.getFriendAccountFriends(this.profile.username);
    });
  }

  async getFriendAttandanceCount(id:string){
    await this.serviceProvider.getAttandanceCountByID(id).subscribe((response:any)=>{
      console.log(response);
      this.eventCount=response;
    });
  }

  async getFriendAttandance(id:string){
    await this.serviceProvider.getAttandanceByID(id).subscribe((response:any)=>{
      console.log(response);
      this.userEvents=response;
      
    });
  }
  
  async getFriendAccountFriends(username:string|null){
    await this.serviceProvider.getFriendsbyUsername(username).subscribe((response:any)=>{
      console.log(response);
      this.friends=response;
      this.friendCount=this.friends.length;
    });
  }

  async getFriendAccountEvents(username:string|null){
    await this.serviceProvider.getEventsbyUsername(username).subscribe((response:any)=>{
      this.userEvents=response;
      console.log('Event display')
      console.log(this.userEvents);
    });
  }
  
  
  gotofriends() {
    this.router.navigate(['/friends']); 
  }

  viewEvent(eventId: string) {
    this.router.navigate(['events', eventId]);
  }

}
