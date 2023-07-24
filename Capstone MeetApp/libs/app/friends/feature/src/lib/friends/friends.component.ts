import { Component } from '@angular/core';
import { events,service,ServicesModule} from '@capstone-meet-app/services';
@Component({
  standalone:true,
  selector: 'capstone-meet-app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers:[service],
})
export class FriendsComponent {
  status: string|undefined
constructor(private servicesService: service) {}

    ngOnInit(){
    this.sendFriendRequest();
   // this.acceptRequest();
   // this.deletefriend();
  }
  async sendFriendRequest() {
  const requesterID = '647223decd65fc66879e13dc'; // Replace with the actual requester ID
  const requesteeID = '647223f8cd65fc66879e3f1f'; // Replace with the actual requestee ID
  status ='true';
   this.servicesService
      .sendfriendrequest(requesterID, requesteeID, status)
      .subscribe((response: any) => {
        console.log(response);
        // Handle the res ponse or UI updates after the friend request is sent successfully
      }) 
}
async acceptRequest() {
  const requesterID = '647223decd65fc66879e13dc'; // Replace with the actual requester ID
  const requesteeID = '647223f8cd65fc66879e3f1f'; // Replace with the actual requestee ID
  status ='true';
   this.servicesService
      .acceptFriendRequest(requesterID, requesteeID, status)
      .subscribe((response: any) => {
        console.log(response);
       
        // Handle the res ponse or UI updates after the friend request is sent successfully
      }) 
}
async deletefriend() {
  const requesterID = '647223decd65fc66879e13dc'; // Replace with the actual requester ID
  const requesteeID = '647223f8cd65fc66879e3f1f'; // Replace with the actual requestee ID
  status ='true';
   this.servicesService
      .deleteFriendRequest(requesterID, requesteeID)
      .subscribe((response: any) => {
        console.log(response);
        // Handle the res ponse or UI updates after the friend request is sent successfully
      })

 

}
}


