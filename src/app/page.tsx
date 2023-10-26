import Hero from "@/components/Hero";
import { storefront } from "../../lib/shopify";

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
