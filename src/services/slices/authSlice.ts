import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, logoutApi, getUserApi, updateUserApi, getOrdersApi } from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser, TOrder } from '../../utils/types';

interface IAuthState {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: TOrder[];
  ordersRequest: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

export const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  orders: [],
  ordersRequest: false,
  error: null,
  isAuthChecked: false
};

// Вспомогательная функция для обработки токена
const processToken = (token: string) => {
  return token.startsWith('Bearer ') ? token.split('Bearer ')[1] : token;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(userData);
    setCookie('accessToken', processToken(response.accessToken));
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }) => {
    const response = await loginUserApi(userData);
    setCookie('accessToken', processToken(response.accessToken));
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkUserAuth = createAsyncThunk('auth/checkAuth', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: { email: string; password?: string; name: string }) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const getOrders = createAsyncThunk(
  'auth/getOrders',
  async () => {
    const response = await getOrdersApi();
    return response.orders;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      // Авторизация
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })

      // Выход
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      })

      // Проверка авторизации
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isLoading = false;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка проверки авторизации';
      })

      // Обновление данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      })

      // Получение заказов
      .addCase(getOrders.pending, (state) => {
        state.ordersRequest = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersRequest = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.ordersRequest = false;
        state.error = action.error.message || 'Ошибка получения заказов';
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectOrdersRequest: (state) => state.ordersRequest,
    selectError: (state) => state.error,
  }
});

export const { clearError } = authSlice.actions;
export const { 
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectOrders,
  selectOrdersRequest,
  selectError
} = authSlice.selectors;

export default authSlice.reducer;