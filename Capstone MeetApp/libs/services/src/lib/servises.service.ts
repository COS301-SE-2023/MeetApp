import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";


export interface events{
    name:string;
    organisation:string;
    date:string;
    startTime:string;
    endTime:string;
    eventDate:string;
    lng:number;
    locactionlat:number;
    location:Record<number,unknown>;
    category:string;
    region:string;


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

@Injectable({
    providedIn:'root'
})
export class service{
    constructor(private http:HttpClient){}

    private baseURl='localhost:3000/api/';

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
             //location: {latitude:latitude , longitude:longitude},
             category: category,
             region: region
        }
        return this.http.post(`${url}`,body);

    }
}