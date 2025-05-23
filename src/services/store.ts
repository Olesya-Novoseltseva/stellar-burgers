import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';

// Типы для начальных состояний каждого редьюсера
const initialIngredientsState = {
  items: [],
  loading: false,
  error: null
};

const initialConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

const initialAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

const initialFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null
};

const initialOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Функции для безопасного получения редьюсеров
const getSafeReducer = <T>(reducer: any, initialState: T) => {
  return (state: T | undefined, action: any) => {
    if (state === undefined) {
      return initialState;
    }
    return reducer(state, action);
  };
};

const rootReducer = {
  ingredients: getSafeReducer(ingredientsReducer, initialIngredientsState),
  constructor: getSafeReducer(constructorReducer, initialConstructorState),
  auth: getSafeReducer(authReducer, initialAuthState),
  feed: getSafeReducer(feedReducer, initialFeedState),
  order: getSafeReducer(orderReducer, initialOrderState)
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        warnAfter: 100 // Оптимизация для больших стейтов
      }
    })
});

// Расширенные типы для TypeScript
export type RootState = ReturnType<typeof store.getState> & {
  // Гарантируем, что все состояния всегда будут определены
  ingredients: typeof initialIngredientsState;
  constructor: typeof initialConstructorState;
  auth: typeof initialAuthState;
  feed: typeof initialFeedState;
  order: typeof initialOrderState;
};

export type AppDispatch = typeof store.dispatch;

// Оптимизированные хуки для использования в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Экспорт для тестирования
export const initialStates = {
  ingredients: initialIngredientsState,
  constructor: initialConstructorState,
  auth: initialAuthState,
  feed: initialFeedState,
  order: initialOrderState
};

export default store;