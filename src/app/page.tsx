import ProductsList from "@/components/ProductsList";
import PRODUCTS from "../data";
import Navigation from "@/components/Navigation";
import { shopifyClient, parseShopifyResponse } from "../../lib/shopify";

// type Product = {
//   id: string;
//   availableForSale: boolean;
//   description: string;
//   handle: string;
//   title: string;
//   variants: any[];
//   images: any[];
// }
export const revalidate = 15;

export default async function Home() {
  //create checkout
  const response = await shopifyClient.checkout.create();
  const checkout = parseShopifyResponse(response);
  console.log("checkout ==>", checkout);
  //get all productcs
  const res = await shopifyClient.product.fetchAll();
  const products = parseShopifyResponse(res);
  // console.log("shopify data ==>", products, products.length);
  const titles = products.map((product) => product.title);
  // console.log(titles);

  return (
    <section className="">
      <ProductsList products={products} />
    </section>
  );
}
