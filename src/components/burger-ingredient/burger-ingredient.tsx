import { FC, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { constructorActions } from '../../services/slices/constructorSlice';
import { TIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = useCallback(() => {
      const ingredientWithId: TIngredient & { id?: string } = { ...ingredient };
      
      if (ingredient.type === 'bun') {
        dispatch(constructorActions.addBun(ingredientWithId));
      } else {
        // Генерируем уникальный ID только для не-булок
        ingredientWithId.id = `${ingredient._id}-${Date.now()}`;
        dispatch(constructorActions.addIngredient(ingredientWithId as Required<typeof ingredientWithId>));
      }
    }, [dispatch, ingredient]);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);