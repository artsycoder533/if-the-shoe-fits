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
  // Add other properties specific to the Variant if needed
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
  // images: {
  //   edges: {
  //     node: ShopifyImage;
  //   }[];
  // }[];
  images: {
    edges: Edge<ShopifyImage>[],
  }
  variants: {
    edges: Edge<Variant>[]; // Include the 'edges' property
  };
  featuredImage: FeaturedImage;
  isGiftCard: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
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
  // id: string;
  url: string;
  altText: string;
};

export type Metafield = {
  value: string;
};
