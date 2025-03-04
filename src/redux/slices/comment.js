import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk("comments/fetchComments", 
    async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/${postId}/comments`);
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки комментариев");
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
