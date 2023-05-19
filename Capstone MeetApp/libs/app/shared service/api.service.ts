import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ILoginRequest } from '../utils/requests';
import { ILoginResponse } from '../utils/responses';
import { ISignUpOrgRequest } from '../utils/requests';
import { ISignUpOrgResponse } from '../utils/responses';
import { ISignUpUserRequest } from '../utils/requests';
import { ISignUpUserResponse } from '../utils/responses';
import { ILoginInfo } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = 'not implemented';
  constructor(private http: HttpClient) {}
 
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
    if (loginInfo.username === "techDemo")
        return false;
    else
        return true;
  }

  

  

}