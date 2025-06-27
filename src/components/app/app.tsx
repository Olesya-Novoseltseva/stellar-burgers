import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { useEffect } from 'react';
import { AppDispatch, useAppDispatch as useAppDispatch } from '../../services/store';
import { getUser, init } from '../../services/slices/profileSlice';
import { getCookie } from '../../utils/cookie';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      dispatch(getUser());
    } else {
      dispatch(init());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:number"
          element={
            <div className={styles.detailPageWrap}>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <div className={`${styles.detailPageWrap} ${styles.detailHeader}`}>
              <h3 className="text text_type_main-large">Детали ингредиента</h3>
              <IngredientDetails />
            </div>
          }
        />
        <Route path="*" element={<NotFound404 />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/feed/:number"
            element={
              <Modal title="" onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Modal title="" onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;