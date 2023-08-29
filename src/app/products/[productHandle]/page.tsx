import React from "react";
import PRODUCTS from "@/data";
import ProductsList from "@/components/ProductsList";
import Navigation from "@/components/Navigation";
import BreadCrumbs from "@/components/BreadCrumbs";
import Image from "next/image";
import { shopifyClient, parseShopifyResponse } from "../../../../lib/shopify";

type Props = {};

const ProductPage = async ({
  params,
}: {
  params: { productHandle: string };
}) => {
  // console.log('product handle in dynamic page ===>', params.productHandle)
  if (!params.productHandle) return;
  const res = await shopifyClient.product.fetchByHandle(params.productHandle);
  // console.log(res)
  const product = parseShopifyResponse(res);

  // console.log('product inside dynamic page ====>', product)

  if (!product) return;
  const { id, title, images, variants, handle, description } = product;
  if (!images || images.length === 0) return;
  const { src, altText } = images[0];
  const { price } = variants[0];
  const { amount } = price;
  //  console.log('price ===>', price)

  // console.log(collections)

  const handleAddToCart = () => {};

  return (
    <div>
      <BreadCrumbs title={title} />
      <div className="flex flex-row justify-center gap-8 mt-10">
        <div>
          <Image src={src} alt={altText} width={500} height={500} priority />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl">{title}</h2>
          <p>{description}</p>
          {/* <span className="border p-1 block w-24 rounded-full text-center my-5 ">{collection}</span> */}
          <p className="text-2xl">{`$${amount}`}</p>
          <button
            className="px-4 py-3 bg-blue-500 cursor-pointer my-5 text-white rounded-md w-full"
            // onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
