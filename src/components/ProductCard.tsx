"use client";

import { formatPrice } from "@/app/utils/helpers";
import { Product, Variant } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";

type SelectedOption = {
  name: string;
  value: string;
};

type VariantNode = {
  selectedOptions: SelectedOption[];
};

type AdditionalData = {
  variant: ImageVariant;
};

type ImageVariant = {
  color: string;
  images: string[];
};

type Metafield = {
  value: string;
};

interface ProductCardProps {
  product: Product;
  addToCart: (quanitiy: number, variantID: string) => void;
}

const ProductCard = ({
  product,
  addToCart,
}:
ProductCardProps) => {
  const [activeVariantId, setActiveVariantId] = useState<string>("");
  const [activeColor, setActiveColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeVariant, setActiveVariant] = useState<Variant>();
  const [featuredImageDisplay, setFeaturedImageDisplay] = useState<string>();

  useEffect(() => {
    if (product.variants.edges && product.variants.edges.length > 0) {
      if (product.variants.edges[0].node.availableForSale) {
        setActiveColor(product.variants.edges[0].node.title);
        setActiveVariantId(product.variants.edges[0].node.id);
        setFeaturedImageDisplay(product.variants.edges[0].node.image.url);
        setActiveVariant(product.variants.edges[0].node);
      }
    }
  }, [product.variants]);

  if (!product) return;

  const {
    // id,
    title,
    // images,
    // variants,
    // handle,
    description,
    featuredImage,
    // isGiftCard,
    // tags,
    priceRange,
    availableForSale,
  } = product;
  const { url: featuredImageURL, altText: featuredImageAltText } =
    featuredImage || {};
  const { minVariantPrice } = priceRange;
  const { amount, currencyCode } = minVariantPrice;

  const imageNodes = product.images?.edges.map((edge) => edge.node);

  const variantNodes = product.variants?.edges.map((edge) => edge.node);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 mt-10 max-w-[1400px] w-[90vw] mx-auto">
      <div className="flex flex-col w-[90vw] gap-2 basis-1/2">
        <div className="flex max-w-[500px] h-[400px] w-[90vw] justify-start mx-auto lg:mx-0 rounded-lg">
          <Image
            src={featuredImageDisplay || featuredImageURL}
            alt={featuredImageAltText}
            width={500}
            height={500}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {imageNodes && imageNodes.length > 0 && (
          <div className="flex flex-row gap-2 h-28 max-w-[500px] w-[90vw] mx-auto lg:m-0 overflow-x-auto cursor-pointer rounded-lg">
            {imageNodes?.map((image: any) => {
              const { altText, id, url } = image;
              return (
                <Image
                  key={id}
                  src={url}
                  alt={altText || title}
                  width={100}
                  height={100}
                  onClick={() => setFeaturedImageDisplay(url)}
                  style={{
                    maxWidth: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                  className="object-fit pointer rounded-lg"
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 basis-1/2  mx-auto">
        <h2 className="text-2xl">{title}</h2>
        <p>{description}</p>

        <p className="text-2xl my-2">{`${formatPrice(
          String(activeVariant?.price.amount),
          currencyCode
        )}`}</p>
        {/* variants */}
        <h3>
          {variantNodes[0]?.selectedOptions[0]?.name || "N/A"}: {activeColor}
        </h3>
        <div className="flex flex-wrap items-center gap-4 md:w-80">
          {variantNodes?.map((variant) => {
            const {
              selectedOptions,
              id: variantId,
              quantityAvailable,
              image,
              title,
              price,
            } = variant;
            const { amount } = price;           
            const { altText, url, id } = image;

            return (
              <button
                key={variantId}
                className={`flex  w-12 h-12 rounded-md items-center justify-center border hover:outline-dashed outline-offset-4 outline-2 ${
                  activeColor === title
                    ? "outline-black outline-dashed outline-offset-4 outline-2"
                    : ""
                } ${
                  quantityAvailable > 0
                    ? "border cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (quantityAvailable > 0) {
                    setActiveVariantId(variantId);
                    setActiveColor(title);
                    setFeaturedImageDisplay(url);
                    setActiveVariant(variant);
                  }
                }}
              >
                {title}
              </button>
            );
          })}
        </div>
        <button
          disabled={
            activeColor === "" || activeVariantId === "" || !availableForSale
          }
          className={`px-4 py-3  cursor-pointer my-5 text-white rounded-md text-lg font-medium self-start ${
            activeColor === "" || activeVariantId === "" || !availableForSale
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-700"
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
