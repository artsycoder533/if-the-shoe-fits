"use server";

import Client from "shopify-buy";

// export const shopifyClient = Client.buildClient({
//   storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
//   domain: process.env.SHOPIFY_STORE_DOMAIN,
// });

// // SHOPIFY_API_URL=https://exampledemo9.myshopify.com/api/2023-07/graphql.json

// export const parseShopifyResponse = (response) =>
//   JSON.parse(JSON.stringify(response));

export const storefront = async (query, variables = {}) => {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const result = await response.json();

  // Check if there are any errors in the response
  if (result.errors) {
    console.log(result.errors);
    console.log(result.data);
    throw new Error(result.errors[0].message);
  }

  return result.data;
};

//filter through edges and nodes
export const removeEdgesAndNodes = () => {
  const filteredResults = results.edges.map((edge) => edge.node);
  return filteredResults;
};
