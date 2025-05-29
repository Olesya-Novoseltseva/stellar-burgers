import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  orderThunk,
  selectBun,
  selectIngredients,
  selectOrderModalData,
  selectOrderRequest,
  setOrderModalData
} from '../../services/slices/constructorSlice';
import { AppDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = ({ ...rest }) => {
  const dispatch = useAppDispatch();

  const bun = useAppSelector(selectBun);
  const ingredients = useAppSelector(selectIngredients);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);

  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(orderThunk(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      {...rest}
    />
  );
};