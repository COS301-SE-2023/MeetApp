import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { IEvents, ILoginRequest,ILoginResponse, ILoginInfo, ISignupInfo, IEvent, ISignUpOrgResponse, ISignUpOrgRequest, ISignUpUserRequest, ISignUpUserResponse } from '@capstone-meet-app/utils';
import mockEvents from './mockData.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = 'not implemented';
  mockEventsFeed : Array<IEvent> = []; 
  constructor(private http: HttpClient) {
    this.mockEventsFeed = mockEvents
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  login(loginInfo: ILoginInfo): Observable<ILoginRequest> {
    return this.http
      .post<ILoginRequest>(
        this.apiURL + '/login',
        JSON.stringify(loginInfo),
        this.httpOptions
      )
      .pipe(map(response => {
        
        return response;
      }));
  }

  handleError(error: any) {
    ;
  }

  loginMock(loginInfo: ILoginInfo) {
    if (loginInfo.username === "techDemo@gmail.com")
        return false;
    else
        return true;
  }

  signupMock(signupInfo: ISignupInfo) {
    return {message: 'success', userInfo: signupInfo}
  }

  getAllEventsMock() {
    return this.mockEventsFeed;
  }

  /*getRegionalEventsMock(region: string){
    return this.mockEventsFeed.filter(currentEvent => {
        if (currentEvent.region == region)
            return currentEvent
    })
  }*/
  

  

}