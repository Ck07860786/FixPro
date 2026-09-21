import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createServiceRequest,
    getMyServiceRequests,
    getBusinessServiceRequests,
    getTechnicianServiceRequests,
    updateRequestStatus,
    cancelServiceRequest,
} from "./serviceRequestApi";

export const submitServiceRequest = createAsyncThunk(
    "serviceRequests/submit",
    async (data, { rejectWithValue }) => {
        try {
            return await createServiceRequest(data);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchMyRequests = createAsyncThunk(
    "serviceRequests/fetchMy",
    async (_, { rejectWithValue }) => {
        try {
            return await getMyServiceRequests();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchBusinessRequests = createAsyncThunk(
    "serviceRequests/fetchBusiness",
    async (businessId, { rejectWithValue }) => {
        try {
            return await getBusinessServiceRequests(businessId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchTechnicianRequests = createAsyncThunk(
    "serviceRequests/fetchTechnician",
    async (_, { rejectWithValue }) => {
        try {
            return await getTechnicianServiceRequests();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const changeRequestStatus = createAsyncThunk(
    "serviceRequests/changeStatus",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await updateRequestStatus(id, data);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const cancelRequest = createAsyncThunk(
    "serviceRequests/cancel",
    async ({ id, reason }, { rejectWithValue }) => {
        try {
            return await cancelServiceRequest(id, reason);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    requests: [],
    loading: false,
    submitting: false,
    error: null,
    successMessage: null,
};

const serviceRequestSlice = createSlice({
    name: "serviceRequests",
    initialState,
    reducers: {
        clearRequestError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitServiceRequest.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(submitServiceRequest.fulfilled, (state, action) => {
                state.submitting = false;
                state.successMessage = action.payload.message;
                if (action.payload.serviceRequest) {
                    state.requests.unshift(action.payload.serviceRequest);
                }
            })
            .addCase(submitServiceRequest.rejected, (state, action) => {
                state.submitting = false;
                state.error = action.payload;
            })

            .addCase(fetchMyRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload.serviceRequests || [];
            })
            .addCase(fetchMyRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchBusinessRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBusinessRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload.serviceRequests || [];
            })
            .addCase(fetchBusinessRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchTechnicianRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTechnicianRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload.serviceRequests || [];
                state.error = null;
            })
            .addCase(fetchTechnicianRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(changeRequestStatus.fulfilled, (state, action) => {
                const updated = action.payload.serviceRequest;
                if (!updated) return;
                const idx = state.requests.findIndex((r) => r._id === updated._id);
                if (idx !== -1) state.requests[idx] = updated;
            })
            .addCase(changeRequestStatus.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(cancelRequest.fulfilled, (state, action) => {
                const updated = action.payload.serviceRequest;
                if (!updated) return;
                const idx = state.requests.findIndex((r) => r._id === updated._id);
                if (idx !== -1) state.requests[idx] = updated;
            })
            .addCase(cancelRequest.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearRequestError, clearSuccessMessage } = serviceRequestSlice.actions;

export default serviceRequestSlice.reducer;
