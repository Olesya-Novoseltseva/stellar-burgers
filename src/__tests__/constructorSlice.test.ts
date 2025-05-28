import { TConstructorIngredient, TIngredient } from '../utils/types';
import burgerConstructorSliceReducer, {
  addIngredient,
  IConstructorState,
  moveIngredientDown,
  moveIngredientUp,
  orderThunk,
  removeIngredient,
  addBun
} from '../services/slices/constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('burgerConstructorSlice', () => {
  const ingredient1: TConstructorIngredient = {
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
  };

  const bun: TIngredient | null = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const initialState: IConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('добавление ингредиента', () => {
    const newState = burgerConstructorSliceReducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  test('выбор булочки', () => {
    const newState = burgerConstructorSliceReducer(initialState, addBun(bun));
    expect(newState.constructorItems.bun).toEqual({
      ...bun
    });
  });

  test('удаление ингредиента', () => {
    const initialState: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      removeIngredient(ingredient1.id)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  test('перемещение ингредиента вверх', () => {
    const initialState: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient1]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      moveIngredientUp(ingredient1.id)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient1,
      ingredient1
    ]);
  });

  test('перемещение ингредиента вниз', () => {
    const initialState: IConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient1]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = burgerConstructorSliceReducer(
      initialState,
      moveIngredientDown(ingredient1.id)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient1,
      ingredient1
    ]);
  });
});

describe('burgerConstructorSlice extraReducers', () => {
  const initialState: IConstructorState = {
    constructorItems: {
      bun: {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      },
      ingredients: [
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
      ]
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('orderThunk.pending', () => {
    const actualState = burgerConstructorSliceReducer(
      { ...initialState },
      orderThunk.pending('', [])
    );
    expect(actualState.orderRequest).toBe(true);
    expect(actualState.error).toBeNull();
  });

  test('orderThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = burgerConstructorSliceReducer(
      { ...initialState },
      orderThunk.rejected(new Error(errorMessage), '', [])
    );
    expect(actualState.orderRequest).toBe(false);
    expect(actualState.error).toBe(errorMessage);
  });

  test('orderThunk.fulfilled', () => {
    const mockOrder = {
      _id: 'order123',
      id: 'order123',
      name: 'R2-D3 Метеорит Бургер',
      status: 'done',
      createdAt: '2025-05-28T03:18:10.871Z',
      updatedAt: '2025-05-28T03:18:11.442Z',
      number: 123,
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ]
    };
    const actualState = burgerConstructorSliceReducer(
      {
        ...initialState,
        orderRequest: true
      },
      orderThunk.fulfilled(mockOrder, '', [])
    );
    expect(actualState.orderRequest).toBe(false);
    expect(actualState.error).toBeNull();
    expect(actualState.orderModalData).toEqual(mockOrder);
    expect(actualState.constructorItems.bun).toBeNull();
    expect(actualState.constructorItems.ingredients).toHaveLength(0);
  });
});
