import { useAppSelector } from '../../services/store';
import { FC } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const ingredients = useAppSelector(getIngredients);

  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};