import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from './ingredientsSlice';

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    try {
      await dispatch(fetchIngredients()).unwrap();
      return true;
    } catch (error) {
      console.error('App initialization failed:', error);
      throw error;
    }
  }
);