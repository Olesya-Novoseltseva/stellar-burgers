import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { selectUserState } from '../../services/slices/profileSlice';

export const AppHeader: FC = () => {
  const { user } = useAppSelector(selectUserState);
  return <AppHeaderUI userName={user?.name} />;
};