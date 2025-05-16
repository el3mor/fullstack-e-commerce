import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDrawerOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});
export const { toggleDrawer, closeDrawer } = globalSlice.actions;
export default globalSlice.reducer;
