import api from "./api";

export async function getCart() {
  const { data } = await api.get("/cart");
  return data;
}
export async function addToCart(productId, qty = 0) {
  const { data } = await api.post("/cart/add", { productId: productId, quantity: qty });
  return data;
}
// export async function updateCartItem(itemId, qty) {
//   const { data } = await api.put(`/cart/update`, { product: itemId, quantity: qty });
//   return data;
// }

export const updateCartItem = async (productId, quantity) => {
  const { data } = await api.put("/cart/update", { productId, quantity });
  return data;
};

export async function removeCartItem(productId) {
  const { data } = await api.delete(`/cart/remove/${productId}`);
  return data;
}
