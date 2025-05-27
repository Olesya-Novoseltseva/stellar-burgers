import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const { user, isAuthChecked, isLoading } = useAppSelector((state) => ({
    user: state.auth.user,
    isAuthChecked: state.auth.isAuthenticated, // переименовать не просили
    isLoading: state.auth.isLoading
  }));

  const location = useLocation();

  // Пока загружаются данные пользователя — показываем прелоадер
  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  // Если маршрут только для неавторизованных, а пользователь уже вошёл — редиректим
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // Если маршрут защищён, а пользователь не авторизован — редирект на логин
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Иначе — пропускаем
  return children;
};
