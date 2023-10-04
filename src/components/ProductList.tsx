"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Product, ShopifyImage, Variants } from "@/types/product";

interface ProductListProps {
  product: Product;
}

const ProductList = ({ product }: ProductListProps): JSX.Element | null => {
  // console.log("product in ProductList===", product);
  const router = useRouter();

  const { title, images, variants, handle, availableForSale, featuredImage } =
    product || {};
  const { url, altText } = featuredImage || {};
  const { price } = variants[0];
  const { amount } = price || {};

  if (!images[0]) return null;

  return (
    <div className="w-[250px] flex flex-col">
      <div
        className="w-[250px] h-[250px] flex "
        onClick={() => router.push(`/products/${handle}`)}
      >
        <Image
          key={images[0]?.id}
          className="cursor-pointer object-cover rounded-lg"
          priority
          src={url}
          alt={altText || title}
          width={250}
          height={250}
          // fill
        />
      </div>
      <div className="h-24 py-2 text-left">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs py-2">{`$${amount}`}</p>
        {!availableForSale ? (
          <p className="text-red-500">Out of Stock</p>
        ) : null}
      </div>
    </div>
  );
};

export default ProductList;
