import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import { api } from "../services/api";
import UserReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
