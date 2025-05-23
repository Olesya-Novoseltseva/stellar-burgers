import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface IConstructorState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.items.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.items.ingredients.push({
        ...action.payload,
        id: `${action.payload._id}-${Date.now()}`
      });
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.items.bun = null;
      state.items.ingredients = [];
    },
    moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const ingredients = [...state.items.ingredients];
      const movedItem = ingredients[from];
      ingredients.splice(from, 1);
      ingredients.splice(to, 0, movedItem);
      state.items.ingredients = ingredients;
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;