import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
 

  private baseURL = "http://localhost:8086/competition/"

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
  SearchCompetitionByName(name: string): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${this.baseURL}SearchCompetitionByName/${name}`);
}
getArchivedCompetitions():Observable<Competition[]>{
  return this.http.get<Competition[]>(this.baseURL+'showClosedCompetition')
}
getRanks(idCompetition: number): Observable<Map<string, number>> {
  return this.http.get<Map<string, number>>(`${this.baseURL}showDancersRank/${idCompetition}`);
}
getCompetitionById(id: number): Observable<Competition> {
  return this.http.get<Competition>(`${this.baseURL}getcp/${id}`);
}
registerDancerForCompetition(idDancer: number, idCompetition: number): Observable<void> {
  const registrationData = {
    idDancer: idDancer,
    idCompetition: idCompetition
  };

  return this.http.post<void>(`${this.baseURL}registerCompetition`, registrationData);
}}
