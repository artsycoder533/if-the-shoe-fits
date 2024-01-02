import { MetadataRoute } from "next";
import { productsQuery } from "./utils/queries";
import { storefront } from "../../lib/shopify";
import { getFilteredProducts } from "./utils/helpers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await storefront(productsQuery);

  const filteredProducts = getFilteredProducts(products);

  const singleProducts: MetadataRoute.Sitemap = filteredProducts.map(
    (product) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.handle}`,
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/refunds`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    },
    ...singleProducts,
  ];
}
