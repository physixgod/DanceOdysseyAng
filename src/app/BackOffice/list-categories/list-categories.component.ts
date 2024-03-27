import { Component, OnInit } from '@angular/core';
import { CategoriesProduct } from 'src/app/models/categorie-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  parentCategories: CategoriesProduct[] = [];
  subCategoriesMap: Map<number, CategoriesProduct[]> = new Map();
  errorMessage: string = '';
  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadParentCategories();
  }

  loadParentCategories(): void {
    this.productService.getParentCategories().subscribe(
      (categories: CategoriesProduct[]) => {
        this.parentCategories = categories.filter(category => category.idCategories !== undefined);
        this.loadSubCategoriesForParents();
      },
      (error) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des catégories parentes.';
        console.error('Error loading parent categories:', error);
      }
    );
  }

  loadSubCategoriesForParents(): void {
    this.parentCategories.forEach(parentCategory => {
      const parentId = parentCategory.idCategories;
      if (parentId !== undefined) {
        this.productService.getSubCategories(parentId).subscribe(
          (subCategories: CategoriesProduct[]) => {
            if (subCategories && subCategories.length > 0) {
              this.subCategoriesMap.set(parentId, subCategories);
            }
          },
          (error) => {
            this.errorMessage = 'Une erreur s\'est produite lors du chargement des sous-catégories.';
            console.error('Error loading subcategories:', error);
          }
        );
      }
    });
  }

  addSubcategory(parentCategoryId: number): void {
    const newSubcategoryName = prompt('Entrez le nom de la nouvelle sous-catégorie:');
    if (newSubcategoryName) {
      this.productService.addSubcategoriesToParent(parentCategoryId, [newSubcategoryName]).subscribe(
        () => {
          this.refreshSubCategories(parentCategoryId);
        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de la sous-catégorie.';
          console.error('Error adding subcategory:', error);
        }
      );
    }
  }

  refreshSubCategories(parentCategoryId: number): void {
    this.productService.getSubCategories(parentCategoryId).subscribe(
      (subCategories: CategoriesProduct[]) => {
        if (subCategories && subCategories.length > 0) {
          this.subCategoriesMap.set(parentCategoryId, subCategories);
        }
      },
      (error) => {
        this.errorMessage = 'Une erreur s\'est produite lors du rafraîchissement des sous-catégories.';
        console.error('Error refreshing subcategories:', error);
      }
    );
  }
}
