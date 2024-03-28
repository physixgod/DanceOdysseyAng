import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  imageLoaded: boolean = false;
  productId!: number;
  product: Product | undefined;
  selectedImage: Image | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
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
        } else {
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du produit:', error);
      }
    );
  }

  saveChanges(): void {
    const productId = this.product ? this.product.idProduct : undefined;
  
    if (productId !== undefined) {
      this.productService.updateProductById(productId, this.product!).subscribe(
        (updatedProduct: Product) => {
          console.log('Détails du produit mis à jour avec succès:', updatedProduct);
  
          if (this.selectedFile && this.selectedImage) {
            this.productService.updateImageUrl(
              productId,
              this.selectedImage.id,
              this.selectedFile!
            ).subscribe(
              (updatedImageUrl) => {
                console.log('URL de l\'image mise à jour avec succès. Nouvelle URL:', updatedImageUrl);
                if (this.selectedImage) {
                  this.selectedImage.imageUrl = updatedImageUrl;
                }
              },
              (error) => {
                console.error('Erreur lors de la mise à jour de l\'URL de l\'image:', error);
                console.error('Message d\'erreur du serveur:', error.error);
                console.error('Statut:', error.status);
              }
            );
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit:', error);
          console.error('Message d\'erreur du serveur:', error.error);
          console.error('Statut:', error.status);
        }
      );
    } else {
      console.error('Erreur: Le produit est undefined ou idProduct est undefined.');
    }
    this.router.navigate(['/admin/list-product']);

  }
  

  onImageSelected(image: Image): void {
    this.selectedImage = image;
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Fichier sélectionné:', this.selectedFile);
    }
  }
}
