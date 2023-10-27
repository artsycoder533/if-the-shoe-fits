"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/app/utils/helpers";

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
  product: Product;
}

const ProductList = ({ product }: ProductListProps): JSX.Element | null => {
  const router = useRouter();
  if (!product) return null;
  const {
    title,
    images,
    handle,
    availableForSale,
    featuredImage,
    id,
    variants,
  } = product || {};
  const { url, altText } = featuredImage || {};
  const { price } = variants[0];
  const { amount, currencyCode } = price;

  if (!images[0]) return null;

  return (
    <div className="w-[250px] flex flex-col border">
      <div
        className="w-[250px] h-[250px] flex "
        onClick={() => router.push(`/products/${handle}`)}
      >
        <Image
          key={id}
          className="cursor-pointer object-cover rounded-lg"
          priority
          src={url}
          alt={altText || title}
          width={250}
          height={250}
        />
      </div>
      <div className="h-24 py-2 text-left">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs py-2">{`${formatPrice(
          String(amount),
          currencyCode
        )}`}</p>
        {!availableForSale ? (
          <p className="text-red-500">Out of Stock</p>
        ) : null}
      </div>
    </div>
  );
};

export default ProductList;
