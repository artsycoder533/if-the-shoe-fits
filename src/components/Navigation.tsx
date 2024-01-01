"use client";
import React, { useState } from "react";
import Link from "next/link";
import Cart from "./Cart";
import CartModal from "./CartModal";
import Hamburger from "./Hamburger";
import { GiConverseShoe } from "react-icons/gi";

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
};

const Navigation = ({ name }: NavigationProps) => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-between md:pr-8 max-w-[1400px] w-[90vw] mx-auto flex-wrap md:flex-nowrap text-white">
      <Link href="/" className="text-2xl font-bold flex items-center gap-1"><GiConverseShoe className="text-3xl text-purple-500" />{name}</Link>

      <ul
        className={`absolute top-16 left-0 md:static md:top-auto md:z-0 bg-black z-10 flex flex-col justify-center order-last md:order-none w-full md:w-auto md:flex-row gap-12 text-3xl md:text-base md:gap-3 items-center transition-all ${
          toggleNav ? "h-[50vh]" : "h-0 hidden md:flex"
        }`}
      >
        <li className="hover:text-purple-500 hover:underline underline-offset-8" onClick={() => setToggleNav(false)}>
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-purple-500 hover:underline underline-offset-8" onClick={() => setToggleNav(false)}>
          <Link href="/products">Products</Link>
        </li>
        <li className="hover:text-purple-500 hover:underline underline-offset-8" onClick={() => setToggleNav(false)}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <Hamburger toggleNav={toggleNav} setToggleNav={setToggleNav} />
      {/* <button className="md:hidden" onClick={() => setToggleNav(!toggleNav)}>
        X
      </button> */}
    </nav>
  );
};

export default Navigation;
