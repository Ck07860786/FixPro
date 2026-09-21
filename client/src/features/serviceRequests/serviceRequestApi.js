import api from "@/services/api";

export const createServiceRequest = async (data) => {
    const response = await api.post("/service-requests", data);
    return response.data;
};

export const getMyServiceRequests = async () => {
    const response = await api.get("/service-requests/my");
    return response.data;
};

export const getTechnicianServiceRequests = async () => {
    const response = await api.get("/service-requests/technician");
    return response.data;
};

export const getBusinessServiceRequests = async (businessId) => {
    const response = await api.get(`/service-requests/business/${businessId}`);
    return response.data;
};

export const getServiceRequestById = async (id) => {
    const response = await api.get(`/service-requests/${id}`);
    return response.data;
};

export const updateRequestStatus = async (id, data) => {
    const response = await api.put(`/service-requests/${id}/status`, data);
    return response.data;
};

export const cancelServiceRequest = async (id, reason) => {
    const response = await api.put(`/service-requests/${id}/cancel`, {
        cancellationReason: reason,
    });
    return response.data;
};
