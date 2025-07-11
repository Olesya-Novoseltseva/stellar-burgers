import { TIngredient } from '@utils-types';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef?: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters?: Record<string, number>;
  handleAdd?: (ingredient: TIngredient) => void; // Добавляем новый пропс
};