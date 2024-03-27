import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesProduct } from 'src/app/models/categorie-product';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showSidebar = new EventEmitter<void>();

  parentCategories: CategoriesProduct[] = [];
  subCategoriesMap: Map<number, CategoriesProduct[]> = new Map();
  errorMessage: string = '';

  searchName: string = '';
  products: Product[] = [];

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

  onCategoryChange(event: any): void {
    const categoryId = event.target.value;
    if (categoryId !== null && categoryId !== '0') {
      console.log("Catégorie sélectionnée :", categoryId);
      // Vous pouvez appeler la méthode getProductsByParentCategory ou getProductsBySubCategory ici
      // en fonction de la catégorie sélectionnée et mettre à jour la liste des produits.
    } else {
      this.subCategoriesMap.clear();
    }
  }

  searchProducts(): void {
    if (this.searchName.trim() !== '') {
      // Appelez le service ProductService pour rechercher les produits par nom
      this.productService.searchProductsByName(this.searchName).subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error) => {
          console.error('Error searching products:', error);
        }
      );
    }
  }
}
