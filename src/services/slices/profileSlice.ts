import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IProfileState {
  orders: TOrder[];
}

const initialState: IProfileState = {
  orders: []
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  }
});

export const { setProfileOrders } = profileSlice.actions;
export default profileSlice.reducer;