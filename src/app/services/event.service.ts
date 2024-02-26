import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService{
    private baseURL = "http://localhost:8086/event/"
    constructor(private http : HttpClient) { }
    addEvent(e:Event):Observable<Event[]>{
        return this.http.post<Event[]>(this.baseURL+"AddEvent",e)
      }
  }
  
  