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
}

interface ProductListProps {
  products: Product[];
}

const ProductsList = ({ products}: ProductListProps): JSX.Element => {

// console.log('products===>', products)

  return (
    <div className="grid grid-cols-4 gap-5 ">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductList key={product.handle} product={product} />
        ))
      ) : (
        <p>There are no products in this collection.</p>
      )}
    </div>
  );
};

export default ProductsList;
