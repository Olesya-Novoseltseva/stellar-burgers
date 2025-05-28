import { expect, test, describe } from '@jest/globals';
import orderSliceReducer, {
  fetchOrders,
  getOrderByNumber,
  OrderState
} from '../services/slices/orderSlice';

describe('orderSlice extraReducers', () => {
  const initialState: OrderState = {
    isFeedLoading: false,
    isShownLoading: false,
    feedOrders: [],
    shownOrders: [],
    error: null,
    total: null,
    totalToday: null,
    orderStatus: ''
  };

  test('fetchOrders.pending', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      fetchOrders.pending('')
    );
    expect(actualState.isFeedLoading).toBe(true);
  });

  test('fetchOrders.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = orderSliceReducer(
      { ...initialState },
      fetchOrders.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isFeedLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('fetchOrders.fulfilled', () => {
    const mockOrdersData = {
      orders: [
        {
          _id: '662d4ca297ede0001d067d8c',
          id: '662d4ca297ede0001d067d8c',
          name: 'Флюоресцентный люминесцентный бургер',
          status: 'done',
          createdAt: '2025-05-28T03:18:10.871Z',
          updatedAt: '2025-05-28T03:18:11.442Z',
          number: 79183,
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d']
        }
      ],
      total: 78952,
      totalToday: 204
    };
    const actualState = orderSliceReducer(
      {
        ...initialState
      },
      fetchOrders.fulfilled(mockOrdersData, '')
    );
    expect(actualState.isFeedLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.feedOrders).toEqual(mockOrdersData.orders);
    expect(actualState.total).toEqual(mockOrdersData.total);
    expect(actualState.totalToday).toEqual(mockOrdersData.totalToday);
  });

  test('getOrderByNumberThunk.pending', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumber.pending('', 79183)
    );
    expect(actualState.isShownLoading).toBe(true);
  });

  test('getOrderByNumberThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumber.rejected(new Error(errorMessage), '', 79183)
    );
    expect(actualState.isShownLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('getOrderByNumberThunk.fulfilled', () => {
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
    const actualState = orderSliceReducer(
      {
        ...initialState
      },
      getOrderByNumber.fulfilled([mockOrder], '', 79183)
    );
    expect(actualState.isShownLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.shownOrders).toEqual([mockOrder]);
    expect(actualState.orderStatus).toEqual(mockOrder.status);
  });
});