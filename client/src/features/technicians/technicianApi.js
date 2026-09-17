import api from "@/services/api";

export const getAllTechnicians = async () => {
  try {
    const response = await api.get("/technicians");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get technicians"
    );
  }
};

export const getTechnicianById = async (id) => {
  try {
    const response = await api.get(`/technicians/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get technician"
    );
  }
};

export const createTechnician = async (data) => {
  try {
    const response = await api.post("/technicians", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add technician"
    );
  }
};

export const updateTechnician = async (id, data) => {
  try {
    const response = await api.put(`/technicians/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update technician"
    );
  }
};

export const deleteTechnician = async (id) => {
  try {
    const response = await api.delete(`/technicians/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete technician"
    );
  }
};
