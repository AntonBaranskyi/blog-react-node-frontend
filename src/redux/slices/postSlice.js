import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  const responce = axios.get("/posts");

  return await responce;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const responce = axios.delete(`/posts/${id}`);

  return await responce;
});
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = "loading";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload.data;
      state.posts.status = "succes";
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    });

    builder.addCase(deletePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    });
  },
});

export default postSlice.reducer;
