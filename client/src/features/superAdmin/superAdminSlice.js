import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardStatsApi,
  fetchAllBusinessesApi,
  fetchAllUsersApi,
  updateBusinessStatusApi,
} from "./superAdminApi";

const initialState = {
  stats: null,
  recentBusinesses: [],
  recentUsers: [],
  recentServiceRequests: [],
  allBusinesses: [],
  allUsers: [],
  pagination: null,
  loading: false,
  error: null,
  statusUpdateLoading: false,
};

export const fetchDashboardStats = createAsyncThunk(
  "superAdmin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDashboardStatsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllBusinesses = createAsyncThunk(
  "superAdmin/fetchAllBusinesses",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchAllBusinessesApi(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "superAdmin/fetchAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsersApi(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBusinessStatus = createAsyncThunk(
  "superAdmin/updateBusinessStatus",
  async ({ businessId, status, rejectionReason }, { rejectWithValue }) => {
    try {
      const response = await updateBusinessStatusApi(businessId, {
        status,
        rejectionReason,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    clearSuperAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentBusinesses = action.payload.recentBusinesses;
        state.recentUsers = action.payload.recentUsers;
        state.recentServiceRequests = action.payload.recentServiceRequests;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // All Businesses
      .addCase(fetchAllBusinesses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        state.allBusinesses = action.payload.businesses;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Business Status
      .addCase(updateBusinessStatus.pending, (state) => {
        state.statusUpdateLoading = true;
      })
      .addCase(updateBusinessStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        const updated = action.payload.business;
        // Update in recentBusinesses
        state.recentBusinesses = state.recentBusinesses.map((b) =>
          b._id === updated._id ? updated : b
        );
        // Update in allBusinesses
        state.allBusinesses = state.allBusinesses.map((b) =>
          b._id === updated._id ? updated : b
        );
      })
      .addCase(updateBusinessStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuperAdminError } = superAdminSlice.actions;
export default superAdminSlice.reducer;
