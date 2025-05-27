import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/store';
import { 
  selectFeeds, 
  selectTotal, 
  selectTotalToday 
} from '../../services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector(selectFeeds);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);

  const [readyOrders, pendingOrders] = useMemo(
    () => [
      getOrders(orders, 'done'),
      getOrders(orders, 'pending')
    ], 
    [orders]
  );

  const feed = useMemo(() => ({
    total,
    totalToday
  }), [total, totalToday]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};