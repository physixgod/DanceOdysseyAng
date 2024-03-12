
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product,Image } from '../models/product';
import { CategoriesProduct } from '../models/categorie-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8086/DanceOdyssey/products';

  constructor(private http: HttpClient) { }

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

  createCategoryWithSubcategories(categoryName: string, subcategoryNames: string[]): Observable<CategoriesProduct> {
    const url = `${this.baseURL}/createCategoryWithSubcategories`;
    const request = { categoryName, subcategoryNames };

    return this.http.post<CategoriesProduct>(url, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  getArchivedProducts(): Observable<Product[]> {
    const url = `${this.baseURL}/archived`;

    return this.http.get<Product[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}/updateProducts`, product).pipe(
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

// Dans votre service Angular (product.service.ts)

archiveProduct(productId: number): Observable<string> {
  const url = `${this.baseURL}/archiveProduct/${productId}`;

  // Utilisez le verbe HTTP PUT pour appeler l'API d'archivage
  return this.http.put<string>(url, {}).pipe(
    catchError(this.handleError)
  );
}
addImagesToProduct(productId: number, images: File[]): Observable<string> {
  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append('imageFiles', image, `image${index}`);
  });

  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  
  return this.http.post<string>(`${this.baseURL}/${productId}/addImages`, formData, { headers });
}


getImagesForProduct(productId: number): Observable<Image[]> {
  const url = `${this.baseURL}/${productId}/images`;

  return this.http.get<Image[]>(url).pipe(
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
searchProductsByName(name: string): Observable<Product[]> {
  const url = `${this.baseURL}/search/${name}`;

  return this.http.get<Product[]>(url)
    .pipe(
      catchError(this.handleError)
    );
}
updateImageUrl(productId: number, imageId: number, updatedImageFile: File): Observable<string> {
  const formData = new FormData();
  formData.append('imageFile', updatedImageFile);

  return this.http.put<string>(`${this.baseURL}/${productId}/images/${imageId}`, formData)
    .pipe(
      catchError(this.handleError)
    );
}

updateProductById(productId: number, updatedProduct: Product): Observable<Product> {
  const url = `${this.baseURL}/${productId}`;

  return this.http.put<Product>(url, updatedProduct)
    .pipe(
      catchError(this.handleError)
    );
}
}
