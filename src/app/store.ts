import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';
import registerSlice from './features/registerSlice';
import cartSlice from './features/cartSlice';
import globalSlice from './features/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsSlice } from './services/productsSlice';
import { categoriesSlice } from './services/categoiresSlice';
import { ordersSlice } from './services/ordersSlice';
const persistCartConfig = {
  key: 'cart',
  storage,
};
const persistedCartReducer = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    cart: persistedCartReducer,
    global: globalSlice,
    [productsSlice.reducerPath]: productsSlice.reducer,
    [categoriesSlice.reducerPath]: categoriesSlice.reducer,
    [ordersSlice.reducerPath]: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productsSlice.middleware, categoriesSlice.middleware, ordersSlice.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
