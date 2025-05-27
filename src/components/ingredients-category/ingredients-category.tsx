import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useAppSelector } from '../../services/store';
import { burgerConstructorSelector } from '../../services/slices/constructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorState = useAppSelector(burgerConstructorSelector);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    
    const bun = constructorState?.bun;
    const constructorIngredients = constructorState?.ingredients || [];

    constructorIngredients.forEach((ingredient) => {
      if (ingredient?._id) {
        counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
      }
    });

    if (bun?._id) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [constructorState]);

  if (!ingredients) return null;

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
