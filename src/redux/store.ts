import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { cartSlice } from './cartSlice';

let inicialCartItems = [];

if (typeof window !== 'undefined') {
  inicialCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
}

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState: {
    cart: {
      cartItems: inicialCartItems,
      cartTotal: 0,
    },
  },
});

export default store;
