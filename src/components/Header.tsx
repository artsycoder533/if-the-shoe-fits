import React from "react";
import Navigation from "./Navigation";
import { storefront } from "../../lib/shopify";
import Cart from "./Cart";
import { cookies } from "next/headers";
import { FaShoppingCart } from "react-icons/fa";

type Props = {};

const Header = async (props: Props) => {
  const gql = String.raw;

  const navItemsQuery = gql`
    query MenuItems {
      shop {
        name
      }
    }
  `;

  const { shop } = await storefront(navItemsQuery);
  const { name } = shop;

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
  //   if (!id)
  //     return (
  //       <button>
  //         <FaShoppingCart />
  //       </button>
  //     );
  if (id) {
    cart = await storefront(getCartQuery, { id });
    // cart = await getCart(checkoutId);
    // console.log("cart from cart server ==>", cart.cart);
  }
  return (
    <header>
      <Navigation name={name} cart={cart} />
    </header>
  );
};

export default Header;
