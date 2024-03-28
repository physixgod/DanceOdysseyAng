import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesProduct } from 'src/app/models/categorie-product';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showSidebar = new EventEmitter<void>();

  onAllClick() {
    this.showSidebar.emit();
  }

  parentCategories: CategoriesProduct[] = [];
  subCategoriesMap: Map<number, CategoriesProduct[]> = new Map();
  errorMessage: string = '';

  constructor(
    private categoriesService: CategoriesService 
  ) { }

  ngOnInit(): void {
    this.loadParentCategories();
  }

  loadParentCategories(): void {
    this.categoriesService.getParentCategories().subscribe(
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
        this.categoriesService.getSubCategories(parentId).subscribe( 
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
    } else {
      this.subCategoriesMap.clear();
    }
  }
}
