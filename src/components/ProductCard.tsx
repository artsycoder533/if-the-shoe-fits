"use client";

import {
  Product,
  ShopifyImage,
  Variants,
  Edge,
  Variant,
} from "@/types/product";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type SelectedOption = {
  name: string;
  value: string;
};

type VariantNode = {
  selectedOptions: SelectedOption[];
  // Add other properties as needed
};

type AdditionalData = {
  variant: ImageVariant,
};

type ImageVariant = {
  color: string;
  images: string[];
};

// export type Variant = {
//   id: string;
//   title: string;
//   price: {
//     amount: string;
//     currencyCode: string;
//     type: [];
//   };
//   weight: number;
//   available: boolean;
//   image: ShopifyImage;
//   selectedOptions: SelectedOption[];
//   hasNextPage: true;
//   hasPreviousPage: true;
//   availableForSale: boolean;
//   metafields: Metafield[];
//   // Add other properties specific to the Variant if needed
// };

type Metafield = {
  value: string;
};

// Then, specify the types for your variables

interface ProductCardProps {
  product: Product;
  addToCart: (quanitiy: number, variantID: string) => void;
  additionalData: AdditionalData[];
}

const ProductCard = ({
  product,
  addToCart,
  additionalData,
}: ProductCardProps) => {
  const [activeVariantId, setActiveVariantId] = useState<string>("");
  const [activeColor, setActiveColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeVariant, setActiveVariant] = useState<Variant>();
  const [featuredImageDisplay, setFeaturedImageDisplay] = useState<string>();
  const [additionalImages, setAdditionalImages] = useState<
    string[] | undefined
  >([]);

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

  const getAdditionalImages = useCallback(() => {
    const result = additionalData
      .filter((data) => data?.variant?.color === activeColor)
      .map((data) => data?.variant?.images)
      .filter((images) => Array.isArray(images))
      .flat(); // Use the flat function to flatten nested arrays
    const updatedImages = result.length > 0 ? result : undefined;
    setAdditionalImages(updatedImages);
  }, [additionalData, activeColor]);

  useEffect(() => {
    if (!additionalData) return;
    console.log('additional data exists')
    getAdditionalImages();
  }, [activeColor, additionalData, getAdditionalImages]);

  if (!product) return;
  if (!additionalData) return;

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
    // priceRange,
    availableForSale,
  } = product;
  const { url: featuredImageURL, altText: featuredImageAltText } =
    featuredImage || {};
  // const { minVariantPrice } = priceRange;
  // const { amount } = minVariantPrice;

  const imageNodes = product.images[0]?.edges.map((edge) => edge.node);

  const variantNodes = product.variants?.edges.map((edge) => edge.node);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 mt-10 max-w-[1400px] w-[90vw] mx-auto">
      <div className="flex flex-col gap-2 basis-1/2">
        <div className="flex max-w-[500px] h-[500px] justify-start mx-auto lg:mx-0">
          <Image
            src={featuredImageDisplay || featuredImageURL}
            alt={featuredImageAltText}
            width={500}
            height={500}
            // sizes="100vw"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            className="object-contain"
            // className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-row gap-2 h-28 max-w-[500px] mx-auto lg:m-0 w-[90vw]">
          {additionalImages &&
            additionalImages?.map((image) => {
              return (
                <Image
                  key={image}
                  src={encodeURI(image)}
                  alt={activeColor}
                  width={100}
                  height={100}
                  onClick={() => setFeaturedImageDisplay(image)}
                  // sizes="100vw"
                  style={{
                    maxWidth: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                  placeholder="blur"
                  blurDataURL={image}
                  className="object-fit pointer"
                  // priority
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-3 basis-1/2  mx-auto">
        <h2 className="text-2xl">{title}</h2>
        <p>{description}</p>
        {/* tags */}
        <div className="flex flex-row gap-2">
          {tags.map((tag) => (
            <span key={tag} className=" p-2 rounded-full text-center ">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-2xl">{`$${activeVariant?.price.amount}`}</p>
        {/* variants */}
        <h3>
          {variantNodes[0]?.selectedOptions[0]?.name || "N/A"}: {activeColor}
        </h3>
        <div className="flex flex-row items-center gap-4">
          {variantNodes?.map((variant) => {
            // console.log("variant ==>", variant);
            const {
              selectedOptions,
              metafields,
              id: variantId,
              image,
              title,
              price,
            } = variant;
            const { amount } = price;
            const { altText, url, id } = image;

            return (
              <div
                key={variantId}
                className={`flex cursor-pointer w-16 h-16  ${
                  activeColor === title
                    ? "outline-black outline-dashed outline-offset-4 outline-2"
                    : null
                }`}
                onClick={() => {
                  setActiveVariantId(variantId);
                  setActiveColor(title);
                  setFeaturedImageDisplay(url);
                  setActiveVariant(variant);
                }}
              >
                <Image
                  src={url}
                  alt={altText || activeColor}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
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
          className={`px-4 py-3  cursor-pointer my-5 text-white rounded-md text-lg font-medium self-start ${
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
