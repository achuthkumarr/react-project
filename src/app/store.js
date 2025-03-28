import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../actions/authSlice";


export const store = configureStore({
    reducer: {
      auth: authReducer,
    },
});