import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchOrders,
  getFeedOrders,
  getIsFeedLoading
} from '../../services/slices/orderSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(getFeedOrders);
  const isFeedLoading = useAppSelector(getIsFeedLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isFeedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchOrders())} />
  );
};