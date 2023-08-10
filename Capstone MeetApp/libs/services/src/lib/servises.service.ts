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

    private baseURl='http://localhost:3000/api/';

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

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        return this.http.get(`${url}`,{headers});
    }

    getEventByID(id:string)
    {
        const url=`${this.baseURl}events/${id}`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        return this.http.get(`${url}`,{headers});
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
        
        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

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
        return this.http.post(`${url}`,body,{headers});

    }

    getEventsByRange(startDate?:string,endDate?:string){
        const url=`http://localhost:3000/api/events/daterange/${startDate}/${endDate}`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        return this.http.get(`${url}`,{headers});
    }

    getEventsByRegion(region:string)
    {
        const url=`http://localhost:3000/api/events/daterange/api/events/region/${region}`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');


        return this.http.get(`${url}`,{headers});
    }
    
    getEventAttendanceCount(id:string)
    {
        const url=`${this.baseURl}events/${id}/attendance-count`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        return this.http.get(`${url}`,{headers});
    }
    
    getEventAttendance(id:string){
        const url=`${this.baseURl}events/${id}/attendance`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        return this.http.get(`${url}`,{headers});
    }


    //SERVICES FOR USERS

    createUser(username:string,password:string,profilePicture:string,region:string)
    {
        const url=this.baseURl+'users/signup';
        
        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body=
        {
            username: username,
            password:password,
            profilePicture:profilePicture,
            region:region
        }
        return this.http.post(`${url}`,body,{headers});
    }

    authUser(username:string, password:string)
    {
        const url=this.baseURl+'users/login';
        
        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body=
        {
            username:username,
            password:password
        }
        return this.http.post(`${url}`,body,{headers});
    }

    getAllUsers()
    {
        const url=this.baseURl+'users';
        
        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        return this.http.get(`${url}`,{headers});
    }

    getLogedInUser(token:string|null) {
        const url = this.baseURl + 'users/account';
      
    
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
      
        return this.http.get(`${url}`, { headers });
    }

    getUser(id:string)
    {
        const url=`${this.baseURl}users/${id}`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        
        return this.http.get(`${url}`,{headers});
    }
    
    getUserByID(id:string)
    {
        const url=`${this.baseURl}users/${id}`;

        const headers = new HttpHeaders()
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
        
        return this.http.get(`${url}`,{headers});
    }
    
    updateUser(token:string|null, username?:string ,password?:string,profilePicture?:string,region?:string){
        
        const url=`${this.baseURl}users/update`;

        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body={
            username:username,
            password:password,
            profilePicture:profilePicture,
            region:region
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
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
      
        return this.http.get(`${url}`,{ headers });
    }

    getUserAttendancesCount(token:string|null)
    {
        const url=`${this.baseURl}users/attendances/count`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
      
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
      
        
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        
        return this.http.get(url, { headers });
    }


    //SERVICES FOR FRIENDS

    
    sendfriendrequest(token:string|null,requestee:string)
    {
        const url=`${this.baseURl}users/friend/send-request`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body ={
            requestee:requestee
        }
        return this.http.post(`${url}`,body,{ headers });
    }

    
    acceptFriendRequest(token:string|null,requester: string) {
        const url = `${this.baseURl}users/friend/accept-request`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body = {
          requester: requester
        };
        return this.http.patch(`${url}`, body,{ headers });
    }
      
    deleteFriendRequest(token:string|null,friendID: string) {
        const url = `${this.baseURl}users/friend/unfriend`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body = {
          friendID: friendID
        };
    
        return this.http.delete(`${url}`, {headers,body});
    }

    getFriendCount(token:string|null)
    {
        const url = `${this.baseURl}users/friends/count`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
      
        return this.http.get(`${url}`,{ headers });
    }

    getFriends(token:string|null)
    {
        const url = `${this.baseURl}users/friends`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
      
        return this.http.get(`${url}`,{ headers });
    }

    getFriendRequest(token:string|null)
    {
        const url = `${this.baseURl}users/friend-requests`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');
      
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
    
    
    attendEventUser(token:string|null,eventID:string)
    {
        const url = `${this.baseURl}users/attend`;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set('x-api-key', '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=');

        const body = {
          eventID
        };
        return this.http.patch(`${url}`, body,{ headers });
    }

     
}