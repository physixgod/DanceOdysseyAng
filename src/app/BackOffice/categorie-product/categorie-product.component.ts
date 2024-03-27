import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoriesProduct } from 'src/app/models/categorie-product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categorie-product',
  templateUrl: './categorie-product.component.html',
  styleUrls: ['./categorie-product.component.css']
})
export class CategorieProductComponent {
  category: CategoriesProduct = new CategoriesProduct();
  subCategories: string[] = []; // Définissez la propriété subCategories comme un tableau de chaînes
  newSubCategory: string = ''; // Déclarez la propriété newSubCategory pour stocker la nouvelle sous-catégorie entrée par l'utilisateur

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  createCategoryWithSubcategories() {
    // Utilisez la méthode du service pour créer la catégorie avec les sous-catégories
    this.productService.createCategoryWithSubcategories(this.category.type, this.subCategories)
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
      this.router.navigate(['/admin/list_Categories']);

  }

  addSubCategory() {
    if (this.newSubCategory.trim() !== '') {
      this.subCategories.push(this.newSubCategory); // Ajoutez la nouvelle sous-catégorie à la liste
      this.newSubCategory = ''; // Réinitialisez le champ de saisie pour la nouvelle sous-catégorie
    }
  }
}
