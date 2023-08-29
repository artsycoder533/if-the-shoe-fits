"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Product, ShopifyImage, Variants } from "@/types/product";

interface ProductListProps {
  product: Product;
}

const ProductList = ({ product }: ProductListProps): JSX.Element | null => {
  const router = useRouter();

  const { title, images, variants, handle } = product || {};
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
          src={images[0]?.src}
          alt={images[0]?.altText}
          width={250}
          height={250}
          // fill
        />
      </div>
      <div className="h-24 py-2 text-left">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs py-2">{`$${amount}`}</p>
      </div>
    </div>
  );
};

export default ProductList;
