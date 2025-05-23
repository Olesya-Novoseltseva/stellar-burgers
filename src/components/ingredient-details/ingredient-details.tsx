// ingredient-details.tsx
import { useAppSelector } from '../../services/store';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../../components/ui/ingredient-details/ingredient-details'; 
import { Preloader } from '../../components/ui/preloader/preloader';
import { selectIngredientById } from '../../services/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useAppSelector((state) => 
    selectIngredientById(state, id || '')
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};