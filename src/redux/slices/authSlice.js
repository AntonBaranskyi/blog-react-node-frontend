import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return await data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");

  return await data;
});

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);

    return await data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state) => {
      state.data = null;
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

    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.status = "succes";
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = "error";
      state.auth = null;
    });

    //register
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchRegister.fulfilled, (state, actions) => {
      state.data = actions.payload;
      state.status = "succes";
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { onLogout } = authSlice.actions;
export default authSlice.reducer;
