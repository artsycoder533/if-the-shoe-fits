import React from "react";
import ProductList from "./ProductList";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductListProps) => {
  return (
    <section className="grid grid-cols-4 place-items-center gap-8 mt-10 max-w-7xl mx-auto">
      {products && products.length > 0 ? (
        products.map((product: Product) => (
          <ProductList key={product.handle} product={product} />
        ))
      ) : (
        <p>There are no products in this collection.</p>
      )}
    </section>
  );
};

export default ProductsList;
