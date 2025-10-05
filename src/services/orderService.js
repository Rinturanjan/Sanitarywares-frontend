import api from "./api";

export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data;
}
export async function getMyOrders() {
  const { data } = await api.get("/orders/my");
  return data; // array
}
export async function getAllOrders() {
  const { data } = await api.get("/orders");
  return data;
}
