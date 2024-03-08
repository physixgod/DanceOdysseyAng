// categories-product.model.ts

import { Product } from './product';

export class CategoriesProduct {
  idCategories?: number;
  type: string = '';
  subCategories: CategoriesProduct[] = [];
  productsSS_C: Product[] = [];

  constructor(options: {
    idCategories?: number;
    type?: string;
    subCategories?: CategoriesProduct[];
    productsSS_C?: Product[];
  } = {}) {
    this.idCategories = options.idCategories || 0;
    this.type = options.type || '';
    this.subCategories = options.subCategories || [];
    this.productsSS_C = options.productsSS_C || [];
  }
}
