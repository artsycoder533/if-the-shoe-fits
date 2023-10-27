import React from "react";
import ProductList from "./ProductList";

type Product = {
  id: string;
  availableForSale: boolean;
  description: string;
  handle: string;
  title: string;
  options: [];
  images: ShopifyImage[];
  variants: Variant[];
  featuredImage: FeaturedImage;
};

type Variant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
    type: [];
  };
  availableForSale: boolean;
};

type ShopifyImage = {
  altText: string;
  url: string;
  id: string;
};

type FeaturedImage = {
  url: string;
  altText: string;
};

interface ProductListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductListProps) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-6 mt-10 max-w-7xl mx-auto">
      {products && products.length > 0 ? (
        products?.map((product: Product) => (
          <ProductList key={product.handle} product={product} />
        ))
      ) : (
        <p>There are no products in this collection.</p>
      )}
    </section>
  );
};

export default ProductsList;
