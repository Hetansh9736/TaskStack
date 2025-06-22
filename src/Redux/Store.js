import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice'
import postReducer from './Slices/authSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    post: postReducer,
  },
});
