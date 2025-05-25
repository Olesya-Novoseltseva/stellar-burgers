import { FC, memo, useCallback } from 'react';
import { useAppDispatch } from '../../services/store';
import { constructorActions } from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = useCallback(() => {
      if (index < totalItems - 1) {
        dispatch(constructorActions.moveIngredientDown(index));
      }
    }, [dispatch, index, totalItems]);

    const handleMoveUp = useCallback(() => {
      if (index > 0) {
        dispatch(constructorActions.moveIngredientUp(index));
      }
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(constructorActions.removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);