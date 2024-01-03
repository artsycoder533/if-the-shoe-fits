import ProductsList from "@/components/ProductsList";
import { storefront } from "../../../lib/shopify";
import { Metadata } from "next";
import { productsQuery } from "../utils/queries";
import { getFilteredProducts } from "../utils/helpers";

export const metadata: Metadata = {
  title: 'Products',
}

export const revalidate = 60;

export default async function Products() {
  const { products } = await storefront(productsQuery);

  const filteredProducts = getFilteredProducts(products);

  return (
    <section className="mt-12">
        <ProductsList products={filteredProducts} />
    </section>
  );
}
