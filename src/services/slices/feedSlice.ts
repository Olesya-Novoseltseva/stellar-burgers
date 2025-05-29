import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

export interface IFeedState {
  isLoading: boolean;
  orders: TOrder[];
  error: string | null;
}

export const initialState: IFeedState = {
  isLoading: false,
  orders: [],
  error: null
};

export const fetchFeeds = createAsyncThunk<TOrder[]>(
  'orders/getOrdersApi',
  async () => {
    const result = await getOrdersApi();
    return result;
  }
);

const feedSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      });
  },
  selectors: {
    getUserOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading
  }
});

export default feedSlice.reducer;
export const { getUserOrders, getIsLoading } = feedSlice.selectors;