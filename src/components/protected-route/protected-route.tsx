import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth = false, children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    return <Navigate to={location.state?.from || '/'} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};