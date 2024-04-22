import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    reviews: []
}
const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const reviewReducer = reviewSlice.reducer;