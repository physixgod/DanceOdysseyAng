import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, RatingProduct, CategoriesProduct, ImageData } from 'src/app/models/product'; // Import the necessary classes

@Component({
  selector: 'app-list-archived',
  templateUrl: './list-archived.component.html',
  styleUrls: ['./list-archived.component.css']
})
export class ListArchivedComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadArchivedProducts();
  }

  loadArchivedProducts(): void {
    this.productService.getArchivedProducts().subscribe(
      (products) => {
        this.products = products; // Assign the received products to the component property
      },
      (error) => {
        console.error('Error loading archived products:', error);
        // Handle error, show a message to the user, etc.
      }
    );
  }
}
