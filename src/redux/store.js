import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";
import { billReducer } from "./reducer/billReducer";

export const store = configureStore({
    reducer: {
        productReducer,
        cartReducer,
        billReducer
    }
})