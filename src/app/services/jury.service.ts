import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { JuryManager } from '../models/jury';
import { Competition } from '../models/competition';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuryService {
  private baseURL = "http://localhost:8086/jury/";

  constructor(private http: HttpClient) { }

  getImageForJury(id: number): Observable<Blob> {
    const url = `${this.baseURL}/${id}/image`; // Update the URL to match the API endpoint for fetching jury images
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        catchError((error: any) => {
          console.error(`An error occurred: ${error.message}`);
          return throwError('Image retrieval failed');
        })
      );
  }
  
  

  uploadImage(file: File, juryId: number): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
  
    return this.http.post<any>(`${this.baseURL}uploadImage/${juryId}`, formData, { responseType: 'text' as 'json' }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  
  
    addJury(j:JuryManager):Observable<JuryManager>{
        return this.http.post<JuryManager>(this.baseURL+"addJury",j)
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
      getJuriesByName(idCompetition: number, name: string): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}SearchJuries/${idCompetition}/${name}`);
      }
      private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
    
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
    
          const errorMessage = error.error && error.error.error ? error.error.error : 'Something went wrong';
    
          return throwError(errorMessage);
        }
    
        return throwError('Something went wrong');
      }
      
      uploadExcelFile(competitionId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Competition>(`${this.baseURL}${competitionId}/uploadExcel`, formData);
  }
}