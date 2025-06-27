import { TIngredient } from '@utils-types';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef?: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters?: Record<string, number>;
  handleAdd?: (ingredient: TIngredient) => void;
};
