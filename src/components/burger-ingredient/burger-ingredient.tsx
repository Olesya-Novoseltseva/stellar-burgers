import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { constructorActions } from '../../services/slices/constructorSlice';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      // Создаем новый объект с добавленным id
      const ingredientWithId = {
        ...ingredient,
        id: uuidv4()
      };
      
      if (ingredient.type === 'bun') {
        dispatch(constructorActions.addBun(ingredient));
      } else {
        dispatch(constructorActions.addIngredient(ingredientWithId));
      }
    };

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