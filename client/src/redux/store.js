import { apiSlice } from "./features/apiSlices/apiSlice"
import modeReducer from "./features/slices/modeSlice"
import productReducer from "./features/slices/productSlice"
import bookingReducer from "./features/slices/bookings"
import customerReducer from "./features/slices/customer"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        mode: modeReducer,
        product:productReducer,
        booking:bookingReducer,
        customer:customerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;