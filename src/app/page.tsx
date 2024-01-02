import Hero from "@/components/Hero";
import { storefront } from "../../lib/shopify";
import { Metadata } from "next";
import { shopQuery } from "./utils/queries";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const { shop } = await storefront(shopQuery);
  const { name } = shop;
  return (
    <section className="">
      <Hero title={name} />
    </section>
  );
}
