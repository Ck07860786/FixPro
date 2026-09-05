import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerCustomer, registerBusiness, loginUser } from "./authApi";

const savedAuth = JSON.parse(
  localStorage.getItem("fixpro-auth")
);
const initialState = savedAuth || {
  user: null,
  business: null,
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

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.business = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      
       localStorage.removeItem("fixpro-auth");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // CUSTOMER SIGNUP
    builder
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
      });

    // BUSINESS SIGNUP
    builder
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
      });

    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.business = action.payload.business;
        state.accessToken = action.payload.accessToken;

        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem(
    "fixpro-auth",
    JSON.stringify({
      user: state.user,
      business: state.business,
      accessToken: state.accessToken,
      isAuthenticated: true,
    })
  );
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
