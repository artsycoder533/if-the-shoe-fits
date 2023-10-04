"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegWindowClose, FaShoppingCart } from "react-icons/fa";
import { Checkout } from "shopify-buy";

interface CartModalProps {
  cart: Checkout | undefined;
}

const CartModal = ({ cart }: CartModalProps) => {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (!cart) return;
    if (cart.lineItems.length < 1) return;
    // console.log("cart updated!");
    const quanity = cart.lineItems.reduce((acc, currentItem) => {
      return acc + currentItem.quantity;
    }, 0);
    setQuantity(quanity);
  }, [quantity, cart]);

  if (!cart) return;
  const { id, webUrl, totalTax, subtotalPrice, lineItems, currencyCode } = cart;
  const { amount: totalTaxAmount } = totalTax;
  const { amount: subTotal } = subtotalPrice;

  const formatPrice = (amount: string) => {
    const price = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount));
    return price;
  };

  // console.log("cart==>", cart);
  return (
    <>
      <div
        className="flex flex-row relative p-2"
        onClick={() => setToggleCart(true)}
      >
        <FaShoppingCart />
        {quantity > 0 ? (
          <span className="absolute top-0 right-0 -mt-1 bg- text-red-500">
            {quantity}
          </span>
        ) : null}
      </div>
      <aside
        className={`absolute top-0 right-0 border w-96 h-full p-3 bg-gray-300 flex flex-col justify-between transition ${
          toggleCart ? "translate-0" : "translate-x-full overflow-hidden"
        }`}
      >
        <div className="flex justify-between">
          <h2>My Cart</h2>
          <FaRegWindowClose
            onClick={() => setToggleCart(false)}
            className="text-xl"
          />
        </div>

        <div className="flex flex-col">
          {lineItems?.map((lineItem) => {
            const { title, quantity, variant } = lineItem;

            const { image } = variant || {};
            const { url, altText } = image || {};

            // console.log("images ==>", image);

            return (
              <div key={lineItem.id}>
                <p>
                  {title} x {quantity}
                </p>
                {altText && url ? (
                  <Image alt={altText || `image of ${title}`} src={url} />
                ) : null}
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex justify-between items-cente">
            <p>Taxes</p>
            <p>{`${formatPrice(String(totalTaxAmount))} ${currencyCode}`}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Shipping</p>
            <p>Calculated at checkout</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>{`${formatPrice(String(subTotal))} ${currencyCode}`}</p>
          </div>

          <Link
            href={String(webUrl)}
            className="rounded-lg py-3 px-2 border mt-4 block text-center bg-blue-600 text-white"
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CartModal;
