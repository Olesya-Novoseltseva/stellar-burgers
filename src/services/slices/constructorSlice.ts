import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
    burgerConstructor: {
      bun: TIngredient | null;
      ingredients: TConstructorIngredient[];
    };
    
}

export const initialState: IConstructorState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    }
};

const createConstructorIngredient = (ingredient: TIngredient): TConstructorIngredient => ({
  ...ingredient,
  id: `${ingredient._id}-${Date.now()}`
});

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state) => state.burgerConstructor
  },
  reducers: {
    addBun: (state: Draft<IConstructorState>, action: PayloadAction<TIngredient>) => {
      state.burgerConstructor.bun = action.payload;
    },
    addIngredient: (state, action) => {
      if (!state.burgerConstructor.ingredients) {
        state.burgerConstructor.ingredients = [];
      }
      state.burgerConstructor.ingredients.push(createConstructorIngredient(action.payload));
    },
    removeIngredient: (state: Draft<IConstructorState>, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients = state.burgerConstructor.ingredients.filter(item => item.id !== action.payload);
    },
    clearConstructor: (state: Draft<IConstructorState>) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
      
    },
    moveIngredientUp: (state: Draft<IConstructorState>, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.burgerConstructor.ingredients.length) {
        const newIngredients = [...state.burgerConstructor.ingredients];
        [newIngredients[index - 1], newIngredients[index]] = 
          [newIngredients[index], newIngredients[index - 1]];
        state.burgerConstructor.ingredients = newIngredients;
      }
  
    },
    moveIngredientDown: (state: Draft<IConstructorState>, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.burgerConstructor.ingredients.length - 1) {
        const newIngredients = [...state.burgerConstructor.ingredients];
        [newIngredients[index], newIngredients[index + 1]] = 
          [newIngredients[index + 1], newIngredients[index]];
        state.burgerConstructor.ingredients = newIngredients;
      }
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor, 
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const constructorActions = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;