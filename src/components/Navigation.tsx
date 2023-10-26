import React, { Suspense, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import { storefront } from "../../lib/shopify";

const Navigation = async () => {
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
    <header className="py-4 bg-black mx-auto text-white">
      <nav className=" flex items-center justify-between max-w-[1400px] w-[90vw] mx-auto">
        <h2 className="text-2xl font-bold">{name}</h2>
        <ul className="flex flex-row gap-3 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <Cart />
      </nav>
    </header>
  );
};

export default Navigation;
