import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moviesReducer from "../features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // registers authReducer under the auth key in the golal state
    movies: moviesReducer
  }
});