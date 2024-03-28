import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-archived',
  templateUrl: './list-archived.component.html',
  styleUrls: ['./list-archived.component.css']
})
export class ListArchivedComponent implements OnInit {
  products: Product[] = [];
  images: Image[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadArchivedProducts();
  }

  loadArchivedProducts(): void {
    this.productService.getArchivedProducts().subscribe(
      (products) => {
        this.products = products; 
      },
      (error) => {
        console.error('Error loading archived products:', error);
       
      }
    );
  }

  loadImagesForProduct(productId: number): void {
    this.productService.getImagesForProduct(productId).subscribe(images => {
      this.images = images;
    });
  }

  unarchiveProduct(productId: number): void {
    this.router.navigate(['/admin/list-product']);

    this.productService.UnarchiveProduct(productId).subscribe(
      (response) => {
        console.log('Product unarchived successfully:', response);
      
        this.loadArchivedProducts();
      },
      error => {
        console.error('Error unarchiving product:', error);
  
      }
    );
  }

}
