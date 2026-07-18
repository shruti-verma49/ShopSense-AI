import api from "./api";
import { normalizeProduct } from "../utils/productAdapter";

export async function fetchProducts() {
  const response = await api.get("/products");
  return response.data.products.map(normalizeProduct);
}

export async function fetchProductById(id) {
  const response = await api.get(`/products/${id}`);
  return normalizeProduct(response.data.product);
}