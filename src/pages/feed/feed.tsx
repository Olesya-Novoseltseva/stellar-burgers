import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useAppSelector } from '../../services/store';
import { FC } from 'react';

export const Feed: FC = () => {
  const { orders } = useAppSelector((state) => state.feed);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};