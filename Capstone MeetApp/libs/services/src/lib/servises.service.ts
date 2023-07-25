import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
//import { url } from "inspector";
//import { Observable } from "rxjs";


export interface events{
    name:string;
    organisation:string;
    date:string;
    startTime:string;
    endTime:string;
    eventDate:string;
    lng:number;
    lat:number;
    location: {latitude:string , longitude:string};
    category:string;
    region:string;
    description:string;


}


export interface createEvents
{
    
    name: string;
    organisation: string;
    description: string;
     eventPoster: string;
     date: string;
     startTime: string;
    endTime: string;
     location: {latitude:string , longitude:string};
    category: string; 
    region: string;
}

export interface User{
    username:string,
    password:string,
    profilePicture:string,
    region:string
}
export interface createUser
{
    username:string;
    password:string;
    name:string;
    email:string;
    location: {latitude:string , longitude:string};
    events:string;
    phoneNumber:string;
}
export interface createOrginiser
{
    username:string;
    password:string;
    name:string;
    email:string;
    location: {latitude:string , longitude:string};
    events:string;
    phoneNumber:string;
}
export interface createFriend
{
    requester:string;
    requestee:string;
    status:string;

}

@Injectable({
    providedIn:'root'
})
export class service{
    constructor(private http:HttpClient){}

    private baseURl='http://meetapp-env-1.eba-ehi39aq5.af-south-1.elasticbeanstalk.com/api/';

    getAllEvents()
    {
        const url=this.baseURl+'events';
        return this.http.get(`${url}`);
    }
    createEvents(name: string,organisation: string,description: string, date: string, startTime: string,endTime: string,location: {latitude:string , longitude:string},category: string,region: string)
    {
        const url=this.baseURl+'events';
        const body=
        {
            
            name: name,
            organisation: organisation,
            description: description,
           // eventPoster: eventPoster, 
            date: date,
             startTime: startTime,
             endTime: endTime,
            location: location,
             category: category,
             region: region
        }
        return this.http.post(`${url}`,body);

    }

     getEventsByRange(startDate?:string,endDate?:string){
        const url=`http://meetapp-env-1.eba-ehi39aq5.af-south-1.elasticbeanstalk.com/api/events/daterange/${startDate}/${endDate}`;
        return this.http.get(`${url}`);
    }
    
    createUser(username:string,password:string, name:string,email:string,phoneNumber:string,  location: {latitude:string , longitude:string},events:string)
    {
        const url=this.baseURl+'users';
        const body=
        {
            
            username: username,
            password:password,
            name:name,
            email:email,
            phoneNumber:phoneNumber,
              location: location,
              events:events
        }
        return this.http.post(`${url}`,body);
    }
    createOrginiser(username:string, password:string,name:string,email:string,phoneNumber:string, location: {latitude:string , longitude:string},events:string)
    {
        const url=this.baseURl+'orginisations';
        const body=
        {
            
            username: username,
            password:password,
            name:name,
            email:email,
            phoneNumber:phoneNumber,
              location: location,
              events:events
        }
        return this.http.post(`${url}`,body);
    }
    createFriend( requester:string, requestee:string, status:string)
    {
        const url=this.baseURl+'friendships';
        const body=
        {
        requester:requester,
         requestee:requestee, 
         status:status
        }
         return this.http.post(`${url}`,body);
    }

    getUser(id:string){
        const url=`${this.baseURl}users/${id}`;
        return this.http.get(`${url}`);
    }
    
    //body JSON example = {"region": "Joburg", "profifilePicture": "http://localhost..."}
    updateUser(id:string,username?:string,profilePicture?:string,region?:string){
        const url=`${this.baseURl}users/${id}`;
        const body={
            username:username,
            profilePicture:profilePicture,
            region:region
        }
        return this.http.patch(`${url}`,body);
    }
    getUserAttendances(id:string){
        const url=`${this.baseURl}users/${id}/attendances`;
        return this.http.get(`${url}`);
    }
    getUserAttendancesCount(id:string){
        const url=`${this.baseURl}users/${id}/attendances/count`;
        return this.http.get(`${url}`);
    }
    /*getUserAttendancesEventsList(ids:string[]){
        const url=`${this.baseURl}events/fetch-by-ids?eventsIds=${ids}`;
        return this.http.get(`${url}`);
    }*/
}
