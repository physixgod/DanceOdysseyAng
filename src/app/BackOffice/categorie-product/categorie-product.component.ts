import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoriesProduct } from 'src/app/models/categorie-product';

@Component({
  selector: 'app-categorie-product',
  templateUrl: './categorie-product.component.html',
  styleUrls: ['./categorie-product.component.css']
})
export class CategorieProductComponent {
  category: CategoriesProduct = new CategoriesProduct(); // Pas besoin de passer le type comme paramètre

  subCategoriesInput: string = ''; // Utilisez une chaîne pour les sous-catégories

  constructor(private productService: ProductService) { }

  createCategoryWithSubcategories() {
    // Séparez la chaîne de sous-catégories en un tableau
    const subCategoriesArray = this.subCategoriesInput.split(',');

    // Utilisez la méthode du service pour créer la catégorie avec sous-catégories
    this.productService.createCategoryWithSubcategories(this.category.type, subCategoriesArray)
      .subscribe(
        data => {
          console.log('Catégorie ajoutée avec succès :', data);
          // Traitez la réponse selon vos besoins
        },
        error => {
          console.error('Erreur lors de l\'ajout de la catégorie :', error);
          // Gérez l'erreur selon vos besoins
        }
      );
  }
}
