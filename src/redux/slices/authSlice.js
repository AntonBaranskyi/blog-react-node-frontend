import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return await data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state) => {
      state.data = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.status = "succes";
    });

    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = "error";
      state.auth = null;
    });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { onLogout } = authSlice.actions;
export default authSlice.reducer;
