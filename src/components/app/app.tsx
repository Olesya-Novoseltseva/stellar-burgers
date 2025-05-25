import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import styles from './app.module.css';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { selectAppInitialized, selectAppInitError } from '../../services/selectors';
import { initializeApp } from '../../services/slices/appSlice';
import { useEffect } from 'react';
import { Preloader, OrderDetailsUI } from '@ui';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectAppInitialized);
  const initError = useAppSelector(selectAppInitError);

  useEffect(() => {
    if (!isInitialized && !initError) {
      dispatch(initializeApp());
    }
  }, [dispatch, isInitialized, initError]);

  if (initError) {
    return (
      <div className={styles.app}>
        <div className={styles.errorFallback}>
          <h2>Ошибка при загрузке</h2>
          <p>{initError}</p>
          <button onClick={() => dispatch(initializeApp())}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      {!isInitialized ? (
        <Preloader />
      ) : (
        <>
          <AppHeader />
          <Routes location={background || location}>
            <Route path="/" element={<ConstructorPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:number" element={<OrderInfo />} />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            
            <Route path="/login" element={
              <ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>
            } />
            
            <Route path="/register" element={
              <ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>
            } />
            
            <Route path="/forgot-password" element={
              <ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>
            } />
            
            <Route path="/reset-password" element={
              <ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            
            <Route path="/profile/orders" element={
              <ProtectedRoute><ProfileOrders /></ProtectedRoute>
            } />
            
            <Route path="/profile/orders/:number" element={
              <ProtectedRoute><OrderInfo /></ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="/feed/:number" element={
                <Modal title="Информация о заказе" onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              } />
              
              <Route path="/ingredients/:id" element={
                <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              } />
              
              <Route path="/profile/orders/:number" element={
                <ProtectedRoute>
                  <Modal title="Информация о заказе" onClose={() => navigate(-1)}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              } />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export { App };