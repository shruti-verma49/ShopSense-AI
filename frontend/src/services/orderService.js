import api from "./api";

export const createOrderApi = (data) => api.post("/orders", data);
export const getOrdersApi = () => api.get("/orders");
export const getOrderByIdApi = (id) => api.get(`/orders/${id}`);