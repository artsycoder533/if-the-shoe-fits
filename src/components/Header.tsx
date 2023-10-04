import { Checkout } from "shopify-buy";
import Cart from "./Cart";
import Navigation from "./Navigation";
import { cookies } from "next/headers";
import { getCart } from "../../lib/shopifyActions";

interface HeaderProps {
  //   cart: Checkout;
}

const Header = async () => {
  return (
    <>
      <Navigation />
    </>
  );
};

export default Header;
