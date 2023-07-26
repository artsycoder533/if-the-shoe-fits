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
  const res = shopifyClient.collection.fetchAllWithProducts();
  const collections = parseShopifyResponse(res);
  // console.log('collections===>', collections)
  // const collection = collections.find(collection => collection.handle === params.collectionPage);
  const collection = collections.find(
    (collection) => collection.handle === params.collectionPage
  );

  const products = collection.products;
  // const products = PRODUCTS.filter(product => product.collection === params.collectionPage)
  return (
    <div>
      <Navigation />
      <div>
        <BreadCrumbs title={params.collectionPage} />
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
