import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';
import { Dancer } from '../models/competition';

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
affecterDancerCompetition(idC: number, idD: number): Observable<any> {
  const url = `${this.baseURL}Register/${idC}/${idD}`;
  return this.http.post(url, {});
}
getCompetitionDancers(idCompetition: number): Observable<Dancer[]> {
return this.http.get<Dancer[]>(`${this.baseURL}getCompetitionDancers/${idCompetition}`);
}
getMyCompetitions(idDancer: number): Observable<Map<string, string>> {
  return this.http.get<Map<string, string>>(`${this.baseURL}getMyCompetitions/${idDancer}`);
}
getCompetitionImage(id: number): Observable<string> {
  return this.http.get(`${this.baseURL}getCompetitionImage/${id}`, { responseType: 'text' });
}
updateCompetitionImage(id: number, image: File): Observable<Competition> {
  const formData: FormData = new FormData();
  formData.append('image', image, image.name);

  return this.http.post<Competition>(`${this.baseURL}uploadCompetitionImage/image/${id}`, formData);
}
}
