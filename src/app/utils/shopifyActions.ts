import { shopifyClient, parseShopifyResponse } from "../../../lib/shopify";

//create checkout
export const createCheckout = async () => {
  console.log("inside create checkout");
  const response = await shopifyClient.checkout.create();
  const checkout = parseShopifyResponse(response);
  const checkoutID: string = checkout.id;
  console.log("checkoutID", checkoutID);
  return checkoutID;
};

export const handleAddToCart = async (
  quantity: number,
  variantID: string,
  checkoutID: string
) => {
  // "use server";
  //pass in variant id, quantity and custom attributes, make array of objects
  //add item to checkout, pass in array of all products
  console.log(
    "quantity ->",
    quantity,
    "variantID->",
    variantID,
    "checkoutID->",
    checkoutID
  );
  if (!checkoutID) return;
  try {
    const lineItemsToAdd = [{ variantId: variantID, quantity }];
    const response = await shopifyClient.checkout.addLineItems(
      checkoutID,
      lineItemsToAdd
    );
  } catch (error) {
    console.log(error);
  }

  // const cartResponse = parseShopifyResponse(response);
  // return;
};
