// feed-info.tsx
import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector(selectFeedOrders);
  const feed = useAppSelector((state) => state.feed);

  const [readyOrders, pendingOrders] = useMemo(() => [
    getOrders(orders, 'done'),
    getOrders(orders, 'pending')
  ], [orders]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};