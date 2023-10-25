import ProductsList from "@/components/ProductsList";
import { storefront } from "../../lib/shopify";
import { Suspense } from "react";

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

  const filteredProducts = products.edges.map((edge: { node: any }) => {
    const node = edge.node;
    return {
      ...node,
      images: node.images.edges.map(
        (imageEdge: { node: any }) => imageEdge.node
      ),
      variants: node.variants.edges.map(
        (variantEdge: { node: any }) => variantEdge.node
      ),
    };
  });

  return (
    <section className="">
      <Suspense>
        <ProductsList products={filteredProducts} />
      </Suspense>
    </section>
  );
}
