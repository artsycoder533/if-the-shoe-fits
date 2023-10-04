import React, { Suspense, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
// import { parseShopifyResponse, shopifyClient } from "../../lib/shopify";
import { Checkout } from "shopify-buy";

interface NavigationProps {
  // cart: Checkout;
}

const Navigation = async () => {
  return (
    <header>
      <nav className="h-14 flex items-center">
        <ul className="flex flex-row gap-3 items-center">
          <li>
            <Link href="/">All Products</Link>
          </li>
          <li>
            <Link href="/collections/men">Men</Link>
          </li>
          <li>
            <Link href="/collections/women">Women</Link>
          </li>
          <li>
            <Suspense fallback={<FaShoppingCart />}>
              <Cart />
            </Suspense>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
