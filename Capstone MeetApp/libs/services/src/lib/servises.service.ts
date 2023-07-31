import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// EVENT INTERFACES //
export interface events{
    id:string;
    name:string;
    organisation:string;
    description:string;
    eventPoster:string;
    date: string;
    startTime: string;
    endTime: string;
    location: {latitude: number , longitude:number};
    category: string; 
    region: string;
}

export interface createEvents{
    name:string;
    organisation:string;
    description:string;
    eventPoster:string;
    date: string;
    startTime: string;
    endTime: string;
    location: {latitude: number , longitude:number};
    category: string; 
    region: string;
    
}


// USER INTERFACES //
export interface user{
    username:string;
    password:string;
    profilePicture:string;
    region:string;
}

export interface createUser{
    username:string;
    password:string;
    profilePicture:string;
    region:string;
}


// ORGANISER INTERFACES //
export interface organiser{
    username:string
    password:string;
    name:string
    events:string[];
}

export interface createOrginise{
    username:string
    password:string;
    name:string
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

    private baseURl='http://meetapp-env-1.eba-ehi39aq5.af-south-1.elasticbeanstalk.com/api/';


    private readonly TOKEN_KEY = 'access_token';

    //FUNCTIONS TO ACCESS THE TOKEN
      
    setToken(token: string) 
    {
        localStorage.setItem(this.TOKEN_KEY, token);
      
    }
    
    getToken(): string | null 
    {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    
    removeToken() 
    {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    //SERVICES FOR EVENTS

    getAllEvents()
    {
        const url=this.baseURl+'events';
        return this.http.get(`${url}`);
    }

    getEventByID(id:string)
    {
        const url=`${this.baseURl}events/${id}`;
        return this.http.get(`${url}`);
    }
    
    getEventByIDs(id:string,eventIds:string)
    {
        const url=`${this.baseURl}events/${id}`;
        const params = {
            eventIds: eventIds
        };
        return this.http.get(`${url}`,{params:params});
    }

    createEvents(name: string,organisation: string,description: string,eventPoster:string, date: string,
         startTime: string,endTime: string,location: {latitude:number , longitude:number},
         category: string,region: string)
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


    getEventsByRange(startDate?:string,endDate?:string){
        const url=`http://meetapp-env-1.eba-ehi39aq5.af-south-1.elasticbeanstalk.com/api/events/daterange/${startDate}/${endDate}`;
        return this.http.get(`${url}`);
    }

    getEventsByRegion(region:string)
    {
        const url=`http://meetapp-env-1.eba-ehi39aq5.af-south-1.elasticbeanstalk.com/api/events/daterange/api/events/region/${region}`;
        return this.http.get(`${url}`);
    }
    
    getEventAttendanceCount(id:string)
    {
        const url=`${this.baseURl}events/${id}/attendance-count`;
        return this.http.get(`${url}`);
    }
    
    //SERVICES FOR USERS

    createUser(username:string,password:string,profilePicture:string,region:string)
    {
        const url=this.baseURl+'users/signup';
        const body=
        {
            username: username,
            password:password,
            profilePicture:profilePicture,
            region:region
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

    getLogedInUser(token:string|null) {
        const url = this.baseURl + 'users/account';
      
        // Create headers object and set the desired headers including the token
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        // Pass the headers object as the second parameter in the get() method
        return this.http.get(url, { headers });
    }

    getUser(id:string)
    {
        const url=`${this.baseURl}users/${id}`;
        return this.http.get(url);
    }
    
    getUserByID(id:string)
    {
        const url=`${this.baseURl}users/${id}`;
        return this.http.get(url);
    }
    
    updateUser(token:string|null, username?:string ,password?:string,profilePicture?:string,region?:string){
        
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
            username:username,
            password:password,
            profilePicture:profilePicture,
            region:region
        }

        return this.http.patch(`${url}`,body,{headers});
    }

    updateUserID(id:string, username?:string ,password?:string,profilePicture?:string,region?:string){
        
        const url=`${this.baseURl}users/${id}`;
        const body={
            username:username,
            password:password,
            profilePicture:profilePicture,
            region:region
        }

        return this.http.patch(`${url}`,body);
    }


    updateSettingsEmail(token:string|null,email?:string){
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
            email:email, 
        }
        return this.http.patch(`${url}`,body,{headers});
    }
  
    updateSettingsRegion(token:string|null,region?:string){
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
            region:region,
        }
        return this.http.patch(`${url}`,body,{headers});
    }
  
    updateSettingspassword(token:string|null,password?:string){
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
           
            password:password,
          
           
        }
        return this.http.patch(`${url}`,body,{headers});
    }
  
    updateSettingsusername(token:string|null,username?:string){
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
           
            username:username,
          
           
        }
        return this.http.patch(`${url}`,body,{headers});
    }
  
    updateSettingsinterests(token:string|null,interests?:string[]){
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
           
            interests:interests,
          
           
        }
        return this.http.patch(`${url}`,body,{headers});
    }
  
    updateSettingsprofilepicture(token:string|null,profilePicture?:string){
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body={
           
            profifilePicture:profilePicture,
          
           
        }
        return this.http.patch(`${url}`,body,{headers});
    }

    updatepassword(token:string|null,password?: string) {
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);


        const body={password:password};
      
        if (password) {
          body.password = password;
        }
        return this.http.patch(`${url}`,body,{headers});
       
    }
       
    deleteAccount(userId: string, reason: string) 
    {
        const url = `${this.baseURl}users/${userId}`;
    
        const body = {
          deleteAccount: true,
          reason: reason
        };
    
        return this.http.delete(url, { body: body },);
    }
  
    getUserAttendances(token:string|null)
    {
        const url=`${this.baseURl}users/attendances`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        return this.http.get(`${url}`,{ headers });
    }

    getUserAttendancesCount(token:string|null)
    {
        const url=`${this.baseURl}users/attendances/count`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        return this.http.get(`${url}`,{ headers });
    }


    //SERVICES FOR ORGANISER

    createOrginiser(username:string,password:string,name:string,events:string[])
    {
        const url=this.baseURl+'organisations/signup';
        const body=
        {
            username: username,
            password:password,
            name:name,
            events:events

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

    getLogedInOrg(token: string) {
        const url = this.baseURl + 'organisations/account';
      
        // Create headers object and set the desired headers including the token
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        // Pass the headers object as the second parameter in the get() method
        return this.http.get(url, { headers });
    }


    //SERVICES FOR FRIENDS

    
    sendfriendrequest(token:string|null,requester:string, requestee:string,status:string)
    {
        const url=`${this.baseURl}users/friend/send-request`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body ={
            requester:requester,
            requestee:requestee,

            status:status
        }
        return this.http.post(`${url}`,body,{ headers });
    }

    
    acceptFriendRequest(token:string|null,requester: string, requestee: string, status: string) {
        const url = `${this.baseURl}users/friend/accept-request`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body = {
          requester: requester,
          requestee: requestee,
          status: status,
        };
        return this.http.patch(`${url}`, body,{ headers });
    }
      
    deleteFriendRequest(token:string|null,friendID: string, friend: string) {
        const url = `${this.baseURl}users/friend/unfriend`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        const body = {
          friendID: friendID,
          friend: friend,
        };
    
        return this.http.delete(`${url}`, {headers,body});
    }

    getFriendCount(token:string|null)
    {
        const url = `${this.baseURl}users/friends/count`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
      
        return this.http.get(`${url}`,{ headers });
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

