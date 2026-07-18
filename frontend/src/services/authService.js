import api from "./api";

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getProfileApi = () => api.get("/auth/profile");
export const updateProfileApi = (data) => api.put("/auth/profile", data);
export const changePasswordApi = (data) => api.put("/auth/change-password", data);