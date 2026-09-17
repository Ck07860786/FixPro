import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getAllTechnicians,
  getTechnicianById,
  createTechnician,
  updateTechnician,
  deleteTechnician,
} from "./technicianApi";

export const fetchTechnicians = createAsyncThunk(
  "technicians/fetchTechnicians",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllTechnicians();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTechnicianById = createAsyncThunk(
  "technicians/fetchTechnicianById",
  async (id, { rejectWithValue }) => {
    try {
      return await getTechnicianById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTechnician = createAsyncThunk(
  "technicians/addTechnician",
  async (data, { rejectWithValue }) => {
    try {
      return await createTechnician(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTechnician = createAsyncThunk(
  "technicians/editTechnician",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateTechnician(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTechnician = createAsyncThunk(
  "technicians/removeTechnician",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTechnician(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  technicians: [],
  selectedTechnician: null,

  loading: false,
  error: null,

  creating: false,
  updating: false,
  deleting: false,
  lastCreatedCredentials: null,
};

const technicianSlice = createSlice({
  name: "technicians",

  initialState,

  reducers: {
    clearTechnicianError: (state) => {
      state.error = null;
    },

    clearSelectedTechnician: (state) => {
      state.selectedTechnician = null;
    },

    clearCreatedCredentials: (state) => {
      state.lastCreatedCredentials = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnicians.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTechnicians.fulfilled, (state, action) => {
        state.loading = false;
        state.technicians = action.payload.technicians || [];
      })

      .addCase(fetchTechnicians.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTechnicianById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTechnicianById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTechnician = action.payload.technician;
      })

      .addCase(fetchTechnicianById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTechnician.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.lastCreatedCredentials = null;
      })

      .addCase(addTechnician.fulfilled, (state, action) => {
        state.creating = false;

        const newTech = action.payload.technician;
        if (newTech) {
          state.technicians.unshift(newTech);
        }
        state.lastCreatedCredentials = {
          name: newTech?.name,
          email: newTech?.email,
          tempPassword: action.payload.tempPassword,
        };
      })

      .addCase(addTechnician.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      .addCase(editTechnician.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(editTechnician.fulfilled, (state, action) => {
        state.updating = false;

        const updated = action.payload.technician;
        if (!updated) return;

        const index = state.technicians.findIndex(
          (t) => t._id === updated._id
        );

        if (index !== -1) {
          state.technicians[index] = updated;
        }

        if (state.selectedTechnician?._id === updated._id) {
          state.selectedTechnician = updated;
        }
      })

      .addCase(editTechnician.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      .addCase(removeTechnician.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })

      .addCase(removeTechnician.fulfilled, (state, action) => {
        state.deleting = false;

        const deletedId = action.meta.arg;
        const index = state.technicians.findIndex(
          (t) => t._id === deletedId
        );

        if (index !== -1) {
          state.technicians[index] = {
            ...state.technicians[index],
            isActive: false,
            userIsActive: false,
          };
        }

        if (state.selectedTechnician?._id === deletedId) {
          state.selectedTechnician = null;
        }
      })

      .addCase(removeTechnician.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearTechnicianError,
  clearSelectedTechnician,
  clearCreatedCredentials,
} = technicianSlice.actions;

export default technicianSlice.reducer;
