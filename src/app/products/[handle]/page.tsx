import BreadCrumbs from "@/components/BreadCrumbs";
import { storefront } from "../../../../lib/shopify";
import ProductCard from "@/components/ProductCard";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import {
  createCartQuery,
  addItemToCartMutation,
  productQuery,
} from "@/app/utils/queries";

export const revalidate = 60;

export const generateMetadata = ({
  params,
}: {
  params: { handle: string };
}): Metadata => {
  return {
    title: `${params.handle}`,
  };
};

const ProductPage = async ({ params }: { params: { handle: string } }) => {
  if (!params.handle) return;
  const { handle } = params;

  const { product } = await storefront(productQuery, { handle });
  if (!product) return;

  const handleAddToCart = async (quantity: number, variantID: string) => {
    "use server";
    if (!quantity || !variantID) return;
    let cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      const { cartCreate } = await storefront(createCartQuery);
      const { cart } = cartCreate;
      const { id } = cart;
      cartId = id;
      cookies().set("cartId", id);
    }

    const lines = [{ merchandiseId: variantID, quantity }];
    const result = await storefront(addItemToCartMutation, {
      cartId,
      lines,
    });

    revalidatePath(`/products/${handle}`);
  };

  return (
    <section className="my-16">
      <BreadCrumbs title={product?.title} />
      <ProductCard product={product} addToCart={handleAddToCart} />
    </section>
  );
};

export default ProductPage;
