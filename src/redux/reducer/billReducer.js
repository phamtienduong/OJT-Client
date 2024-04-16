import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    bills: []
}
const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const billReducer = billSlice.reducer;