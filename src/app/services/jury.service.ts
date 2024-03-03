import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JuryManager } from '../models/jury';
import { Competition } from '../models/competition';

@Injectable({
  providedIn: 'root'
})
export class JuryService{
    private baseURL = "http://localhost:8086/jury/"
    constructor(private http : HttpClient) { }
    addJury(j:JuryManager):Observable<JuryManager[]>{
        return this.http.post<JuryManager[]>(this.baseURL+"addJury",j)
      }
      getAllJuries(): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(this.baseURL + "getAll");
      }  

      approveJury(id: number): Observable<any> {
        return this.http.put<any>(`${this.baseURL}approvejury/${id}`, null);
      }
      
      rejectJury(id: number): Observable<any> {
        return this.http.put<any>(`${this.baseURL}rejectjury/${id}`, null);
      }

      getAllCompetitions():Observable<Competition[]>{
        return this.http.get<Competition[]>(this.baseURL+"competitions")
  
      }
      getApprovedJuries(): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(this.baseURL + "showApprovedJuries");
      }
      showNotAffectedJuries(competitionId: number): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}showNotAffectedJuries/${competitionId}`);
      }
      setJuries(idCompetition: number, idJuries: number): Observable<void> {
        return this.http.post<void>(`${this.baseURL}setJury/${idCompetition}/${idJuries}`, null);
      }
      showAffectedJuries(idCompetition: number): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}showAffectedJuries/${idCompetition}`);
      }
      searchJuryByName(name: string): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}SearchJuryByName/${name}`);
      }
      
  }
  