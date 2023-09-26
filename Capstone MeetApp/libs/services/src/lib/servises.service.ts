import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders ,HttpParams} from "@angular/common/http";
import {environment } from "./environment";


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

    private baseURl=environment.BASE_URL;

    private readonly TOKEN_KEY = 'access_token';

    //FUNCTIONS  TO HANDLE HEADERS

    private getCommonHeaders() {
      return new HttpHeaders()
        .set('x-api-key', environment.BACKEND_API_KEY);
    }

    private getAuthHeaders() {
      const token = this.getToken();
        return this.getCommonHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
    }

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
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }

    getEventByID(id:string)
    {
      const url=`${this.baseURl}events/${id}`;
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
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

      return this.http.post(`${url}`,body,{headers : this.getCommonHeaders()});

    }

    getEventsByRange(startDate?:string,endDate?:string){
        const url=`${this.baseURl}events/daterange/${startDate}/${endDate}`;
        return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }

    getEventsByRegion(region:string)
    {
      const url=`${this.baseURl}/events/daterange/api/events/region/${region}`;
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }
    
    getEventAttendanceCount(id:string)
    {
      const url=`${this.baseURl}events/${id}/attendance-count`;
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }
    
    getEventAttendance(id:string)
    {
      const url=`${this.baseURl}events/${id}/attendance`;
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }


    //SERVICES FOR USERS

    createUser(emailAddress: string,username:string,password:string,profilePicture:string,region:string)
    {
      const url=this.baseURl+'users/signup';
        
      const body=
      {
        emailAddress:emailAddress,
        username: username,
        password:password,
        profilePicture:profilePicture,
        region:region
      }

      return this.http.post(`${url}`,body,{headers : this.getCommonHeaders()});
    }

    authUser(username:string, password:string)
    {
      const url=this.baseURl+'users/login';
      
      const body=
      {
        username:username,
        password:password
      }

      return this.http.post(`${url}`,body,{headers : this.getCommonHeaders()});
    }

    getAllUsers()
    {
      const url=this.baseURl+'users';
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }

    getLogedInUser()
    {
      const url = this.baseURl + 'users/account';
      return this.http.get(`${url}`, { headers : this.getAuthHeaders() });
    }

    getUserByUsername(username:string|null)
    {

      const url=`${this.baseURl}users/username/${username}`;
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }
    
    updateUser(emailAddress?: string,username?:string ,password?:string,profilePicture?:string,region?:string){
        
      const url=`${this.baseURl}users/update`;

      const body={
        emailAddress:emailAddress,
        username:username,
        password:password,
        profilePicture:profilePicture,
        region:region
      }

      return this.http.patch(`${url}`,body,{headers : this.getAuthHeaders()});

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
  
    getUserAttendances()
    {
        const url=`${this.baseURl}users/attendances`;
        return this.http.get(`${url}`,{ headers  : this.getAuthHeaders()});
    }

    getUserAttendancesCount()
    {
        const url=`${this.baseURl}users/attendances/count`;
        return this.http.get(`${url}`,{ headers  : this.getAuthHeaders()});
    }


    getFriendsbyUsername(username:string|null)
    {
      const url=`${this.baseURl}users/${username}/friends`;
      return this.http.get(`${url}`,{headers : this.getCommonHeaders()});
    }

    //SERVICES FOR ORGANISER

    createOrginiser(emailAddress: string,username:string,password:string,name:string,events:string[])
    {
        const url=this.baseURl+'organisations/signup';

        const body=
        {
          emailAddress:emailAddress,
            username: username,
            password:password,
            name:name,
            events:events

        }

        return this.http.post(`${url}`,body,{headers : this.getCommonHeaders()});
    }

    authOrganiser(username:string, password:string)
    {
        const url=this.baseURl+'organisations/login';

        const body=
        {
            username:username,
            password:password
        }
        return this.http.post(`${url}`,body,{headers: this.getCommonHeaders()});
    }

    getAllOrganisers()
    {
        const url=this.baseURl+'organisations';
        return this.http.get(`${url}`,{headers: this.getCommonHeaders()});
    }

    getLogedInOrg() {
        const url = this.baseURl + 'organisations/account';
        return this.http.get(url, { headers : this.getAuthHeaders()});
    }


    //SERVICES FOR FRIENDS

    
    sendfriendrequest(requestee:string)
    {
        const url=`${this.baseURl}users/friend/send-request`;

        const body ={
            requestee:requestee
        }
        return this.http.post(`${url}`,body,{ headers  : this.getAuthHeaders() });
    }

    
    acceptFriendRequest(requester: string) {
        const url = `${this.baseURl}users/friend/accept-request`;

        const body = {
          requester: requester
        };
        return this.http.patch(`${url}`, body,{ headers  : this.getAuthHeaders() });
    }
      
    deleteFriendRequest(friendID: string) {
        const url = `${this.baseURl}users/friend/unfriend`;

        const body = {
          friendID: friendID
        };
    
        return this.http.delete(`${url}`, {headers  : this.getAuthHeaders(),body});
    }

    getFriendCount()
    {
        const url = `${this.baseURl}users/friends/count`;

        return this.http.get(`${url}`,{ headers  : this.getAuthHeaders() });
    }

     getFriends()
    {
        const url = `${this.baseURl}users/friends`;

        return this.http.get(`${url}`,{ headers  : this.getAuthHeaders() });
    }

    getFriendRequest()
    {
        const url = `${this.baseURl}users/friend-requests`;
        return this.http.get(`${url}`,{ headers  : this.getAuthHeaders() });
    }

    getPendingFriendRequest()
    {
        const url = `${this.baseURl}users/friend-requests/pending`;
        return this.http.get(`${url}`,{ headers  : this.getAuthHeaders() });
    }

    getSuggestedFriends()
    {
      const url = `${this.baseURl}users/friends/suggestions`;
      return this.http.get(`${url}`,{ headers  : this.getAuthHeaders() });
    }

    getMutualFriends(username:string|null)
    {
      const url=`${this.baseURl}users/friends/mutuals/${username}`;
      return this.http.get(`${url}`,{headers : this.getAuthHeaders()});
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
    
    
    attendEventUser(eventID:string)
    {
        const url = `${this.baseURl}users/attend`;

        const body = {
          eventID
        };

        return this.http.post(`${url}`, body,{ headers  : this.getAuthHeaders() });
    }

    getAttandanceByID(id:string)
    {
      const url = `${this.baseURl}users/${id}/attendances`;
      return this.http.get(`${url}`,{ headers: this.getCommonHeaders() });
    }

    getAttandanceCountByID(id:string)
    {
      const url = `${this.baseURl}users/${id}/attendances/count`;
      return this.http.get(`${url}`,{ headers : this.getCommonHeaders()});
    }

    //SERVICES FOR PASSWORD RECOVERY

    sendPasswordRequest(emailAddress:string)
    {
      const url=this.baseURl+'passwordrecoveries/send';

        const body ={
          emailAddress:emailAddress
        }

        return this.http.post(`${url}`,body,{ headers  : this.getCommonHeaders() });
    }

    verifyPasswordRequest(emailAddress:string,token:string )
    {
      const url=`${this.baseURl}passwordrecoveries/verify`;

      const params = {
        emailAddress: emailAddress,
        token:token
      };

      return this.http.post(`${url}`,{params:params},{ headers  : this.getCommonHeaders() });
    }
}