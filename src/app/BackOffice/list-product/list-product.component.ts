import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,private router: Router) { }
  selectedImage: string | null = null;


  enlargeImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

   closeImageOnOutsideClick(event: MouseEvent): void {
    if (this.selectedImage && event.target === event.currentTarget) {
      this.closeImage();
    }
  }

  closeImage(): void {
    this.selectedImage = null;
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().pipe(
      catchError(error => {
        console.error('Error loading products:', error);
        return of([]);
      })
    ).subscribe(products => {
      this.products = products;
      this.loadImagesForAllProducts();
    });
  }

  loadImagesForAllProducts(): void {
    this.products.forEach(product => {
      this.loadImageForProduct(product);
    });
  }

  loadImageForProduct(product: Product): void {
    this.productService.getImageForProduct(product.idProduct).subscribe(
      (response: any) => {
        if (response instanceof Blob) {
          const imageUrl = URL.createObjectURL(response);
          product.imageUrl = imageUrl;
        } else {
          console.error(`Image response is not a Blob for product ${product.idProduct}`);
          product.imageUrl = ''; // Set a default image or empty string
        }
      },
      error => {
        console.error(`Error loading image for product ${product.idProduct}:`, error);
        product.imageUrl = ''; // Set a default image or empty string
      }
    );
  }
  archiveProduct(id: number): void {
    this.router.navigate(['/admin/list_Archived']);

    this.productService.archiveProduct(id).subscribe(
      (response: string) => {
        console.log('Product archived successfully:', response);
        // Rafraîchir la liste des produits après l'archivage
        this.loadProducts();
      },
      error => {
        console.error('Error archiving product:', error);
        // Gérer l'erreur si nécessaire
      }
    );
  }
  
}
