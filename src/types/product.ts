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
  src: string;
  altText: string;
  width: number;
  height: number;
  // type: {};
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  variableValues: {
    first: number;
  };
};
