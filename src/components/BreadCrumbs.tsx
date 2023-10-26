import Link from "next/link";
import React from "react";

type BreadCrumbsProps = {
  title: string;
};

const BreadCrumbs = ({ title }: BreadCrumbsProps) => {
  return (
    <nav className="flex flex-row gap-3 max-w-[1400px] w-[90vw] mx-auto py-2">
      <Link href="/products" className="underline">
        Products
      </Link>
      <span>&gt;</span>
      <span>{title}</span>
    </nav>
  );
};

export default BreadCrumbs;
