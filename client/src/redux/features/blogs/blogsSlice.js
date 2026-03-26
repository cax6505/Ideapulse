import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogs } from "./blogsAPI";

const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    error: "",
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async ({ tags, search }) => {
    const blogs = await getBlogs(tags, search);
    return blogs;
});

 const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        clearBlogs: (state) => {
            state.blogs = [];
            state.isLoading = false;
            state.isError = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBlogs.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            // Don't clear blogs — keep stale data visible while refreshing
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        });
    
    }
 })

 export const { clearBlogs } = blogsSlice.actions;
 export default blogsSlice.reducer;