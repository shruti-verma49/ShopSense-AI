import api from "./api";

export const getProductReviewsApi = (productId, sort = "newest") =>
  api.get(`/reviews/${productId}`, { params: { sort } });
export const getReviewEligibilityApi = (productId) => api.get(`/reviews/${productId}/eligibility`);
export const createReviewApi = (productId, data) => api.post(`/reviews/${productId}`, data);
export const updateReviewApi = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReviewApi = (id) => api.delete(`/reviews/${id}`);