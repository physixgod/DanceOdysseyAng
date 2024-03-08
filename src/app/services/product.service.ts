import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';  // Importer 'of' ici
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product';
import{CategoriesProduct} from'../models/categorie-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8086/DanceOdyssey/products';

  constructor(private http: HttpClient) { }
  getArchivedProducts(): Observable<Product[]> {
    const url = `${this.baseURL}/archived`;

    return this.http.get<Product[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  getProductByRefProduct(refProduct: number): Observable<Product> {
    const url = `${this.baseURL}/byRefProduct/${refProduct}`;
    
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  createCategoryWithSubcategories(categoryName: string, subcategoryNames: string[]): Observable<CategoriesProduct> {
    const url = `${this.baseURL}/createCategoryWithSubcategories`;
    const request = { categoryName, subcategoryNames };

    return this.http.post<CategoriesProduct>(url, request).pipe(
      catchError(this.handleError)
    );
  



    return throwError('Something went wrong');
  }


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseURL}/AddProduct`, product).pipe(
      catchError(this.handleError)
    );
  }

  getProductsById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/ShowAllProducts`).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}/updateProducts`, product).pipe(
      catchError(this.handleError)
    );
  }


  updateImage(productId: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
  
    const url = `${this.baseURL}/updateImage/${productId}`;
    return this.http.put<string>(url, formData);
  
  }
  
  getImageForProduct(id: number): Observable<Blob> {
    const url = `${this.baseURL}/produits/${id}/image`;
    return this.http.get(url, { responseType: 'arraybuffer' })
      .pipe(
        map((arrayBuffer: ArrayBuffer) => new Blob([arrayBuffer])),
        catchError((error: any) => {
          console.error(`An error occurred: ${error.message}`);
          return throwError('Image retrieval failed');
        })
      );
  }

  addProductToCategory(productId: number, categoryId: number, subCategoryId: number): Observable<string> {
    const url = `${this.baseURL}/add-to-category/${productId}/${categoryId}/${subCategoryId}`;
    
    return this.http.post(url, {}).pipe(
      map((response: any) => {
        console.log('Response from adding product to category:', response);
        return 'Product added to category successfully';
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding product to category:', error);
  
        if (error.status === 200) {
          return of('Product added to category successfully');
        } else {
          return throwError('Failed to add product to category');
        }
      })
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
  
  getSubCategories(parentId: number): Observable<CategoriesProduct[]> {
    const url = `${this.baseURL}/subCategories/${parentId}`;
  
    return this.http.get<CategoriesProduct[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  uploadImage(file: File, productId: number): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<string>(`${this.baseURL}/uploadImage/${productId}`, formData, { responseType: 'text' as 'json' }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
// Dans votre service Angular (product.service.ts)

archiveProduct(productId: number): Observable<string> {
  const url = `${this.baseURL}/archiveProduct/${productId}`;

  // Utilisez le verbe HTTP PUT pour appeler l'API d'archivage
  return this.http.put<string>(url, {}).pipe(
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