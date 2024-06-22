
import { configureStore } from '@reduxjs/toolkit';
import mapSlice from '../mapscreen/mapSlice';

export const store = configureStore({
  reducer: {
    mapSlice: mapSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

