import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useAppSelector } from '../../services/store';
import { 
  selectBun, 
  selectIngredients,
  selectConstructorItems
} from '../../services/selectors';


export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bun = useAppSelector(selectBun);
  const constructorIngredients = useAppSelector(selectIngredients);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    
    // Защита от undefined и обработка массива ингредиентов
    if (constructorIngredients && Array.isArray(constructorIngredients)) {
      constructorIngredients.forEach((ingredient: TIngredient) => {
        if (ingredient?._id) {
          counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
        }
      });
    }
    
    // Учитываем булку (2 штуки) с проверкой
    if (bun?._id) {
      counters[bun._id] = 2;
    }
    
    return counters;
  }, [bun, constructorIngredients]);

  // Дополнительная защита - если ingredients не передан
  if (!ingredients || !Array.isArray(ingredients)) {
    return null;
  }

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