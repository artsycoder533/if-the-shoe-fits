import Link from "next/link";
import React from "react";

type Props = {
  title: string;
};

const Hero = ({ title }: Props) => {
  if (!title) return;
  return (
    <section className="h-96 flex flex-col justify-center items-center border gap-12">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Link href="/products" className="border p-4">
        Browse Products
      </Link>
    </section>
  );
};

export default Hero;
