import api from "./api";

export const getCartApi = () => api.get("/cart");
export const addToCartApi = (productId, quantity = 1) => api.post("/cart", { productId, quantity });
export const updateCartItemApi = (productId, quantity) => api.put(`/cart/${productId}`, { quantity });
export const removeFromCartApi = (productId) => api.delete(`/cart/${productId}`);