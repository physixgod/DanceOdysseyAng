
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoriesProduct } from '../models/categorie-product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseURL = 'http://localhost:8086/DanceOdyssey/categories';

  constructor(private http: HttpClient) { }


  createCategoryWithSubcategories(categoryName: string, subcategoryNames: string[]): Observable<CategoriesProduct> {
    const url = `${this.baseURL}/createCategoryWithSubcategories`;
    const request = { categoryName, subcategoryNames };

    return this.http.post<CategoriesProduct>(url, request)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getCategories(): Observable<CategoriesProduct[]> {
    const url = `${this.baseURL}/All-Categorie`;
  
    return this.http.get<CategoriesProduct[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  getParentCategories(): Observable<CategoriesProduct[]> {
    const url = `${this.baseURL}/ParentCategories`;
  
    return this.http.get<CategoriesProduct[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  addSubcategoriesToParent(parentId: number, subcategoryNames: string[]): Observable<string> {
    const url = `${this.baseURL}/${parentId}/addSubcategories`;
    return this.http.post<string>(url, subcategoryNames).pipe(
      catchError(this.handleError)
    );
  }
  getSubCategories(parentId: number): Observable<CategoriesProduct[]> {
    const url = `${this.baseURL}/subCategories/${parentId}`;
  
    return this.http.get<CategoriesProduct[]>(url).pipe(
      catchError(this.handleError)
    );
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


}
