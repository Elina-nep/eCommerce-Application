import { Category } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCategories } from '../util';

interface categoryState {
  categories: Category[];
}

export const getCategoriesThunk = createAsyncThunk(
  'categories/getCategories',
  async () =>
    getCategories()
      .then((res) => res.results)
      .catch(async () => {
        localStorage.clear();
        const res = await getCategories();
        return res.results;
      }),
);
const initialState: categoryState = { categories: [] };

const changeCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    changeCategories(state, action: PayloadAction<categoryState>) {
      state.categories = action.payload.categories;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { changeCategories } = changeCategoriesSlice.actions;
export default changeCategoriesSlice.reducer;
