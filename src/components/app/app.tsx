import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
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
import styles from './app.module.css'; 
const App = () => {
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
        
        <Route path="/login" element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        } />
        
        <Route path="/register" element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        } />
        
        <Route path="/forgot-password" element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        } />
        
        <Route path="/reset-password" element={
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/profile/orders" element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        } />
        
        <Route path="/profile/orders/:number" element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
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
    </div>
  );
};

export {App};