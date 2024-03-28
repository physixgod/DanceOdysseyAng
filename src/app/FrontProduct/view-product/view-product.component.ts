import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  imageLoaded: boolean = false;
  productId!: number;
  product: Product | undefined;
  selectedImage: Image | null = null;
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    this.productService.getProductsById(this.productId).subscribe(
      (data: Product[]) => {
        if (data && data.length > 0) {
          this.product = { ...data[0] };
          if (this.product.images && this.product.images.length > 0) {
            this.selectedImage = this.product.images[0];
          }
        } else {
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du produit:', error);
      }
    );
  }
  selectImage(image: Image): void {
    this.selectedImage = image;
  }
  getDefaultImage(): string {
    return 'URL_de_votre_image_par_défaut';
  }
}
