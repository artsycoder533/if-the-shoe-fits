import ProductsList from "@/components/ProductsList";
// import { shopifyClient, parseShopifyResponse } from "../../lib/shopify";
import { cookies } from "next/headers";
import { createCart, getCart } from "../../lib/shopifyActions";
import { storefront } from "../../lib/shopify";
import { Suspense } from "react";

type Product = {
  id: string;
  availableForSale: boolean;
  description: string;
  handle: string;
  title: string;
  variants: any[];
  images: any[];
};
export const revalidate = 15;

export default async function Home() {
  const gql = String.raw;

  //get all products
  const productsQuery = gql`
    query Products {
      products(first: 50) {
        edges {
          node {
            title
            handle
            description
            id
            featuredImage {
              id
              url
              altText
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
                }
              }
            }
          }
        }
      }
    }
  `;

  const { products } = await storefront(productsQuery);

  const filteredProducts = products.edges.map((edge) => {
    const node = edge.node;
    return {
      ...node,
      images: node.images.edges.map((imageEdge) => imageEdge.node),
      variants: node.variants.edges.map((variantEdge) => variantEdge.node),
    };
  });

  // console.log("products ===>", filteredProducts);

  //fetch all products
  // const res = await shopifyClient.product.fetchAll();
  // const products = parseShopifyResponse(res);

  // //create a checkout
  // const cartId = cookies().get("cartID")?.value;
  // let cart;
  // if (cartId) {
  //   cart = await getCart(cartId);
  // }

  // if (!cartId) {
  //   await createCart();
  // }

  return (
    <section className="">
      <Suspense>
        <ProductsList products={filteredProducts} />
      </Suspense>
    </section>
  );
}
