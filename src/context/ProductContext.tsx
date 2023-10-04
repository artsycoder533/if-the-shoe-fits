import { Product } from "@/types/product";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface ProductContextInterface {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const initialState: ProductContextInterface = {
  products: [],
  setProducts: () => {},
};

export const ProductContext =
  createContext<ProductContextInterface>(initialState);

type ProductProviderProps = {
  children: ReactNode;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>(initialState.products);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
