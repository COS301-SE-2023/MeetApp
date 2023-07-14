import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
//import { url } from "inspector";
//import { Observable } from "rxjs";


// EVENT INTERFACES //
export interface events{
    name:string;
    organisation:string;
    description:string;
    date: string;
    startTime: string;
    endTime: string;
    location: {latitude: number , longitude:number};
    category: string; 
    region: string;
    eventPoster:string;
}

export interface createEvents{
    name:string;
    organisation:string;
    description:string;
    date: string;
    startTime: string;
    endTime: string;
    location: {latitude: number , longitude:number};
    category: string; 
    region: string;
    eventPoster:string;
}


// USER INTERFACES //
export interface user{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
    phoneNumber:string;
    region:string;
    profilePicture:string;
}

export interface createUser{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
    phoneNumber:string;
    region:string;
    profilePicture:string;
}


// ORGANISER INTERFACES //
export interface organiser{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
    phoneNumber:string;
    orgDescription:string;
    events:string[];
}

export interface createOrginise{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
    phoneNumber:string;
    orgDescription:string;
    events:string[];
}


// FRIENDS INTERFACES //

export interface friend{
    requester:string;
    requestee:string;
    status:string;

}

export interface createFriend{
    requester:string;
    requestee:string;
    status:string;

}

// ATTENDANCE INTERFACES //
export interface attendance{
    organisationID: string;
    eventID: string;
    userID: string;

}

export interface createAttendance{
    organisationID: string;
    eventID: string;
    userID: string;

}

@Injectable({
    providedIn:'root'
})
export class service{
    constructor(private http:HttpClient){}

    private baseURl='http://localhost:3000/api/';

    //SERVICES FOR EVENTS

    getAllEvents()
    {
        const url=this.baseURl+'events';
        return this.http.get(`${url}`);
    }

    getEventByID(id:string){
        const url=`${this.baseURl}events/${id}`;
        return this.http.get(`${url}`);
    }
    
    createEvents(name: string,organisation: string,description: string, date: string, startTime: string,endTime: string,location: {latitude:number , longitude:number},category: string,region: string,eventPoster:string)
    {
        const url=this.baseURl+'events';
        const body=
        {
            name: name,
            organisation: organisation,
            description: description,
            date: date,
            startTime: startTime,
            endTime: endTime,
            location: location,
            category: category,
            region: region,
            eventPoster: eventPoster
        }
        return this.http.post(`${url}`,body);

    }

    getEventsByRange(startDate?:string,endDate?:string){
        const url=`http://localhost:3000/api/events/daterange/${startDate}/${endDate}`;
        return this.http.get(`${url}`);
    }

    getEventsByRegion(region:string)
    {
        const url=`http://localhost:3000/api/events/region/${region}`;
        return this.http.get(`${url}`);
    }
    
    //SERVICES FOR USERS

    createUser(name:string,surname:string,username:string,email:string,password:string,phoneNumber:string,region:string,profilePicture:string)
    {
        const url=this.baseURl+'users/signup';
        const body=
        {
            name:name,
            surname:surname,
            username: username,
            email:email,
            password:password,
            phoneNumber:phoneNumber,
            region:region,
            profilePicture:profilePicture
        }
        return this.http.post(`${url}`,body);
    }

    authUser(username:string, password:string)
    {
        const url=this.baseURl+'users/login';
        const body=
        {
            username:username,
            password:password
        }
        return this.http.post(`${url}`,body);
    }

    getAllUsers()
    {
        const url=this.baseURl+'users';
        return this.http.get(`${url}`);
    }

    getLogedInUser(token: string) {
        const url = this.baseURl + 'users/account';
      
        // Create headers object and set the desired headers including the token
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        // Pass the headers object as the second parameter in the get() method
        return this.http.get(url, { headers });
    }

    getUser(token:string)
    {
        const url = this.baseURl + 'users';
      
        // Create headers object and set the desired headers including the token
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        // Pass the headers object as the second parameter in the get() method
        return this.http.get(url, { headers });
    }
    
    getUserByID(id:string){
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

    //SERVICES FOR ORGANISER

    createOrginiser(name:string,surname:string,username:string,email:string,password:string,phoneNumber:string, orgDescription:string)
    {
        const url=this.baseURl+'organisations/signup';
        const body=
        {
            name:name,
            surname:surname,
            username: username,
            email:email,
            password:password,
            phoneNumber:phoneNumber,
            orgDescription:orgDescription
        }
        return this.http.post(`${url}`,body);
    }

    authOrganiser(username:string, password:string)
    {
        const url=this.baseURl+'organisations/login';
        const body=
        {
            username:username,
            password:password
        }
        return this.http.post(`${url}`,body);
    }

    getAllOrganisers()
    {
        const url=this.baseURl+'organisations';
        return this.http.get(`${url}`);
    }


    //SERVICES FOR FRIENDS

    createFriend(requester:string, requestee:string, status:string)
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

    //SERVICES FOR ATTENDANCE

    attendEvent(organisationID: string,eventID: string,userID: string)
    {
        const url=this.baseURl+'attendances';
        const body=
        {
            organisationID:organisationID,
            eventID:eventID,
            userID:userID
        }
        return this.http.post(`${url}`,body);
    }

}