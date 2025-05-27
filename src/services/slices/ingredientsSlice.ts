import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[], // тип возвращаемого значения
  void,          // тип аргумента
  { rejectValue: string } // тип payload в случае ошибки
>(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Unknown error');
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    selectIngredients: (state) => state.items,
    selectIngredientsLoading: (state) => state.loading,
    selectIngredientsError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        // Обновляем только если данные изменились
        if (JSON.stringify(state.items) !== JSON.stringify(action.payload)) {
          state.items = action.payload;
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : 'Произошла ошибка при загрузке ингредиентов';
      });
  }
});

// Экспорт селекторов
export const {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
