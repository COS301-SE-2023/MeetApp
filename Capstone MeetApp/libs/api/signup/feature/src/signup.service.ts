import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
  })
  export class SignupService {
    constructor(private http: HttpClient) {}
    signup(uname: string, email: string,phoneNo:string, password: string,confirmPass:string): Observable<any> {
        const signupData = {
          uname: uname,
          phoneNo:phoneNo,
          email: email,
          password: password,
          confirmPass:confirmPass
        };
        return this.http.post<any>('/api/signup', signupData).pipe(
            catchError((error: HttpErrorResponse) => {
              // Handle specific errors or transform the error response
              console.log('Signup service error:', error);
              const err = new Error('An error occurred during signup. Please try again.');
              return throwError(() => err);
            })
        );
      }
    
  }
 

  