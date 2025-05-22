import { ProfileOrdersUI } from '@ui-pages';
import { useAppSelector } from '../../services/store';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const { orders } = useAppSelector((state) => state.feed);

  return <ProfileOrdersUI orders={orders} />;
};