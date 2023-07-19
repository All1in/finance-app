import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [], // error now
  tickers: [],
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    updateStocks: (state, action) => {
      state.stocks = action.payload;
    },
    toggleTicker: (state, action) => {
      const ticker = action.payload;
      if (state.tickers.includes(ticker)) {
        state.tickers = state.tickers.filter((t) => t !== ticker);
      } else {
        state.tickers.push(ticker);
      }
    },
  },
});

export const { updateStocks, toggleTicker } = stockSlice.actions;

export default stockSlice.reducer;
