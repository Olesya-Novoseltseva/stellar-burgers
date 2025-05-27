import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import ingredientsReducer from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import appReducer from './slices/appSlice';

export const rootReducer = combineReducers({
  app: appReducer,
  constructor: constructorReducer,
  ingredients: ingredientsReducer,
  auth: authReducer,
  feed: feedReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          'meta.arg',
          'meta.baseQueryMeta',
          'meta.requestId',
          'meta.abortSignal'
        ],
        ignoredPaths: ['constructor.burgerConstructor.ingredients']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, any>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
