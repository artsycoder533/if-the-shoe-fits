import React from 'react'
import Link from 'next/link'

type Props = {}

const Navigation = (props: Props) => {
  return (
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
        </ul>
    </nav>
  )
}

export default Navigation