import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotes: [],
  categories: [],
  favorites: []
};

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    setCategory: (state, action) => {
      const categorizedQuotes = state.quotes.filter((quote) => {
        return quote?.category === action.payload;
      });

      state.categories = categorizedQuotes;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const newFav = [];
      newFav.push(action.payload);

      state.favorites = [state.favorites, ...newFav];
    },
    removeFavorite: (state, action) => {
      const quoteId = action.payload.id;

      state.favorites = state.favorites?.filter((quote) => {
        return quote.id !== quoteId;
      });
    }
  }
});

export const {
  setQuotes,
  setFavorites,
  addFavorite,
  removeFavorite,
  setCategory
} = quotesSlice.actions;

export default quotesSlice.reducer;
