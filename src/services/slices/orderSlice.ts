import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientsIds);
      if (response.success) return response.order;
      return rejectWithValue('Ошибка при создании заказа');
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModal: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetOrderModal } = orderSlice.actions;
export default orderSlice.reducer;