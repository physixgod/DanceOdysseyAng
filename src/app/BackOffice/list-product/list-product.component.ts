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
      this.products = products.filter(product => !product.archived);
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
        const archivedProduct = this.products.find(product => product.idProduct === id);
        if (archivedProduct) {
          archivedProduct.archived = true;
        }
      },
      error => {
        console.error('Error archiving product:', error);
      }
    );
  }

  onSearch(): void {
    console.log('Search Name:', this.searchName);

    if (this.searchName.trim() === '') {
      this.loadProducts();
    } else {
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
