import Navigation from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CartProvider from "@/context/CartContext";
import Cart from "@/components/Cart";
import { cookies } from "next/headers";
// import { parseShopifyResponse, shopifyClient } from "../../lib/shopify";
import { createCart, getCart } from "../../lib/shopifyActions";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.className} flex min-h-full flex-col overflow-x-hidden`}
      >
        {/* <CartProvider cart={cart}> */}
        <main className="grow">
          <Navigation />
          {children}
        </main>
        {/* </CartProvider> */}
      </body>
    </html>
  );
}
