import { configureStore } from "@reduxjs/toolkit";

import posts from "./slices/postSlice";
import auth from "./slices/authSlice";
import register from "./slices/registerSlice";

export const store = configureStore({
  reducer: { posts, auth, register },
});
