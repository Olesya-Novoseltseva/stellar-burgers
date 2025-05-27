import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { RootState } from '../store';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IConstructorState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: {
        reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.burgerConstructor.bun = action.payload;
        },
        prepare: (ingredient: TIngredient) => ({
            payload: {
                id: uuidv4(),
                ...ingredient,
            } as TConstructorIngredient
        })
    },

    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          id: uuidv4(),
          _id: ingredient._id,
          name: ingredient.name,
          type: ingredient.type,
          proteins: ingredient.proteins,
          fat: ingredient.fat,
          carbohydrates: ingredient.carbohydrates,
          calories: ingredient.calories,
          price: ingredient.price,
          image: ingredient.image,
          image_mobile: ingredient.image_mobile,
          image_large: ingredient.image_large
        } as TConstructorIngredient
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients = state.burgerConstructor.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    clearConstructor: (state) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.burgerConstructor.ingredients.length) {
        const array = state.burgerConstructor.ingredients;
        array.splice(index - 1, 0, array.splice(index, 1)[0]);
      }
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.burgerConstructor.ingredients.length - 1) {
        const array = state.burgerConstructor.ingredients;
        array.splice(index + 1, 0, array.splice(index, 1)[0]);
      }
    }
  }
});

export const burgerConstructorSelector = (state: RootState) =>
  state.constructor.burgerConstructor;

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
export const constructorActions = constructorSlice.actions;
