import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{orders: TOrder[], total: number, totalToday: number}>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setCurrentOrder: (state, action: PayloadAction<TOrder>) => {
      state.currentOrder = action.payload;
    }
  }
});

export const { setOrders, setCurrentOrder } = feedSlice.actions;
export default feedSlice.reducer;