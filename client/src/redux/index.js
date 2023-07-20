import stockReducer from "./stockReducer/stockSlice";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
      stocks: stockReducer,
    },
});
