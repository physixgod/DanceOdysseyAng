export class Product {
  idProduct!: number;
  refProduct!: number;
  productName!: string;
  price!: number;
  pointsPrice!: number;
  archived!: boolean;
  description!: string;
  productState!: boolean;
  model!: string;
  datePublication!: Date;
  quantity!: number;
  ratingProductsP: RatingProduct[] = [];
  categoriesProduct?: CategoriesProduct | null;
  images: Image[] = [];

  constructor(options: {
    idProduct: number;
    refProduct: number;
    productName: string;
    price: number;
    pointsPrice: number;
    archived: boolean;
    description: string;
    productState: boolean;
    model: string;
    datePublication: Date;
    quantity: number;
    ratingProductsP: RatingProduct[];
    categoriesProduct?: CategoriesProduct | null;
    images: Image[];
  }) {
    this.idProduct = options.idProduct;
    this.refProduct = options.refProduct;
    this.productName = options.productName;
    this.price = options.price;
    this.pointsPrice = options.pointsPrice;
    this.archived = options.archived;
    this.description = options.description;
    this.productState = options.productState;
    this.model = options.model;
    this.datePublication = options.datePublication;
    this.quantity = options.quantity;
    this.ratingProductsP = options.ratingProductsP;
    this.categoriesProduct = options.categoriesProduct || null;
    this.images = options.images;
  }
}

export class CategoriesProduct {
  idCategories?: number;
  type!: string;
  subCategories: CategoriesProduct[] = [];
  productsSS_C: Product[] = [];

  constructor(type: string, idCategories?: number) {
    this.type = type;
    this.idCategories = idCategories || undefined;
  }
}


export class RatingProduct {
  id!: number;
  feedback!: string;
  score!: number;
}

export class Image {
  id!: number;
  imageUrl!: string;
  constructor(id: number, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
  }
}
