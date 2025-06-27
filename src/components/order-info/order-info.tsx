import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  getOrderByNumber,
  getShownOrders,
  getIsShownLoading,
  getOrderStatus
} from '../../services/slices/orderSlice';
import { AppDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();

  const orders = useAppSelector(getShownOrders);
  const isShownLoading = useAppSelector(getIsShownLoading);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderData = orders.find((order) => order.number === Number(number));

  const status = useAppSelector(getOrderStatus);

  const ingredients = useAppSelector(getIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      status,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isShownLoading || !orderData || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};