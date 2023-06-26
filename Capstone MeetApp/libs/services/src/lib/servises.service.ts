import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
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

    private baseURl='http://localhost:3000/api/';

    getAllEvents()
    {
        const url=this.baseURl+'events';
        return this.http.get(`${url}`);
    }
    createEvents(name: string,organisation: string,description: string,eventPoster: string, date: string, startTime: string,endTime: string,location: {latitude:string , longitude:string},category: string,region: string)
    {
        const url=this.baseURl+'events';
        const body=
        {
            
            name: name,
            organisation: organisation,
            description: description,
            eventPoster: eventPoster, 
            date: date,
             startTime: startTime,
             endTime: endTime,
            location: location,
             category: category,
             region: region
        }
        return this.http.post(`${url}`,body);

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
}