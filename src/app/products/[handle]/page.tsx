import BreadCrumbs from "@/components/BreadCrumbs";
import { storefront } from "../../../../lib/shopify";
import ProductCard from "@/components/ProductCard";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
// import { createCart, addToCart } from "../../../../lib/shopifyActions";

type Props = {};

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
                    id
                    name
                  }
                }
              }
              options {
                name
                values
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
        totalInventory
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
                sellingPlanAllocation {
                  sellingPlan {
                    recurringDeliveries
                    name
                    id
                    description
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

  return (
    <div>
      <BreadCrumbs title={product?.title} />
      <ProductCard product={product} addToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
