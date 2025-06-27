import { FC, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/profileSlice';
import { useAppDispatch } from '../../services/store';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};