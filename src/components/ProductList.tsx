"use client"
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
}

const ProductList = (props: any): JSX.Element => {
  const router = useRouter()

  const { product } = props;
  // console.log('product images =>', product.images)
  // console.log(product)
  const { title, id, images, variants, handle, availableForSale, description} = product;
  const { price} = variants[0];
  const { amount} = price;
  if (images.length === 0) return;

  const { src, altText } = product?.images[0];




  return (
    <div>
      <div className="w-[250px] h-[250px] border" onClick={() => router.push(`/products/${handle}`)}>
        <Image
        className="cursor-pointer"
        
          src={src}
          alt={altText}
          width={250}
          height={250}
        />
      </div>
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <p>{`$${amount}`}</p>
        <p className="text-red-500">{!availableForSale && 'Out of stock'}</p>
      </div>
    </div>
  );
};

export default ProductList;
