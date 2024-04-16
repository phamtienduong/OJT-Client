import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const cartReducer = cartSlice.reducer;