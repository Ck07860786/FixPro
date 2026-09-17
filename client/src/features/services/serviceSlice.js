import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "./serviceApi";



export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllServices();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchServiceById = createAsyncThunk(
  "services/fetchServiceById",
  async (id, { rejectWithValue }) => {
    try {
      return await getServiceById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const addService = createAsyncThunk(
  "services/addService",
  async (data, { rejectWithValue }) => {
    try {
      return await createService(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const editService = createAsyncThunk(
  "services/editService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateService(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const removeService = createAsyncThunk(
  "services/removeService",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteService(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const initialState = {
  services: [],
  selectedService: null,

  loading: false,
  error: null,

  creating: false,
  updating: false,
  deleting: false,
};


const serviceSlice = createSlice({
  name: "services",

  initialState,

  reducers: {
    clearServiceError: (state) => {
      state.error = null;
    },

    clearSelectedService: (state) => {
      state.selectedService = null;
    },
  },

  extraReducers: (builder) => {
    builder


      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;

        state.services =
          action.payload.services || [];
      })

      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })    
      .addCase(
        fetchServiceById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchServiceById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.selectedService =
            action.payload.service;
        }
      )

      .addCase(
        fetchServiceById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(addService.pending, (state) => {
        state.creating = true;
        state.error = null;
      })

      .addCase(addService.fulfilled, (state, action) => {
        state.creating = false;

        const newService =
          action.payload.service;

        if (newService) {
          state.services.push(newService);
        }
      })

      .addCase(addService.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })      .addCase(editService.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(
        editService.fulfilled,
        (state, action) => {
          state.updating = false;

          const updatedService =
            action.payload.service;

          if (!updatedService) return;

          const index = state.services.findIndex(
            (service) =>
              service._id === updatedService._id
          );

          if (index !== -1) {
            state.services[index] =
              updatedService;
          }

          if (
            state.selectedService?._id ===
            updatedService._id
          ) {
            state.selectedService =
              updatedService;
          }
        }
      )

      .addCase(
        editService.rejected,
        (state, action) => {
          state.updating = false;
          state.error = action.payload;
        }
      )      .addCase(removeService.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })

      .addCase(
        removeService.fulfilled,
        (state, action) => {
          state.deleting = false;

          const deletedId =
            action.meta.arg;

          state.services =
            state.services.filter(
              (service) =>
                service._id !== deletedId
            );

          if (
            state.selectedService?._id ===
            deletedId
          ) {
            state.selectedService = null;
          }
        }
      )

      .addCase(
        removeService.rejected,
        (state, action) => {
          state.deleting = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearServiceError,
  clearSelectedService,
} = serviceSlice.actions;

export default serviceSlice.reducer;