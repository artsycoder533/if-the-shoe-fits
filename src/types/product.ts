export type Product = {
  id: string;
  availableForSale: boolean;
  // createdAt: string;
  // updatedAt: string;
  // descriptionHtml: "";
  description: string;
  handle: string;
  // productType: string;
  title: string;
  // vendor: string;
  // publishedAt: Date;
  // onlineStoreUrl: string | null;
  options: [];
  images: ShopifyImage[];
  variants: Variants[];
  featuredImage: FeaturedImage;
  isGiftCard: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  // hasNextPage: {
  //   value: boolean;
  // };
  // hasPreviousPage: {
  //   value: boolean;
  // };
  // variableValues: {
  //   first: number;
  // };
};

// type Product = {
//   id: string;
//   availableForSale: boolean;
//   description: string;
//   handle: string;
//   title: string;
//   variants: any[];
//   images: any[];
// };

export type Variants = {
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
  selectedOPtions: [];
  hasNextPage: true;
  hasPreviousPage: true;
};

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
