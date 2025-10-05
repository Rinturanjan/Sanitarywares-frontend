import api from "./api";

export async function getProducts(params = {}) {
  const { data } = await api.get("/products", { params });
  return Array.isArray(data) ? data : [];
}
export async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
export async function createProduct(payload) {
  const { data } = await api.post("/products", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
export async function updateProduct(id, payload) {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
}
export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

// Categories, Companies, Sizes for dropdowns
export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

export async function getCompanies() {
  const { data } = await api.get("/companies");
  return data;
}

export async function getSizes() {
  const { data } = await api.get("/sizes");
  return data;
}
