import React from "react";
import Navigation from "./Navigation";
import { storefront } from "../../lib/shopify";
import Cart from "./Cart";

export const revalidate = 60;

const Header = async () => {
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

  return (
    <header className="py-4 bg-black flex items-center justify-center fixed z-[15] w-full">
      <Navigation name={name} />
      <Cart />
    </header>
  );
};

export default Header;
