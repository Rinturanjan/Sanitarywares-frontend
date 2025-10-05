import api from "./api";

export async function getWishlist() {
    const { data } = await api.get("/wishlist");
    return data;
}

export async function addToWishlist(productId) {
    const { data } = await api.post("/wishlist/add", { productId });
    return data;
}

export async function deleteWishlist(productId) {
    const { data } = await api.delete(`/wishlist/remove/${productId}`);
    return data;
}