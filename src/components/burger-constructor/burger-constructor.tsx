import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { 
  selectBun,
  selectIngredients,
  selectOrderDetails,
  selectTotalPrice
} from '../../services/selectors';
import { createOrder, resetOrderModal } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  
  const bun = useAppSelector(selectBun);
  const ingredients = useAppSelector(selectIngredients);
  const { orderRequest, orderModalData, error } = useAppSelector(selectOrderDetails);
  const totalPrice = useAppSelector(selectTotalPrice);

  const canMakeOrder = Boolean(bun) && !orderRequest;

  const handleOrderClick = useCallback(() => {
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
  }, [canMakeOrder, bun, ingredients, dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(resetOrderModal());
  }, [dispatch]);

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