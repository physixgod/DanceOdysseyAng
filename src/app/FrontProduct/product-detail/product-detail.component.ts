import { Component, OnInit , Input} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product: Product | undefined;

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

 


}
