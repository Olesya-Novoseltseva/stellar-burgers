import { useAppSelector } from '../../services/store';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../../components/ui/ingredient-details/ingredient-details'; 
import { Preloader } from '../../components/ui/preloader/preloader';


export const IngredientDetails: FC = () => {
  const { items: ingredients } = useAppSelector((state) => state.ingredients);
  const { id } = useParams();
  
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};