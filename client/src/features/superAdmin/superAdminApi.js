import api from "@/services/api";

export const fetchDashboardStatsApi = async () => {
  try {
    const response = await api.get("/super-admin/stats");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard stats"
    );
  }
};

export const fetchAllBusinessesApi = async (params = {}) => {
  try {
    const response = await api.get("/super-admin/businesses", { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch businesses"
    );
  }
};

export const fetchAllUsersApi = async (params = {}) => {
  try {
    const response = await api.get("/super-admin/users", { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch users"
    );
  }
};

export const updateBusinessStatusApi = async (businessId, data) => {
  try {
    const response = await api.patch(
      `/super-admin/businesses/${businessId}/status`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update business status"
    );
  }
};
