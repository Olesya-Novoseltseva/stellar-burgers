import { FC, useMemo, useCallback } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, resetOrderModal } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  
  // Защищаемся от undefined с помощью значения по умолчанию
  const constructorItems = useAppSelector(
    (state) => state.constructor.items || { bun: null, ingredients: [] }
  );
  
  const { orderRequest, orderModalData } = useAppSelector(
    (state) => state.order
  );

  const canMakeOrder = Boolean(constructorItems.bun) && !orderRequest;

  const totalPrice = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const handleOrderClick = useCallback(() => {
    if (!canMakeOrder) return;
    
    const ingredientsIds = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun?._id
    ].filter(Boolean) as string[];

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  }, [canMakeOrder, constructorItems, dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(resetOrderModal());
  }, [dispatch]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};