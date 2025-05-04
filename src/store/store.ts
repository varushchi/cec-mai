// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import modalReducer from './slices/ModalSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;