import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicAxios from "../../config/publicAxios";

export const getCart = createAsyncThunk("cart/getCart", async (id) => {
    const result = await publicAxios.get(`/api/v1/cart/list/${id}`);
    return result.data;
});

const initialState = {
    cart: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload;
        });
    }
})

export const cartReducer = cartSlice.reducer;