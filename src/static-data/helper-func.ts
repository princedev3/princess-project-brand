import { ProductCartType } from "./cart-store";

export function sanitizeQuery(query: string) {
  const decodedQuery = decodeURIComponent(query);

  const sanitizedQuery = decodedQuery.replace(/[^a-zA-Z0-9\s-]/g, "");

  return sanitizedQuery;
}

export function disAbleCart(
  products: ProductCartType[],
  id: string,
  quantity: number
) {
  const inCart = products.find((item) => item.id === id);

  const cartQuantity = inCart?.quantity || 0;

  return quantity <= 0 || cartQuantity >= quantity;
}
