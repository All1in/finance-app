import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    updateStocks: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateStocks } = stockSlice.actions;

export default stockSlice.reducer;
