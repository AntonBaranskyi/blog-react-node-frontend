import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios";

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

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

export const selectIsRegister = (state) => Boolean(state.register.data);
export default registerSlice.reducer;
