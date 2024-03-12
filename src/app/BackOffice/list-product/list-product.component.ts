import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number = 0;
  images: Image[] = [];
  searchName: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  openImageGallery(productId: number): void {
    this.selectedProductId = productId;
    this.loadImagesForProduct(productId);
  }

  onSelectProduct(productId: number): void {
    this.selectedProductId = productId;
    this.loadImagesForProduct(productId);
  }

  loadImagesForProduct(productId: number): void {
    this.productService.getImagesForProduct(productId).subscribe(images => {
      this.images = images;
    });
  }

  archiveProduct(id: number): void {
    this.router.navigate(['/admin/list_Archived']);
    this.productService.archiveProduct(id).subscribe(
      (response: string) => {
        console.log('Product archived successfully:', response);
        this.loadProducts();
      },
      error => {
        console.error('Error archiving product:', error);
      }
    );
  }

  onSearch(): void {
    console.log('Search Name:', this.searchName);

    if (this.searchName.trim() === '') {
      // If the search input is empty, fetch all products
      this.loadProducts();
    } else {
      // If there's a search input, search products by name
      this.productService.searchProductsByName(this.searchName).subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
