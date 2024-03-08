import { Component, OnInit } from '@angular/core';
import { Product, CategoriesProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  statusMessage: string | null = null;
  statusClass: string | null = null;
  categories: CategoriesProduct[] = [];
  subCategories: CategoriesProduct[] = [];
  categoryId: number = 0;
  subCategoryIds: number[] = [];
  selectedFile: File | null = null;

  product: Product = {
    idProduct: 0,
    archived: false,
    imageUrl: '',
    refProduct: 0,
    productName: '',
    price: 0,
    datePublication: new Date(),
    pointsPrice: 0,
    description: '',
    productState: false,
    model: '',
    quantity: 0,
    ratingProductsP: [],
    categoriesProduct: {
      idCategories: 0,
      type: '',
      subCategories: [],
      productsSS_C: [],
    },
    images: [],
  };

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService. getParentCategories().subscribe((categories: CategoriesProduct[]) => {
      this.categories = categories;
    });
  }

  getSubCategories(): void {
    if (this.categoryId) {
      this.productService.getSubCategories(this.categoryId).subscribe((subCategories: CategoriesProduct[]) => {
        this.subCategories = subCategories;
      });
    }
  }

  onCategoryChange(): void {
    this.subCategories = [];
    this.subCategoryIds = [];
    this.getSubCategories();
  }

  onSubCategoryChange(subCategoryId: number): void {
    this.subCategoryIds = [subCategoryId]; // Mettez le sous-catégorie ID dans le tableau subCategoryIds
  }
  
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }
  addProduct(): void {
    if (!this.categoryId) {
      alert('Veuillez sélectionner une catégorie.');
      return;
    }
  
    this.productService.addProduct(this.product).subscribe(
      (addedProduct: Product) => {
        console.log('Product added successfully:', addedProduct);
  
        if (this.selectedFile) {
          this.uploadImage(addedProduct.idProduct);
        }
  
        console.log('Navigating to list-product page...');
        // Navigate to the "list-product" route after adding the product
        this.router.navigate(['/admin/list-product']);
  
        // Rest of the code remains the same...
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
  
  

  uploadImage(productId: number): void {
    this.productService.uploadImage(this.selectedFile!, productId).subscribe(
      (uploadResult: string) => {
        console.log('Image uploaded successfully:', uploadResult);
      },
      (uploadError) => {
        console.error('Error uploading image:', uploadError);
        // Gérer l'erreur ici (affichage d'un message, redirection, etc.)
      }
    );
  }

  // Méthode pour ajouter le produit à la catégorie
  addProductToCategory(productId: number, categoryId: number, subCategoryId: number): void {
    this.productService.addProductToCategory(productId, categoryId, subCategoryId).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }}