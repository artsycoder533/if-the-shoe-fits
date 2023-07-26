import Link from 'next/link';
import React from 'react'

type BreadCrumbsProps = {
    title: string;
}

const BreadCrumbs = ({title}: BreadCrumbsProps) => {
  return (
    <nav className="flex flex-row gap-3">
        <Link href="/">Products</Link>
        <span>&gt;</span>
        <Link href={title}>{title}</Link>
    </nav>
  )
}

export default BreadCrumbs;