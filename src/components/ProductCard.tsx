"use client";

import { Product, ShopifyImage } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
  addToCart: (quanitiy: number, variantID: string) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const [activeVariantId, setActiveVariantId] = useState<string>("");
  const [activeColor, setActiveColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  console.log("product variants ==>", product.variants);

  useEffect(() => {
    console.log("inside use effect top");
    if (product.variants.edges && product.variants.edges.length > 0) {
      console.log("inside use effect");
      if (product.variants.edges[0].node.availableForSale) {
        setActiveColor(product.variants.edges[0].node.title);
        setActiveVariantId(product.variants.edges[0].node.id);
      }
    }
  }, [product.variants]);

  if (!product) return;

  // console.log("prodict", product);
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
  } = product;
  const { url: featuredImageURL, altText: featuredImageAltText } =
    featuredImage || {};
  const { minVariantPrice } = priceRange;
  const { amount } = minVariantPrice;
  const imageNodes = product.images.edges.map((edge) => edge.node);
  const variantNodes = product.variants.edges.map((edge) => edge.node);

  console.log("variantsNodes =", variantNodes);
  // console.log("variants =>", variants);

  // const filteredImages = images.edges.map;
  // if (!images || images.length === 0) return;
  // const { src, altText } = images[0];
  // const { price, id: variantID } = variants[0];
  // const { amount } = price;

  console.log("active color ==>", activeColor);

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
          {variantNodes[0].selectedOptions[0].name}: {activeColor}
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
                  activeColor === title ? "border-purple-500 border-4" : null
                }`}
                onClick={() => {
                  setActiveVariantId(variantId);
                  setActiveColor(title);
                  setQuantity((prev) => prev + 1);
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
          disabled={activeColor === "" || activeVariantId === ""}
          className="px-4 py-3 bg-purple-500 cursor-pointer my-5 text-white rounded-md w-full text-xl font-semibold"
          onClick={() => addToCart(quantity, activeVariantId)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
