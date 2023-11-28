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
  featuredImage: FeaturedImage;
  priceRange: PriceRange;
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
    priceRange,
  } = product || {};
  const { url, altText } = featuredImage || {};
  const { minVariantPrice } = priceRange;
  const { amount, currencyCode } = minVariantPrice;

  if (!images[0]) return null;

  return (
    <div className="w-[250px] flex flex-col">
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
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-md py-2 font-medium">{`${formatPrice(
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
