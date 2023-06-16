import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
  
})
export class HomepageService {
  private apiUrl = 'localhost:3000/events'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => response) // Modify the mapping logic based on your API response structure
    );
  }
}
