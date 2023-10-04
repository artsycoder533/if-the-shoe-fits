import React from "react";
import PRODUCTS from "@/data";
import Navigation from "@/components/Navigation";
import ProductsList from "@/components/ProductsList";
import BreadCrumbs from "@/components/BreadCrumbs";
import { shopifyClient, parseShopifyResponse } from "../../../../lib/shopify";

const CollectionPage = async ({
  params,
}: {
  params: { collectionPage: string };
}) => {
  const res = await shopifyClient.collection.fetchAllWithProducts();
  // console.log("res===>", res);
  const collections = parseShopifyResponse(res);
  const collectionsFull = collections[0].products;
  console.log("collections===>", collectionsFull);
  // const collection = collections.find(collection => collection.handle === params.collectionPage);
  // const collection = collections.find(
  //   (collection: any) => collection.handle === params.collectionPage
  // );

  // const products = collection.products;
  // const products = PRODUCTS.filter(product => product.collection === params.collectionPage)
  return (
    <section>
      <BreadCrumbs title={params.collectionPage} />
      {/* <ProductsList products={products} /> */}
    </section>
  );
};

export default CollectionPage;
