"use client";
import React, { useState } from "react";
import Link from "next/link";
import Cart from "./Cart";
import CartModal from "./CartModal";

type ProductVariant = {
  id: string;
  price: {
    amount: number;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
  title: string;
  image: {
    url: string;
    altText: string;
  };
  product: {
    title: string;
  };
};

type CartLine = {
  merchandise: ProductVariant;
  quantity: number;
};

type Cart = {
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: number;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: number;
      currencyCode: string;
    };
  };
  totalQuantity: number;
  id: string;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
};

type NavigationProps = {
  name: string;
  cart?: Cart;
};

const Navigation = ({ name, cart }: NavigationProps) => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  return (
    <header className="py-4 bg-black mx-auto text-white">
      <nav className="flex items-center justify-between max-w-[1400px] w-[90vw] mx-auto flex-wrap md:flex-nowrap">
        <h2 className="text-2xl font-bold">{name}</h2>

        <ul
          className={`absolute top-12 left-0 md:static md:top-auto md:z-0 bg-black z-10 flex flex-col justify-center order-last md:order-none w-full md:w-auto md:flex-row gap-3 items-center transition-all ${
            toggleNav ? "h-96" : "h-0 hidden md:flex"
          }`}
        >
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
        {/* <Cart /> */}
        <CartModal cart={cart} />
        <button className="md:hidden" onClick={() => setToggleNav(!toggleNav)}>
          X
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
