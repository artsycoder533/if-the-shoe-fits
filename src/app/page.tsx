import ProductsList from '@/components/ProductsList'
import PRODUCTS from '../data'
import Navigation from '@/components/Navigation'
import { shopifyClient, parseShopifyResponse } from '../../lib/shopify'

// type Product = {
//   id: string;
//   availableForSale: boolean;
//   description: string;
//   handle: string;
//   title: string;
//   variants: any[];
//   images: any[];
// }

export default async function Home() {
  const res = await shopifyClient.product.fetchAll();
  const products = parseShopifyResponse(res);
  // console.log('shopify data ==>', products);

  return (
    <>
    <Navigation />
    <ProductsList products={products} />
    </>
    
  )
}


