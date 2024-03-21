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
    getEvents():Observable<Event[]>{
        return this.http.get<Event[]>(this.baseURL+'ShowEvents')
      }
      addEventByDancer(idDancer: number, event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.baseURL}AddEventByDancer/${idDancer}`, event);
      }
      showMyCreatedEvents(idDancer: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.baseURL}MyCreatedEvents/${idDancer}`);
      }
      getEventById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.baseURL}getEventById/${id}`);
      }
      deleteEvent(id: number): Observable<void> {
        // Note: If your backend API expects a PUT request for deletion, make sure it returns an empty response.
        return this.http.put<void>(`${this.baseURL}DeleteEvent/${id}`, {});
      }
      getEventsNearby(yourLatitude: number, yourLongitude: number, maxDistance: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.baseURL}nearbyEvents?yourLatitude=${yourLatitude}&yourLongitude=${yourLongitude}&maxDistance=${maxDistance}`);
      }
  
      
      

  }
  
  