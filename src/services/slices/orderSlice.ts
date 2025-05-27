import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface OrderState {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  isOrderLoading: false,
  error: null
};

// Объявляем getOrderByNumber один раз и экспортируем сразу
export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      if (!response.success) {
        return rejectWithValue('Ошибка при получении заказа');
      }
      return response.orders[0];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientsIds);
      if (!response.success) {
        return rejectWithValue('Ошибка при создании заказа');
      }
      return response.order;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderLoading: (state) => state.isOrderLoading,
    selectOrderError: (state) => state.error
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.isOrderLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.isOrderLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Экспортируем только то, что нужно
export const { clearOrder } = orderSlice.actions;
export const { selectOrder, selectOrderLoading, selectOrderError } = orderSlice.selectors;
export default orderSlice.reducer;