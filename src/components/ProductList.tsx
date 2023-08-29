"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  availableForSale: boolean;
  description: string;
  handle: string;
  title: string;
  price: string;
  image: string;
};

const ProductList = (props: any): JSX.Element => {
  const router = useRouter();

  const { product } = props;
  // console.log('product images =>', product.images)
  // console.log('product inside Product List===>', product)
  const { title, id, images, variants, handle, availableForSale, description } =
    product || {};
  const { price } = variants[0];
  const { amount } = price || {};
  // if (images?.length === 0) return;

  const { src, altText } = product?.images[0];

  return (
    <div className="w-[250px] flex flex-col">
      <div
        className="w-[250px] h-[250px] flex"
        onClick={() => router.push(`/products/${handle}`)}
      >
        <Image
          className="cursor-pointer object-cover rounded-lg"
          priority
          src={src}
          alt={altText}
          width={250}
          height={250}
          // fill
        />
      </div>
      <div className="h-24 py-2 text-left">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs py-2">{`$${amount}`}</p>
        {/* <p className="text-red-500">{!availableForSale && "Out of stock"}</p> */}
      </div>
    </div>
  );
};

export default ProductList;
