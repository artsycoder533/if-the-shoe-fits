import React from "react";
import PRODUCTS from "@/data";
import ProductsList from "@/components/ProductsList";
import Navigation from "@/components/Navigation";
import BreadCrumbs from "@/components/BreadCrumbs";
import Image from "next/image";
import { shopifyClient, parseShopifyResponse } from "../../../../lib/shopify";

type Props = {};

const ProductPage = async ({ params }: { params: { productHandle: string } }) => {
  const res = shopifyClient.product.fetchByHandle(params.productHandle);
  const product = parseShopifyResponse(res)

  console.log('product===>', product)

  if(!product) return;
  const { id, title, images, variants, handle, collections } = product;
  if (!images || images.length === 0) return;
      const { src, altText } = images[0]
      const { price } = variants[0]

console.log(collections)

  return (
    <div>
      <Navigation />
      <BreadCrumbs title={title} />
      <div className="flex gap-3">
        <div>
          <Image src={src} alt={altText} width={500} height={500} />
        </div>
        <div>
          <h2 className="text-2xl">{title}</h2>
          {/* <span className="border p-1 block w-24 rounded-full text-center my-5 ">{collection}</span> */}
          <p>{`$${price}`}</p>
          <button className="px-4 py-3 border bg-blue-500 cursor-pointer my-5">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
