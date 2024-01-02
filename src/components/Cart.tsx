import { cookies } from "next/headers";
import { FaShoppingCart } from "react-icons/fa";
import { Checkout, URL } from "shopify-buy";
import CartModal from "./CartModal";
import { storefront } from "../../lib/shopify";
import { getCartQuery } from "@/app/utils/queries";

export const revalidate = 30;

const Cart = async () => {
 
  const id = cookies().get("cartId")?.value;
  let cart;
  if (!id)
    return (
      <button className="flex flex-row absolute p-2 right-24 md:right-8 lg:right-10">
        <FaShoppingCart className="text-white text-2xl" />
      </button>
    );
  if (id) {
    cart = await storefront(getCartQuery, { id });
  }

  return <CartModal cart={cart.cart} />;
};

export default Cart;
