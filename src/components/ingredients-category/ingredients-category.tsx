import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useAppSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // Получаем данные из хранилища с защитой от undefined
  const { bun, ingredients: constructorIngredients } = useAppSelector(
    (state) => state.constructor.items || { bun: null, ingredients: [] }
  );

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    
    // Считаем ингредиенты в конструкторе
    constructorIngredients?.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });
    
    // Учитываем булку (2 штуки)
    if (bun) {
      counters[bun._id] = 2;
    }
    
    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});