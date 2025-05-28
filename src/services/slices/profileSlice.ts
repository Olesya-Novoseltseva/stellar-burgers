import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  TResetPasswordData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';

export interface UserState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TUser | null;
  loginError: string | undefined;
  registrationError: string | undefined;
}

export const initialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  loginError: undefined,
  registrationError: undefined
};

export const loginUser = createAsyncThunk(
  'user/loginUserApi',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getUserApi', () =>
  getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUserApi',
  async ({ name, email, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ name, email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutApi',
  async (_, { rejectWithValue }) => {
    const data = await logoutApi();
    if (!data?.success) {
      return rejectWithValue(data);
    }
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPasswordApi',
  async ({ email }: TLoginData, { rejectWithValue }) => {
    const data = await forgotPasswordApi({ email });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPasswordApi',
  async ({ password, token }: TResetPasswordData, { rejectWithValue }) => {
    const data = await resetPasswordApi({ password, token });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUserApi',
  async (user: TRegisterData, { rejectWithValue }) => {
    const data = await updateUserApi(user);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    return data.user;
  }
);

export const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.loginError = undefined;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state, { error }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = payload.user;
      state.loginError = undefined;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.registrationError = error.message;
      }
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.registrationError = undefined;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = null;
      state.loginError = undefined;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.loginError = undefined;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.rejected, (state, { error }) => {
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.loginError = undefined;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.rejected, (state, { error }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      if (error.message) {
        state.loginError = error.message;
      }
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = payload;
      state.loginError = undefined;
    });
  },
  selectors: {
    selectUserState: (state) => state
  }
});

export const { init } = profileSlice.actions;

export const { selectUserState } = profileSlice.selectors;

export default profileSlice.reducer;