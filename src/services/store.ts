import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredientsReducer from './slices/ingredientsSlice';
//import constructorReducer from './slices/constructorSlice';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import { TIngredient } from '../utils/types';
import appSlice from './slices/appSlice';
import appReducer from './slices/appSlice';
import { constructorActions, constructorReducer } from '../services/slices/constructorSlice';
// Типы для начальных состояний каждого редьюсера
const initialIngredientsState = {
  items: [],
  loading: false,
  error: null
};

const initialConstructorState = {
  bun: null,
  ingredients: []
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
  app: appSlice,
  //ingredients: getSafeReducer(ingredientsReducer, initialIngredientsState),
  //constructor: getSafeReducer(constructorReducer, initialConstructorState),
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
  auth: authReducer,
  feed: feedReducer,
  order: orderReducer,

};

const store = configureStore({
  reducer: rootReducer
});

// Расширенные типы для TypeScript
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch;

// Оптимизированные хуки для использования в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*// Экспорт для тестирования
export const initialStates = {
  ingredients: initialIngredientsState,
  //constructor: initialConstructorState,
  auth: initialAuthState,
  feed: initialFeedState,
  order: initialOrderState
};
*/
export default store;