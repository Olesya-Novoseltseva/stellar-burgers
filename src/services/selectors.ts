import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { TConstructorIngredient, TIngredient } from '@utils-types';

/*const DEFAULT_CONSTRUCTOR_STATE = {
  items: {
    bun: null as TConstructorIngredient | null,
    ingredients: [] as TConstructorIngredient[]
  }
};

const DEFAULT_INGREDIENTS_STATE = {
  items: [] as TIngredient[],
  loading: false,
  error: null as string | null
};*/

// Полные дефолтные состояния для всех разделов хранилища
const DEFAULT_STATES = {
  constructor: {
    items: {
      bun: null as TConstructorIngredient | null,
      ingredients: [] as TConstructorIngredient[]
    }
  },
  ingredients: {
    items: [] as TIngredient[],
    loading: false,
    error: null as string | null
  },
  order: {
    orderRequest: false,
    orderModalData: null as any,
    error: null as string | null
  },
  feed: {
    orders: [] as any[],
    total: 0,
    totalToday: 0,
    currentOrder: null as any
  }
};


// Базовые селекторы с защитой от undefined
export const selectConstructorState = (state: RootState) => 
  state.constructor ?? DEFAULT_STATES.constructor;

export const selectOrderState = (state: RootState) => 
  state.order ?? DEFAULT_STATES.order;

export const selectIngredientsState = (state: RootState) => 
  state.ingredients ?? DEFAULT_STATES.ingredients;

export const selectFeedState = (state: RootState) => 
  state.feed ?? DEFAULT_STATES.feed;

export const selectAppInitialized = (state: RootState) => state.app.isInitialized;
export const selectAppInitError = (state: RootState) => state.app.initError;
// Оптимизированные селекторы для конструктора
// Полностью безопасные селекторы для конструктора
const EMPTY_CONSTRUCTOR = { bun: null, ingredients: [] };

export const selectConstructorItems = createSelector(
  (state: RootState) => state.selected,
  (selected) => selected ?? EMPTY_CONSTRUCTOR
);

export const selectBun = createSelector(
  [selectConstructorState],
  (constructor) => constructor?.items?.bun ?? null
);

export const selectIngredients = createSelector(
  [selectConstructorState],
  (constructor) => constructor?.items?.ingredients ?? []
);

export const selectTotalPrice = createSelector(
  [selectBun, selectIngredients],
  (bun, ingredients) => {
    const bunPrice = bun?.price ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + (item?.price ?? 0),
      0
    );
    return bunPrice + ingredientsPrice;
  }
);

// Селекторы для ингредиентов
export const selectAllIngredients = createSelector(
  [selectIngredientsState],
  (ingredients) => ingredients?.items || []
);

export const selectBuns = createSelector(
  [selectAllIngredients],
  (ingredients) => ingredients.filter((item: TIngredient) => item.type === 'bun')
);

export const selectMains = createSelector(
  [selectAllIngredients],
  (ingredients) => ingredients.filter((item: TIngredient) => item.type === 'main')
);

export const selectSauces = createSelector(
  [selectAllIngredients],
  (ingredients) => ingredients.filter((item: TIngredient) => item.type === 'sauce')
);

export const selectIngredientById = createSelector(
  [selectAllIngredients, (_, id: string) => id],
  (ingredients, id) => ingredients.find((item: TIngredient) => item._id === id)
);

export const selectIngredientsLoading = (state: RootState) => 
  selectIngredientsState(state).loading;

export const selectIngredientsError = (state: RootState) => 
  selectIngredientsState(state).error;

// Селекторы для заказов
export const selectOrderDetails = createSelector(
  [selectOrderState],
  (order) => ({
    orderRequest: order.orderRequest,
    orderModalData: order.orderModalData,
    error: order.error
  })
);

export const selectFeedOrders = createSelector(
  [selectFeedState],
  (feed) => feed.orders
);

export const selectCurrentOrder = createSelector(
  [selectFeedState],
  (feed) => feed.currentOrder
);