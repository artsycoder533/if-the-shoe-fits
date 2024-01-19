"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

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

interface CartModalProps {
  cart: Cart | undefined;
}

const CartModal = ({ cart }: CartModalProps) => {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number | null>(null);

  useEffect(() => {
    if (!cart) return;
    if (!cart.lines || cart.lines.edges.length < 1) return;
    const quanity = cart?.lines.edges?.reduce((acc, currentItem) => {
      return acc + currentItem.node.quantity;
    }, 0);
    setQuantity(quanity);
  }, [quantity, cart]);

  if (!cart)
    return (
      <button className="flex flex-row absolute p-2 right-24 md:right-4 lg:right-10">
        <FaShoppingCart className="text-white text-2xl"/>
      </button>
    );
  const { id, checkoutUrl, lines, totalQuantity, cost } = cart || {};
  const { subtotalAmount, totalTaxAmount } = cost || {};
  const { amount, currencyCode } = subtotalAmount || {};

  const formatPrice = (amount: string, currencyCode: string) => {
    if (!amount || !currencyCode) return;
    const price = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount));
    return price;
  };

  return (
    <>
      <button
        className="flex flex-row absolute p-2 right-24 md:right-4 lg:right-10 group"
        onClick={() => setToggleCart(true)}
      >
        <FaShoppingCart className="text-white text-2xl group-hover:text-purple-500" />
        {totalQuantity && totalQuantity > 0 ? (
          <span className="absolute top-0 -right-3 -mt-1 bg-purple-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
            {totalQuantity}
          </span>
        ) : null}
      </button>
      <aside
        className={`absolute top-0 right-0 border h-screen overflow-scroll w-96  p-3 bg-white text-black flex flex-col space-y-4 transition ${
          toggleCart ? "translate-0" : "translate-x-full overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl pointer font-light">My Cart</h2>
          <GrClose
            onClick={() => setToggleCart(false)}
            className="text-2xl pointer font-medium"
          />
        </div>

        <div className="flex flex-col gap-3 flex-1">
          {lines &&
            lines.edges?.map((node) => {
              const { quantity, merchandise } = node.node || {};
              const {
                id: merchandiseId,
                price,
                selectedOptions,
                title: variantTitle,
                image,
                product,
              } = merchandise || {};
              const { title: productTitle } = product || {};
              const { amount } = price || {};
              const { url, altText } = image || {};
              const {name, value} = selectedOptions[0];
              return (
                <div key={merchandiseId} className="border-b flex py-2 gap-2">
                  {url ? (
                    <Image
                      alt={altText || `image of ${variantTitle}`}
                      src={url}
                      width={75}
                      height={75}
                      className="rounded-lg"
                    />
                  ) : null}
                  <div className="w-full flex flex-col justify-between">
                    <p className="text-sm">{productTitle}</p>
                    <p className="text-sm">
                      {`${name}: ${value} x ${quantity}`}
                    </p>
                    <p className="self-end font-semibold">
                      {`${formatPrice(String(amount), currencyCode)}`}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <div className="flex justify-between items-center font-light">
            <p>Taxes</p>
            <p>Calculated at checkout</p>
          </div>
          <div className="flex justify-between items-center font-light">
            <p>Shipping</p>
            <p>Calculated at Checkout</p>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <p>Total</p>
            <p>{`${formatPrice(
              String(amount),
              currencyCode
            )} ${currencyCode}`}</p>
          </div>

          <Link
            href={String(checkoutUrl)}
            className="rounded-lg py-3 px-2 border mt-4 block text-center bg-purple-500 hover:bg-purple-700 text-white"
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CartModal;

//
