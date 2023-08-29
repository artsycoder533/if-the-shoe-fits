import React from "react";
import ProductList from "./ProductList";

type Product = {
  id: string;
  availableForSale: boolean;
  description: string;
  handle: string;
  title: string;
  variants: any[];
  images: any[];
};

interface ProductListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductListProps): JSX.Element => {
  // console.log('products inside PRoductsLIst===>', products)

  return (
    <section className="flex flex-row justify-center flex-wrap gap-8 mt-10">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductList key={product.handle} product={product} />
        ))
      ) : (
        <p>There are no products in this collection.</p>
      )}
    </section>
  );
};

export default ProductsList;
