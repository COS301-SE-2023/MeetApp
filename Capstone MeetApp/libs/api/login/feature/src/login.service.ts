import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // This makes the service available globally
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Make the HTTP request to the authentication endpoint
    return this.http.post('http://example.com/api/login', { email, password });
  }
}
