import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useAppSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length || !order?.ingredients) return null;

    const ingredientsInfo = order.ingredients.reduce<TIngredient[]>((acc, item) => {
      const ingredient = ingredients.find((ing) => ing._id === item);
      return ingredient ? [...acc, ingredient] : acc;
    }, []);

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains = Math.max(ingredientsInfo.length - maxIngredients, 0);
    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});