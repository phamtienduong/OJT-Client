import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: []
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const productReducer = productSlice.reducer;