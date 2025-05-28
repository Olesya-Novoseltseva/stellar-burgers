import ingredientsSliceReducer, {
  fetchIngredients,
  IngredientsState
} from '../services/slices/ingredientsSlice';
import { expect, test, describe } from '@jest/globals';

describe('ingredientsSlice extraReducers', () => {
  const initialState: IngredientsState = {
    isLoading: false,
    ingredients: [],
    error: null
  };

  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa0940',
      id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
    }
  ];

  test('fetchIngredients.pending', () => {
    const actualState = ingredientsSliceReducer(
      { ...initialState },
      fetchIngredients.pending('')
    );
    expect(actualState.isLoading).toBe(true);
    expect(actualState.error).toBeNull();
  });

  test('fetchIngredients.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = ingredientsSliceReducer(
      { ...initialState },
      fetchIngredients.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('fetchIngredients.fulfilled', () => {
    const actualState = ingredientsSliceReducer(
      {
        ...initialState
      },
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.ingredients).toEqual(mockIngredients);
  });
});
