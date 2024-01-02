export const formatPrice = (amount: string, currencyCode: string) => {
  if (!amount || !currencyCode) return;
  const price = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
  return price;
};

export const getFilteredProducts = (products: { edges: { node: any; }[]; }) => {
  const filteredProducts = products.edges.map((edge: { node: any }) => {
    const node = edge.node;
    return {
      ...node,
      images: node.images.edges.map(
        (imageEdge: { node: any }) => imageEdge.node
      ),
    };
  });
  return filteredProducts;
}

