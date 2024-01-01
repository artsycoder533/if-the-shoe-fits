type SelectedOption = {
  name: string;
  value: string;
};

export type Variant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
    type: [];
  };
  weight: number;
  available: boolean;
  image: ShopifyImage;
  selectedOptions: SelectedOption[];
  hasNextPage: true;
  hasPreviousPage: true;
  quantityAvailable: number;
  availableForSale: boolean;
  metafields: Metafield[];
};

export type Edge<T> = {
  node: T;
};

export type Product = {
  id: string;
  availableForSale: boolean;
  description: string;
  handle: string;
  title: string;
  options: [];
  images: {
    edges: Edge<ShopifyImage>[],
  }
  variants: {
    edges: Edge<Variant>[];
  };
  featuredImage: FeaturedImage;
  isGiftCard: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type Variants = Edge<Variant>[];

export type ShopifyImage = {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  variableValues: {
    first: number;
  };
};

export type FeaturedImage = {
  url: string;
  altText: string;
};

export type Metafield = {
  value: string;
};
