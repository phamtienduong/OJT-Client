import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";
import { billReducer } from "./reducer/billReducer";
import { reviewReducer } from "./reducer/reviewReducer";

export const store = configureStore({
    reducer: {
        productReducer,
        cartReducer,
        billReducer,
        reviewReducer
    }
})