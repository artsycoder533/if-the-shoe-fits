import BreadCrumbs from "@/components/BreadCrumbs";

import { storefront } from "../../../../lib/shopify";
import ProductCard from "@/components/ProductCard";
import { cookies } from "next/headers";
// import { createCart, addToCart } from "../../../../lib/shopifyActions";

type Props = {};

export const revalidate = 15;

const ProductPage = async ({ params }: { params: { handle: string } }) => {
  if (!params.handle) return;
  const { handle } = params;
  console.log("handle ==>", handle);
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
        requiresSellingPlan
        sellingPlanGroups(first: 2) {
          edges {
            node {
              sellingPlans(first: 5) {
                edges {
                  node {
                    description
                    priceAdjustments {
                      orderCount
                      adjustmentValue {
                        __typename
                      }
                    }
                    recurringDeliveries
                    options {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
        options {
          id
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
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
              quantityAvailable
              selectedOptions {
                value
                name
              }
              image {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const createCartQuery = gql`
    mutation {
      checkoutCreate(input: {}) {
        checkout {
          id
        }
      }
    }
  `;

  const addItemToCartMutation = gql`
    mutation AddToCart(
      $checkoutId: ID!
      $lineItems: [CheckoutLineItemInput!]!
    ) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
                variant {
                  title
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { product } = await storefront(productQuery, { handle });

  console.log("product inside product handle ===>", product);

  const handleAddToCart = async (quantity: number, variantID: string) => {
    "use server";
    let cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      const { checkoutCreate } = await storefront(createCartQuery);
      const { checkout } = checkoutCreate;
      const { id: cartId } = checkout;

      cookies().set("cartId", cartId);
    }

    if (!cartId) return;
    const lineItems = [{ variantId: variantID, quantity: 1 }];
    const { checkoutLineItemsToAdd } = await storefront(addItemToCartMutation, {
      cartId,
      lineItems,
    });
    // addToCart(variantID, cartId);
  };

  return (
    <div>
      <BreadCrumbs title={product.title} />
      <ProductCard product={product} addToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
