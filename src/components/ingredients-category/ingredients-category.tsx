import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import {
  selectBun,
  selectIngredients
} from '../../services/slices/constructorSlice';
import { useAppSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients, ...rest }, ref) => {
  const constructorBun = useAppSelector(selectBun);
  const constructorIngredients = useAppSelector(selectIngredients);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (constructorBun) counters[constructorBun._id] = 2;
    return counters;
  }, [constructorBun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      {...rest}
    />
  );
});