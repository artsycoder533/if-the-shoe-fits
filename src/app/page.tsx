import Hero from "@/components/Hero";
import { storefront } from "../../lib/shopify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'If The Shoe Fits',
  description: 'A hip sneaker boutique nestled in the heart of the Mall of America.'
}

export default async function Home() {
  const gql = String.raw;

  const shopQuery = gql`
    query Shop {
      shop {
        name
      }
    }
  `;

  const { shop } = await storefront(shopQuery);
  const { name } = shop;
  return (
    <section className="">
      <Hero title={name} />
    </section>
  );
}
