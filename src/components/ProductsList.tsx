import React from "react";
import ProductList from "./ProductList";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductListProps): JSX.Element => {
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
