import { ProductInterface } from '@/interfaces/intex';
import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cartItems: ProductInterface[];
  cartTotal: number;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotal: 0,
  } as CartState,
  reducers: {
    AddProductToCart: (
      state,
      action: { type: string; payload: ProductInterface }
    ) => {
      state.cartItems.push(action.payload);
    },
    RemoveProductFromCart: (
      state,
      action: { type: string; payload: ProductInterface }
    ) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { AddProductToCart, RemoveProductFromCart } = cartSlice.actions;
