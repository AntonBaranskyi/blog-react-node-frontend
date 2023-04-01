import { configureStore } from "@reduxjs/toolkit";

import posts from "./slices/postSlice";
import auth from "./slices/authSlice";


export const store = configureStore({
  reducer: { posts, auth },
});
