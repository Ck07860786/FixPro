import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import serviceReducer from '../features/services/serviceSlice'
import technicianReducer from '../features/technicians/technicianSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        services: serviceReducer,
        technicians: technicianReducer,
    }
});