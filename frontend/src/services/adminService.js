import api from "./api";

export const getDashboardStatsApi = () => api.get("/admin/stats");

export const getAdminProductsApi = (params) => api.get("/admin/products", { params });
export const createProductApi = (data) => api.post("/admin/products", data);
export const updateProductApi = (id, data) => api.put(`/admin/products/${id}`, data);
export const deleteProductApi = (id) => api.delete(`/admin/products/${id}`);

export const getAdminOrdersApi = (params) => api.get("/admin/orders", { params });
export const updateOrderStatusApi = (id, deliveryStatus) => api.put(`/admin/orders/${id}/status`, { deliveryStatus });

export const getAdminUsersApi = (params) => api.get("/admin/users", { params });