import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!: number;
  product: Product | undefined;
  selectedFile: File | null = null;  // Assurez-vous que selectedFile est initialisé à null

  constructor(private route: ActivatedRoute, private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    this.productService.getProductsById(this.productId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.product = data[0];
        } else {
          // Gérer le cas où le produit n'est pas trouvé
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du produit :', error);
      }
    );
    
  }
  saveChanges(): void {
    if (this.product) {
      if (this.selectedFile !== null) {
        this.productService.updateImage(this.productId, this.selectedFile).subscribe(
          (result: string) => {
            console.log('Image updated successfully:', result);
            
            // Call loadProductDetails to update the product information
            this.loadProductDetails();
          },
          (error) => {
            console.error('Error updating the image:', error);
            // Handle errors, display a message to the user, etc.
          }
        );
      } else {
        console.error('The selected file is null.');
      }
    }        this.router.navigate(['/admin/list-product']);

    // No need to navigate here, as it will be handled by the loadProductDetails() call
  }
  


  onFileSelected(event: any): void {
    // Gérez la logique de sélection de fichier ici
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }
}
