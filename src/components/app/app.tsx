import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
} from '@components';
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
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
//import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        
        {/* Защищенные роуты */}
        <Route
          path="/login"
          element={
            //<ProtectedRoute anonymous>
              <Login />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            //<ProtectedRoute anonymous>
              <Register />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            //<ProtectedRoute anonymous>
              <ForgotPassword />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            //<ProtectedRoute anonymous>
              <ResetPassword />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            //<ProtectedRoute>
              <Profile />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            //<ProtectedRoute>
              <ProfileOrders />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:number"
          element={
            //<ProtectedRoute>
              <OrderInfo />
            //</ProtectedRoute>
          }
        />
        
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {background && (
        <Routes>
          <Route
            path="/feed/:number"
            element={
              <Modal title="Информация о заказе" onClose={() => navigate(-1)}>
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
              //<ProtectedRoute>
                <Modal title="Информация о заказе" onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              //</ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;