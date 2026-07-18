import api from "./api";

export const getAddressesApi = () => api.get("/address");
export const addAddressApi = (data) => api.post("/address", data);
export const updateAddressApi = (id, data) => api.put(`/address/${id}`, data);
export const deleteAddressApi = (id) => api.delete(`/address/${id}`);