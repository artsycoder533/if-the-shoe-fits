import { cookies } from "next/headers";
import Link from "next/link";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
// import {  URL } from "shopify-buy";
import { Checkout, URL } from "shopify-buy";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import CartModal from "./CartModal";
import { getCart } from "../../lib/shopifyActions";
import { storefront } from "../../lib/shopify";

interface CartProps {
  cart: Checkout;
}

export const revalidate = 15;

const Cart = async () => {
  const gql = String.raw;

  const getCartQuery = gql`
    query GetCart($id: ID!) {
      cart(id: $id) {
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        id
        totalQuantity
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
    }
  `;

  const cartId = cookies().get("cartId")?.value;
  // console.log("cartId form cookies ==>", cartId);
  let cart;

  if (cartId) {
    cart = await storefront(getCartQuery, { cartId });
    // cart = await getCart(cartId);
    // console.log("cart from cart server ==>", cart);
  }

  return <CartModal cart={cart} />;
};

export default Cart;
