import BreadCrumbs from "@/components/BreadCrumbs";
import { admin, storefront } from "../../../../lib/shopify";
import ProductCard from "@/components/ProductCard";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type Props = {};

type ImageURL = {};

type ImageVariant = {
  color: string;
  images: string[];
};

export const revalidate = 15;

const ProductPage = async ({ params }: { params: { handle: string } }) => {
  if (!params.handle) return;
  const { handle } = params;
  const gql = String.raw;

  const productQuery = gql`
    query SingleProduct($handle: String!) {
      product(handle: $handle) {
        title
        handle
        requiresSellingPlan
        description
        id
        productType
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
        featuredImage {
          id
          url
          altText
        }
        seo {
          title
        }
        availableForSale
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        isGiftCard
        variants(first: 10) {
          edges {
            node {
              id
              title
              image {
                url
                altText
                id
              }
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                value
                name
              }
              metafields(
                identifiers: { namespace: "custom", key: "image_list" }
              ) {
                value
              }
            }
          }
        }
      }
    }
  `;

  const createCartQuery = gql`
    mutation CreateCcart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const addItemToCartMutation = gql`
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
          id
          lines(first: 10) {
            edges {
              node {
                quantity
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                    title
                    image {
                      altText
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const getShopifyMediaUrlQuery = `
  query GetShopifyMediaUrl($id: ID!){
    node(id: $id) {
      ... on MediaImage {
        originalSource {
          url
        }
        alt
      }
    }
  }
  `;

  const { product } = await storefront(productQuery, { handle });
  if (!product) return;

  const handleAddToCart = async (quantity: number, variantID: string) => {
    "use server";
    if (!quantity || !variantID) return;
    let cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      const { cartCreate } = await storefront(createCartQuery);
      const { cart } = cartCreate;
      const { id } = cart;
      cartId = id;
      cookies().set("cartId", id);
    }

    const lines = [{ merchandiseId: variantID, quantity }];
    const result = await storefront(addItemToCartMutation, {
      cartId,
      lines,
    });

    revalidatePath(`/products/${handle}`);
  };

  const fetchImageURLs = async (mediaId: string) => {
    const imageURLs: string[] = [];

    try {
      const response = await admin(getShopifyMediaUrlQuery, { mediaId });
      console.log(response);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }

    return imageURLs;
  };

  // get images ids to query for each product variant
  const variantNodes = product.variants?.edges.map(
    (edge: { node: any }) => edge.node
  );

  // const addt = variantNodes?.map(
  //   (variant: { metafields: any; selectedOptions: any }) => {
  //     const { metafields, selectedOptions } = variant;
  //     const key = selectedOptions[0]?.value;
  //     const value = metafields[0]?.value
  //       ? JSON.parse(metafields[0]?.value)
  //       : undefined;
  //     const result = [];
  //     if (metafields[0]?.value) {
  //       const imageIds = JSON.parse(metafields[0].value);
  //       imageIds.map(async (val: string) => {
  //         const node = await fetchImageURLs(val);
  //         console.log("url=>", node.originalSource.url);
  //         result.push(url);
  //       });
  //     } else {
  //       result.push(undefined);
  //     }
  //     return {
  //       variant: {
  //         color: key,
  //         // images: value,
  //         images: result,
  //       },
  //     };
  //   }
  // );

  const addt = variantNodes?.map(
    (variant: { metafields: any; selectedOptions: any }) => {
      const { metafields, selectedOptions } = variant;
      const key = selectedOptions[0]?.value;
      const value = metafields[0]?.value
        ? JSON.parse(metafields[0]?.value)
        : undefined;
      // const result = [];
      // if (metafields[0]?.value) {
      //   const imageIds = JSON.parse(metafields[0].value);
      //   imageIds.map((val: string) => {
      //     const url = fetchImageURLs(val);
      //     console.log("url=>", url);
      //     // result.push(url);
      //   });
      // } else {
      //   result.push(undefined);
      // }
      return {
        variant: {
          color: key,
          images: value,
          // images: result,
        },
      };
    }
  );

  //replace shopify media id with image url
  // const updatedAddt = addt;
  // for (const item of addt) {
  //   const key = Object.keys(item)[0];
  //   const mediaIds = item[key];

  //   if (Array.isArray(mediaIds)) {
  //     const imageUrls = await fetchImageURLs(mediaIds);
  //     const updatedItem = { [key]: imageUrls };
  //     updatedAddt.push(updatedItem);
  //   } else {
  //     updatedAddt.push(item);
  //   }
  // }
  console.log("updatedAdddt==>", addt);
  // addt.forEach((el) => {
  //   console.log("each iteration=", el.variant.color, el.variant.images);
  //   return el;
  // });

  return (
    <div>
      <BreadCrumbs title={product?.title} />
      <ProductCard product={product} addToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
