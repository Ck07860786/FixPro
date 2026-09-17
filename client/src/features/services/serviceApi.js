import api from "@/services/api";

export const getAllServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get services"
    );
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get Service"
    );
  }
};

export const createService = async (data) => {
  try {
    const response = await api.post("/services/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create service"
    );
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await api.put(`/services/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update Service"
    );
  }
};

export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete service"
    );
  }
};

export const getPublicServices = async (params = {}) => {
  try {
    const response = await api.get("/services/public", { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get services"
    );
  }
};

export const getServiceCategories = async () => {
  try {
    const response = await api.get("/services/public/categories");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get categories"
    );
  }
};