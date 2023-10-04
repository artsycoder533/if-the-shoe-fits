"use server";

import { cookies } from "next/headers";
// import { parseShopifyResponse, shopifyClient } from "./shopify";
import { revalidatePath, revalidateTag } from "next/cache";

export const createCart = async () => {
  try {
    const checkoutRes = await shopifyClient.checkout.create();
    const cart = parseShopifyResponse(checkoutRes);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (cartId: string) => {
  try {
    const cartRes = await shopifyClient.checkout.fetch(cartId);
    const cart = parseShopifyResponse(cartRes);
    return cart;
  } catch (error) {
    return "Error adding item to cart";
  }
};

export const addToCart = async (variantID: string, cartId: string) => {
  try {
    const lineItemsToAdd = [{ variantId: variantID, quantity: 1 }];

    if (cartId) {
      const response = await shopifyClient.checkout.addLineItems(
        cartId,
        lineItemsToAdd
      );
    }
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
};
