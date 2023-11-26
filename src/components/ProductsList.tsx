"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  priceRange: PriceRange;
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

type PriceRange = {
  minVariantPrice: Price;
}

type Price = {
  amount: string;
  currencyCode: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductListProps) => {
  const [sortType, setSortType] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  const sortProducts = useCallback(() => {
    const copyOfProducts = [...products];
    if (sortType === 'a-z') {
      copyOfProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'z-a') {
      copyOfProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === 'low') {
      copyOfProducts.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sortType === 'high') {
      copyOfProducts.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    }
    setSortedProducts(copyOfProducts);
  }, [sortType, products]);

  useEffect(() => {
    sortProducts();
  }, [sortProducts])

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSortType(e.target.value)
  };

  return (
    <section className="flex flex-col max-w-[1400px] w-[90vw] mx-auto">
      <form className="flex justify-between items-center w-64 self-end mt-4">
        <label htmlFor="sortType">Sort By:</label>
        <select
          name="sortType"
          id="sort_type"
          value={sortType}
          onChange={(e) => handleSort(e)}
        >
          <option value="">Default</option>
          <option value="low">Price: (Lowest First)</option>
          <option value="high">Price: (Highest First)</option>
          <option value="a-z">Name: (A-Z)</option>
          <option value="z-a">Name: (Z-A)</option>
        </select>
      </form>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-6 mt-10 max-w-[1400px] w-[90vw] mx-auto">
        {products && products.length > 0 ? (
          sortedProducts?.map((product: Product) => (
            <ProductList key={product.handle} product={product} />
          ))
        ) : (
          <p>There are no products in this collection.</p>
        )}
      </section>
    </section>
  );
};

export default ProductsList;
