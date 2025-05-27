import { FC, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, clearOrder, selectOrder, selectOrderLoading, selectOrderError } from '../../services/slices/orderSlice';
import { clearConstructor, burgerConstructorSelector } from '../../services/slices/constructorSlice';
import { selectIsAuthenticated } from '../../services/slices/authSlice'; 
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const constructorState = useAppSelector(burgerConstructorSelector);
  const bun = constructorState?.bun;
  const ingredients = constructorState?.ingredients || [];

  const order = useAppSelector(selectOrder);
  const orderRequest = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const totalPrice = useMemo(() => {
    const bunPrice = bun?.price ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + (item?.price || 0),
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const canMakeOrder = Boolean(bun) && !orderRequest;

  const handleOrderClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!canMakeOrder || !bun?._id) return;

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id).filter(Boolean),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((err) => console.error('Order creation failed:', err));
  }, [canMakeOrder, bun, ingredients, dispatch, isAuthenticated, navigate]);

  const handleCloseModal = useCallback(() => {
    dispatch(clearOrder());
  }, [dispatch]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={order}
      error={error}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
