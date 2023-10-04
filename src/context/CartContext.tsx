"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Checkout } from "shopify-buy";

export interface CartContextInterface {
  cart: Checkout | null;
  setCart: Dispatch<SetStateAction<Checkout | null>>;
}

const initialState: CartContextInterface = {
  cart: null,
  setCart: () => {},
};

// const useCartState = (initialState: Checkout) =>
//   useState<Checkout>(initialState);

export const CartContext = createContext<CartContextInterface>(initialState);

type CartProviderProps = {
  children: ReactNode;
  cart: Checkout | null;
};

const CartProvider = ({ cart: initialCart, children }: CartProviderProps) => {
  const [cart, setCart] = useState<Checkout | null>(initialCart);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = (): CartContextInterface => {
  const cart = useContext(CartContext);
  return cart;
};
