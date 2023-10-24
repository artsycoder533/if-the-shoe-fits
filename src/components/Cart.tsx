import { cookies } from "next/headers";
import Link from "next/link";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
// import {  URL } from "shopify-buy";
import { Checkout, URL } from "shopify-buy";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import CartModal from "./CartModal";
import { storefront } from "../../lib/shopify";

interface CartProps {
  cart: Checkout;
}

export const revalidate = 0;

const Cart = async () => {
  const gql = String.raw;

  const getCartQuery = gql`
    query FetchCart($id: ID!) {
      cart(id: $id) {
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        totalQuantity
        id
        lines(first: 10) {
          edges {
            node {
              merchandise {
                ... on ProductVariant {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  title
                  image {
                    url
                    altText
                  }
                  product {
                    title
                  }
                }
              }
              quantity
            }
          }
        }
      }
    }
  `;

  const id = cookies().get("cartId")?.value;
  // console.log("in cart checkout id is ==>", id);
  // console.log("cartId form cookies ==>", cartId);
  let cart;
  if (!id) return;
  if (id) {
    cart = await storefront(getCartQuery, { id });
    // cart = await getCart(checkoutId);
    console.log("cart from cart server ==>", cart.cart);
  }

  return <CartModal cart={cart.cart} />;
};

export default Cart;
