import { useAppSelector } from '../../services/store';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../../components/ui/ingredient-details/ingredient-details';
import { Preloader } from '../../components/ui/preloader/preloader';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Если id отсутствует, сразу возвращаем Preloader
  if (!id) {
    return <Preloader />;
  }

  // Получаем все ингредиенты и находим нужный по id
  const ingredientData = useAppSelector((state) => {
    const ingredients = selectIngredients(state);
    return ingredients.find((ing: TIngredient) => ing._id === id);
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};