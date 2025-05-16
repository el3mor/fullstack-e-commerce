import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ICartItem } from '@/interfaces';
import { addItemToShoppingCart } from '@/utils';
import { toaster } from '@/components/ui/toaster';

const initialState = {
  cartItems: [] as ICartItem[],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = addItemToShoppingCart(action.payload, state.cartItems);

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * (item.quantity ?? 1),
        0,
      );
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      toaster.create({
        title: 'Item removed',
        description: `${item?.title} has been removed from your cart.`,
        type: 'success',
        duration: 3000,
      });
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
      toaster.create({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart.',
        type: 'success',
        duration: 3000,
      });
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity ?? 0) + 1;
      }
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * (item.quantity ?? 1),
        0,
      );
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      }
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * (item.quantity ?? 1),
        0,
      );
    },
    clearCartAfterOrder: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  clearCartAfterOrder,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export default cartSlice.reducer;
