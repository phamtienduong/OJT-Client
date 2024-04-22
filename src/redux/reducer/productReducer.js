import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    keyword: "",
    reLoad: false,
}
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

    }
})
export const { setSearchKey, setReload } = productSlice.actions;
export const productReducer = productSlice.reducer;