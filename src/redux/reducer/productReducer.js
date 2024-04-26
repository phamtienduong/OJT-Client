import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi } from "../../apis/products";

const initialState = {
    products: [],
    keyword: "",
    reLoad: false,
}

export const getAllProducts = createAsyncThunk(
    "products",
    async (query) => {
        const res = await getAllProductsApi(query);
        return res.data;
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSearchKey: (state, action) => {
            state.keyword = action.payload;
        },
        setReload: (state, action) => {
            state.reLoad = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = [...action.payload]
            })
    }
})
export const { setSearchKey, setReload } = productSlice.actions;
export const productReducer = productSlice.reducer;