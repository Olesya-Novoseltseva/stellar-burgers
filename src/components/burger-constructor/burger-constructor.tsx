import { FC, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { 
  selectBun,
  selectIngredients,
  selectOrderDetails,
  selectTotalPrice,
  selectIsAuthChecked
} from '../../services/selectors';
import { createOrder, resetOrderModal } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { useNavigate } from 'react-router-dom';
import { constructorActions, constructorReducer } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const bun = useAppSelector(selectBun);
  const ingredients = useAppSelector(selectIngredients);
  const { orderRequest, orderModalData, error } = useAppSelector(selectOrderDetails);
  const isAuthenticated = useAppSelector(selectIsAuthChecked);
  const totalPrice = useMemo(() => {
    const bunPrice = bun?.price ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price, 0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const canMakeOrder = Boolean(bun) && !orderRequest;

  const handleOrderClick = useCallback(() => {  
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!canMakeOrder || !bun?.price) return;
    
    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id),
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
    dispatch(resetOrderModal());
  }, [dispatch, navigate]);

  

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      error={error}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};