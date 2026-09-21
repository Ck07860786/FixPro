import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerCustomer, registerBusiness, loginUser, changePassword } from "./authApi";
import { updateTechnicianStatusApi } from "@/features/technicians/technicianApi";

const savedAuth = JSON.parse(
  localStorage.getItem("fixpro-auth")
);
const initialState = savedAuth || {
  user: null,
  business: null,
  technician: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const customerSignup = createAsyncThunk(
  "auth/customerSignup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerCustomer(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const businessSignup = createAsyncThunk(
  "auth/businessSignup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerBusiness(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await changePassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTechnicianAvailability = createAsyncThunk(
  "auth/updateTechnicianAvailability",
  async (status, { rejectWithValue }) => {
    try {
      const response = await updateTechnicianStatusApi(status);
      return { status, technician: response.technician };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.business = null;
      state.technician = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("fixpro-auth");
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    setTechnicianAvailabilityStatus: (state, action) => {
      if (state.technician) {
        state.technician.availabilityStatus = action.payload;
        const saved = JSON.parse(localStorage.getItem("fixpro-auth") || "{}");
        if (saved.technician) {
          saved.technician.availabilityStatus = action.payload;
          localStorage.setItem("fixpro-auth", JSON.stringify(saved));
        }
      }
    },
  },

  extraReducers: (builder) => {    builder
      .addCase(customerSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(customerSignup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(customerSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });    builder
      .addCase(businessSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(businessSignup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(businessSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.business = action.payload.business;
        state.technician = action.payload.technician || null;
        state.accessToken = action.payload.accessToken;

        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem(
          "fixpro-auth",
          JSON.stringify({
            user: state.user,
            business: state.business,
            technician: state.technician,
            accessToken: state.accessToken,
            isAuthenticated: true,
          })
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTechnicianAvailability.fulfilled, (state, action) => {
        if (state.technician) {
          state.technician.availabilityStatus = action.payload.status;
          const saved = JSON.parse(localStorage.getItem("fixpro-auth") || "{}");
          if (saved.technician) {
            saved.technician.availabilityStatus = action.payload.status;
            localStorage.setItem("fixpro-auth", JSON.stringify(saved));
          }
        }
      });
  },
});

export const { logout, clearAuthError, setTechnicianAvailabilityStatus } = authSlice.actions;

export default authSlice.reducer;
