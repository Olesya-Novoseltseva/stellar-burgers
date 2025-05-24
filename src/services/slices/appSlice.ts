import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from './ingredientsSlice';

interface AppState {
  isInitialized: boolean;
  initError: string | null;
}

const initialState: AppState = {
  isInitialized: false,
  initError: null
};

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    try {
      await dispatch(fetchIngredients()).unwrap();
      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.initError = null;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.initError = action.error.message || 'Initialization failed';
      });
  }
});

export default appSlice.reducer;