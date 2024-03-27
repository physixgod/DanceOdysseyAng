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
  today: string = ''; // Initialisation de la propriété today

  statusMessage: string | null = null;
  statusClass: string | null = null;
  categories: CategoriesProduct[] = [];
  subCategories: CategoriesProduct[] = [];
  categoryId: number = 0;
  subCategoryIds: number[] = [];
  selectedFiles: File[] = [];
  product: Product = {
    idProduct: 0,
    archived: false,
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
    today: '', // Ajout de la propriété today dans l'objet Product

  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    const now = new Date();
    this.today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

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
  // Réinitialisez le tableau des fichiers sélectionnés
  this.selectedFiles = [];

  // Parcourez les fichiers sélectionnés et ajoutez-les à votre tableau
  for (let i = 0; i < event.target.files.length; i++) {
    this.selectedFiles.push(event.target.files[i]);
  }
}

  addProduct(): void {
    if (!this.categoryId) {
      alert('Veuillez sélectionner une catégorie.');
      return;
    }

    this.productService.addProduct(this.product).subscribe(
      (addedProduct: Product) => {
        console.log('Product added successfully:', addedProduct);

        if (this.selectedFiles.length > 0) {
          this.productService.addImagesToProduct(addedProduct.idProduct, this.selectedFiles).subscribe(
            (result) => {
              console.log('Images added successfully:', result);
            },
            (error) => {
              console.error('Error adding images:', error);
            }
            
          );

        }

        // Ajoutez le produit à la catégorie et sous-catégorie ici
        this.addProductToCategory(addedProduct.idProduct, this.categoryId, this.subCategoryIds[0]);

        console.log('Navigating to list-product page...');
        // Navigate to the "list-product" route after adding the product
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
    this.router.navigate(['/admin/list-product']);

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