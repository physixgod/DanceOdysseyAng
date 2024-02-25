import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private baseURL = "http://localhost:8080/competition/"

  constructor(private http : HttpClient) { }

  getAllCompetitions():Observable<Competition[]>{
    return this.http.get<Competition[]>(this.baseURL+'ShowCompetitions')

  }
  addNewCompetition(c : Competition):Observable<Competition>{
    return this.http.post<Competition>(this.baseURL+'AddCompetitionorUpdate' , c);
  }
  CloseCompetition(id : number):Observable<Competition>{
    return this.http.put<Competition>(`${this.baseURL}UpdateCompetitionStatus/${id}`, id)
  }
}
