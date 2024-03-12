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
  productId!: number;
  product: Product | undefined;
  selectedImages: Image[] = [];
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
          this.product = { ...data[0] }; // Spread operator for creating a copy
        } else {
          // Handle the case where the product is not found
        }
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.product && this.product.idProduct) {
      // Update product details
      this.productService.updateProductById(this.product.idProduct, this.product).subscribe(
        (updatedProduct: Product) => {
          console.log('Product details updated successfully:', updatedProduct);

          // Check if a new file is selected
          if (this.selectedFile) {
            // Assuming you have logic to handle selected images
            this.selectedImages.forEach((image) => {
              // Make sure this.product is defined before accessing its properties
              if (this.product && this.product.idProduct) {
                this.productService.updateImageUrl(
                  this.product.idProduct,
                  image.id,
                  this.selectedFile!
                ).subscribe(
                  (updatedImageUrl) => {
                    console.log('Image URL updated successfully. New URL:', updatedImageUrl);

                    // Update the product image URL with the new one
                    image.imageUrl = updatedImageUrl;
                  },
                  (error) => {
                    console.error('Error updating image URL:', error);

                    // Output the specific error message from the server response body
                    console.error('Server error message:', error.error);
                    console.error('Status:', error.status);

                    // You can add additional logic here to handle the error, e.g., show a message to the user
                  }
                );
              }
            });
          }
        },
        (error) => {
          console.error('Error updating product:', error);

          // Output the specific error message from the server response body
          console.error('Server error message:', error.error);
          console.error('Status:', error.status);

          // You can add additional logic here to handle the error, e.g., show a message to the user
        }
      );
    }
  }

  onImageSelected(image: Image): void {
    const index = this.selectedImages.findIndex(
      (selectedImage) => selectedImage.id === image.id
    );

    if (index === -1) {
      this.selectedImages.push(image);
    } else {
      this.selectedImages.splice(index, 1);
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Selected File:', this.selectedFile);
    }
  }
}
