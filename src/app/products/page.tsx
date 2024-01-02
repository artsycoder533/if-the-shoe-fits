import ProductsList from "@/components/ProductsList";
import { storefront } from "../../../lib/shopify";
import { Suspense } from "react";
import { Metadata } from "next";
import { productsQuery } from "../utils/queries";

export const metadata: Metadata = {
  title: 'Products',
}

export const revalidate = 60;

export default async function Products() {
  const { products } = await storefront(productsQuery);

  const filteredProducts = products.edges.map((edge: { node: any }) => {
    const node = edge.node;
    return {
      ...node,
      images: node.images.edges.map(
        (imageEdge: { node: any }) => imageEdge.node
      ),
    };
  });

  return (
    <section className="mt-12">
      <Suspense>
        <ProductsList products={filteredProducts} />
      </Suspense>
    </section>
  );
}
