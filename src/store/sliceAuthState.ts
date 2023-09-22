import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCustomerFunc } from '../util';

export const getIfAuthThunk = createAsyncThunk('ifAuth/getIfAuth', async () =>
  getCustomerFunc()
    .then(() => true)
    .catch(() => {
      return false;
    }),
);

const ifAuthSlice = createSlice({
  name: 'ifAuth',
  initialState: {
    ifAuth: false,
  },
  reducers: {
    login(state) {
      state.ifAuth = true;
    },
    logout(state) {
      localStorage.clear();
      state.ifAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIfAuthThunk.fulfilled, (state, action) => {
      state.ifAuth = action.payload;
    });
  },
});

export const { login, logout } = ifAuthSlice.actions;
export default ifAuthSlice.reducer;
