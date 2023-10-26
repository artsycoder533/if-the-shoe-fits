"use client";

import {
  Product,
  ShopifyImage,
  Variants,
  Edge,
  Variant,
} from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";

type SelectedOption = {
  name: string;
  value: string;
};

type VariantNode = {
  selectedOptions: SelectedOption[];
  // Add other properties as needed
};

// Then, specify the types for your variables

interface ProductCardProps {
  product: Product;
  addToCart: (quanitiy: number, variantID: string) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const [activeVariantId, setActiveVariantId] = useState<string>("");
  const [activeColor, setActiveColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product.variants.edges && product.variants.edges.length > 0) {
      if (product.variants.edges[0].node.availableForSale) {
        setActiveColor(product.variants.edges[0].node.title);
        setActiveVariantId(product.variants.edges[0].node.id);
      }
    }
  }, [product.variants]);

  if (!product) return;

  const {
    id,
    title,
    images,
    variants,
    handle,
    description,
    featuredImage,
    isGiftCard,
    tags,
    priceRange,
    availableForSale,
  } = product;
  const { url: featuredImageURL, altText: featuredImageAltText } =
    featuredImage || {};
  const { minVariantPrice } = priceRange;
  const { amount } = minVariantPrice;

  console.log(availableForSale);

  // console.log("product images", product.images);
  const imageNodes = product.images[0]?.edges.map((edge) => edge.node);
  const variantNodes = product.variants?.edges.map((edge) => edge.node);

  // console.log("variant nodes ==>", variantNodes[0]);

  return (
    <div className="flex flex-row justify-center gap-8 mt-10">
      <div className="flex flex-col gap-2">
        <Image
          src={featuredImageURL}
          alt={featuredImageAltText}
          width={500}
          height={500}
          // sizes="100vw"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          priority
        />
        <div className="flex flex-row gap-2">
          {imageNodes?.map((image: ShopifyImage) => {
            const { altText, id, url } = image;
            return (
              <Image
                key={id}
                src={url}
                alt={altText}
                width={100}
                height={100}
                // sizes="100vw"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                // priority
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl">{title}</h2>
        <p>{description}</p>
        {/* tags */}
        <div className="flex flex-row gap-2">
          {tags.map((tag) => (
            <span key={tag} className="border p-2 rounded-full text-center ">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-2xl">{`$${amount}`}</p>
        {/* variants */}
        <h3>
          {variantNodes[0]?.selectedOptions[0]?.name || "N/A"}: {activeColor}
        </h3>
        <div className="flex flex-row items-center gap-4">
          {variantNodes?.map((variant) => {
            const { selectedOptions, id: variantId, image, title } = variant;
            // console.log("variant ===>", variant);
            const { altText, url, id } = image;
            // console.log(selectedOptions);
            return (
              <div
                key={variantId}
                className={`border p-3 cursor-pointer ${
                  activeColor === title ? "border-black border-2" : null
                }`}
                onClick={() => {
                  setActiveVariantId(variantId);
                  setActiveColor(title);
                }}
              >
                <Image
                  src={url}
                  alt={altText}
                  width={75}
                  height={75}
                  // sizes="100vw"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          disabled={
            activeColor === "" || activeVariantId === "" || !availableForSale
          }
          className={`px-4 py-3  cursor-pointer my-5 text-white rounded-md w-full text-xl font-semibold ${
            activeColor === "" || activeVariantId === "" || !availableForSale
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black"
          }`}
          onClick={() => addToCart(quantity, activeVariantId)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
