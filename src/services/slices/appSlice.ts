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
      // Добавляем проверку на ошибку и сериализуемый результат
      const result = await dispatch(fetchIngredients()).unwrap();
      return { success: true, data: result }; // Возвращаем простой объект
    } catch (error) {
      // Гарантируем, что ошибка будет сериализуемой
      const message = error instanceof Error 
        ? error.message 
        : 'Неизвестная ошибка инициализации';
      throw new Error(message);
    }
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetApp: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isInitialized = false;
        state.initError = null;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.isInitialized = false;
        // Убедимся, что используем только сериализуемые данные
        state.initError = action.error.message || 'Ошибка инициализации';
      });
  },
  selectors: {
    selectIsInitialized: (state) => state.isInitialized,
    selectInitError: (state) => state.initError
  }
});

export const { resetApp } = appSlice.actions;
export const { selectIsInitialized, selectInitError } = appSlice.selectors;
export default appSlice.reducer;