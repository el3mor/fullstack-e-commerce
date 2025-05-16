export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categories: ICategory[];
  thumbnail: IThumbnail;
}

export interface ICategory {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: IProduct[];
}

export interface IThumbnail {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: IImageFormat;
    small: IImageFormat;
    medium: IImageFormat;
    large: IImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  categories: ICategory[];
  description: string;
  thumbnail: IThumbnail;
  quantity?: number;
}

export interface IOrder {
  id: number;
  documentId: string;
  orders: IOrderProduct[];
  shippingStatus: string;
  totalprice: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user: {
    username: string;
  };
}

export interface IOrderProduct {
  productTitle: string;
  productPrice: number;
  productQuantity: number;
}
