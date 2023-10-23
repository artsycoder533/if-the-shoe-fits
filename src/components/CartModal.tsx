"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegWindowClose, FaShoppingCart } from "react-icons/fa";
import { Checkout, Cart } from "shopify-buy";
import { formatPrice } from "@/app/utils/helpers";

interface CartModalProps {
  cart: Cart | undefined;
}

const CartModal = ({ cart }: CartModalProps) => {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);

  // console.log("cart==>", cart);

  useEffect(() => {
    if (!cart) return;
    if (cart?.lines?.length < 1) return;
    // console.log("cart updated!");
    const quanity = cart?.lines.edges?.reduce((acc, currentItem) => {
      return acc + currentItem.quantity;
    }, 0);
    setQuantity(quanity);
  }, [quantity, cart]);

  if (!cart) return;
  console.log("cart==>", cart);
  const { id, checkoutUrl, lines, totalQuantity, cost } = cart || {};
  const { subtotalAmount, totalTaxAmount } = cost || {};
  const { amount, currencyCode } = subtotalAmount || {};

  // console.log(amount, subtotalAmount);

  // const formatPrice = (amount: string, currencyCode: string) => {
  //   if (!amount || !currencyCode) return;
  //   const price = new Intl.NumberFormat(undefined, {
  //     style: "currency",
  //     currency: currencyCode,
  //     currencyDisplay: "narrowSymbol",
  //   }).format(parseFloat(amount));
  //   return price;
  // };

  // console.log("cart==>", cart);
  return (
    <>
      <div
        className="flex flex-row relative p-2"
        onClick={() => setToggleCart(true)}
      >
        <FaShoppingCart />
        {totalQuantity > 0 ? (
          <span className="absolute top-0 right-0 -mt-1 bg- text-red-500">
            {totalQuantity}
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
          {lines.edges?.map((node) => {
            console.log("node===>", node);

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
            const { name, value } = selectedOptions[0];

            // const { image } = variant || {};
            const { url, altText } = image || {};
            console.log(amount, variantTitle, url, altText);
            // console.log("images ==>", image);

            return (
              <div key={merchandiseId} className="border flex">
                {altText && url ? (
                  <Image
                    alt={altText || `image of ${variantTitle}`}
                    src={url}
                    width={75}
                    height={75}
                  />
                ) : null}
                <div>
                  <p>{productTitle}</p>
                  {/* <p>{value}</p> */}
                  <p>
                    {variantTitle} x {quantity}
                  </p>
                  <p>
                    {`${formatPrice(
                      String(amount),
                      currencyCode
                    )} ${currencyCode}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex justify-between items-cente">
            <p>Taxes</p>
            <p>Calculated at checkout</p>
            {/* <p>{`${formatPrice(
              String(totalTaxAmount),
              currencyCode
            )} ${currencyCode}`}</p> */}
          </div>
          <div className="flex justify-between items-center">
            <p>Shipping</p>
            <p>Calculated at Checkout</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>{`${formatPrice(
              String(amount),
              currencyCode
            )} ${currencyCode}`}</p>
          </div>

          <Link
            href={String(checkoutUrl)}
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
