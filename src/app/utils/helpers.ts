export const formatPrice = (amount: string, currencyCode: string) => {
  if (!amount || !currencyCode) return;
  const price = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
  return price;
};
