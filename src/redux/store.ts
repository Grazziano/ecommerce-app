import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { cartSlice } from './cartSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
