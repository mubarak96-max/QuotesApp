import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotes: [],
  favorites: []
};

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = action.payload;
    },
    removeFavorite: (state, action) => {
      state.favorites = action.payload;
    }
  }
});

export const { setQuotes, addFavorite, removeFavorite } = quotesSlice.actions;

export default quotesSlice.reducer;
