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
    try {
      const response = await admin(getShopifyMediaUrlQuery, { id: mediaId });
      const media = response.node;
      // console.log("reponse ==>", media);
      return media ? media.originalSource.url : undefined;
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  // get images ids to query for each product variant
  const variantNodes = product.variants?.edges.map(
    (edge: { node: any }) => edge.node
  );

  const addt = variantNodes?.map(
    (variant: { metafields: any; selectedOptions: any }) => {
      const { metafields, selectedOptions } = variant;
      const key = selectedOptions[0]?.value;
      const value = metafields[0]?.value
        ? JSON.parse(metafields[0]?.value)
        : undefined;
      return {
        variant: {
          color: key,
          images: value,
        },
      };
    }
  );

  const fetchAndReplaceUrls = async () => {
    for (const item of addt) {
      const variant = item.variant;
      const images = variant.images;

      if (images && Array.isArray(images)) {
        const urls = await Promise.all(
          images.map((mediaId) => fetchImageURLs(mediaId))
        );
        variant.images = urls;
      }
      console.log("images", images);
    }
    // console.log("updated data ==>", addt);
  };

  await fetchAndReplaceUrls();

  // console.log("updatedAdddt==>", addt);

  return (
    <div>
      <BreadCrumbs title={product?.title} />
      <ProductCard
        product={product}
        addToCart={handleAddToCart}
        additionalData={addt}
      />
    </div>
  );
};

export default ProductPage;
