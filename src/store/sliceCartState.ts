import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createCart, defaultCart, getCart } from '../util';

export const getCartThunk = createAsyncThunk('cart/getCart', async () =>
  getCart()
    .then((res) => res)
    .catch(async () => {
      try {
        const res = await createCart();
        return res;
      } catch (e) {
        return defaultCart;
      }
    }),
);

const changeCartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: defaultCart,
  },
  reducers: {
    changeCart(
      state,
      action: PayloadAction<{
        cart: Cart;
      }>,
    ) {
      state.cart = action.payload.cart;
    },
    clearCart(state) {
      state.cart = defaultCart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { changeCart, clearCart } = changeCartSlice.actions;
export default changeCartSlice.reducer;
