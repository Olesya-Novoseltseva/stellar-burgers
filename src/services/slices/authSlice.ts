import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, logoutApi, getUserApi, updateUserApi, getOrdersApi } from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser, TOrder } from '../../utils/types';

// Типы для API ответов
interface AuthResponse {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
}

interface OrdersResponse {
  success: boolean;
  orders: TOrder[];
}

interface UserResponse {
  success: boolean;
  user: TUser;
}

interface DefaultResponse {
  success: boolean;
  message?: string;
}

interface IAuthState {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: TOrder[];
  ordersRequest: boolean;
  error: string | null;
}

export const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  orders: [],
  ordersRequest: false,
  error: null
};

const processToken = (token: string): string => {
  return token.startsWith('Bearer ') ? token.split('Bearer ')[1] : token;
};

export const registerUser = createAsyncThunk<TUser, { email: string; password: string; name: string }, { rejectValue: string }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData) as AuthResponse;
      if (!response.success) {
        return rejectWithValue('Ошибка регистрации');
      }
      setCookie('accessToken', processToken(response.accessToken));
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

export const loginUser = createAsyncThunk<TUser, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData) as AuthResponse;
      if (!response.success) {
        return rejectWithValue('Ошибка авторизации');
      }
      setCookie('accessToken', processToken(response.accessToken));
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi() as DefaultResponse;
      if (!response.success) {
        return rejectWithValue(response.message || 'Ошибка выхода');
      }
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

export const checkUserAuth = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi() as UserResponse;
      if (!response.success) {
        return rejectWithValue('Ошибка проверки авторизации');
      }
      return response.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

export const updateUser = createAsyncThunk<TUser, { email: string; password?: string; name: string }, { rejectValue: string }>(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData) as UserResponse;
      if (!response.success) {
        return rejectWithValue('Ошибка обновления данных');
      }
      return response.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

export const getOrders = createAsyncThunk<TOrder[], void, { rejectValue: string }>(
  'auth/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi() as unknown as OrdersResponse;
      if (!response.success) {
        return rejectWithValue('Ошибка получения заказов');
      }
      return response.orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
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
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка регистрации';
      })

      // Авторизация
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка авторизации';
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
      .addCase(logoutUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка выхода';
      })

      // Проверка авторизации
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkUserAuth.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка проверки авторизации';
      })

      // Обновление данных
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка обновления данных';
      })

      // Получение заказов
      .addCase(getOrders.pending, (state) => {
        state.ordersRequest = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.ordersRequest = false;
      })
      .addCase(getOrders.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.ordersRequest = false;
        state.error = action.payload || 'Ошибка получения заказов';
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