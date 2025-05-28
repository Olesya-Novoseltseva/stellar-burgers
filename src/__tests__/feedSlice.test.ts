import { expect, test, describe } from '@jest/globals';
import userOrderSliceReducer, {
  fetchFeeds,
  IFeedState
} from '../services/slices/feedSlice';

describe('userOrderSlice extraReducers', () => {
  const initialState: IFeedState = {
    isLoading: false,
    orders: [],
    error: null
  };

  test('fetchUserOrders.pending', () => {
    const actualState = userOrderSliceReducer(
      { ...initialState },
      fetchFeeds.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('fetchUserOrders.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userOrderSliceReducer(
      { ...initialState },
      fetchFeeds.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('fetchUserOrders.fulfilled', () => {
    const mockOrder = {
      _id: '662d4ca297ede0001d067d8c',
      id: '662d4ca297ede0001d067d8c',
      name: 'Флюоресцентный люминесцентный бургер',
      status: 'done',
      createdAt: '2025-05-28T03:18:10.871Z',
      updatedAt: '2025-05-28T03:18:11.442Z',
      number: 79183,
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d']
    };
    const actualState = userOrderSliceReducer(
      {
        ...initialState
      },
      fetchFeeds.fulfilled([mockOrder], '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.orders).toEqual([mockOrder]);
  });
});