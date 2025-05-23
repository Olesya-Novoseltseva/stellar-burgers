import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppSelector } from '../../services/store';
import {
  selectCurrentOrder,
  selectAllIngredients
} from '../../services/selectors';

type TIngredientWithCount = TIngredient & { count: number };
type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

export const OrderInfo: FC = () => {
  const orderData = useAppSelector(selectCurrentOrder);
  const ingredients = useAppSelector(selectAllIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    // Явная типизация для reduce
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing: TIngredient) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    /// Вычисляем общую стоимость
    const ingredientValues = Object.values(ingredientsInfo) as TIngredientWithCount[];
    const total = ingredientValues.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};