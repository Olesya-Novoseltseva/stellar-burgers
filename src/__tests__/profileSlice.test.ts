import { expect, test, describe } from '@jest/globals';
import userSliceReducer, {
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  initialState
} from '../services/slices/profileSlice';

describe('userSlice extraReducers', () => {
  const mockUser = {
    email: 'olesya.n2003@gmail.com',
    name: 'Olesya'
  };

  const mockUserResponse = {
    user: {
      email: 'test@gmail.com',
      name: 'Иван Иванов'
    },
    success: true
  };

  test('loginUserThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      loginUser.pending('', { email: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('loginUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      loginUser.rejected(new Error(errorMessage), '', {
        email: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('loginUserThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      loginUser.fulfilled(mockUser, '', { email: '', password: '' })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
    expect(actualState.user).toEqual(mockUser);
  });

  test('getUserThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      getUser.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('getUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      getUser.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('getUserThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      getUser.fulfilled(mockUserResponse, '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.loginError).toBeUndefined();
    expect(actualState.user).toEqual(mockUserResponse.user);
  });

  test('registerUserThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      registerUser.pending('', { email: '', name: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('registerUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      registerUser.rejected(new Error(errorMessage), '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.registrationError).toBe(errorMessage);
  });

  test('registerUserThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      registerUser.fulfilled(mockUser, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.registrationError).toBeUndefined();
    expect(actualState.user).toEqual(mockUser);
  });

  test('logoutUserThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      logoutUser.pending('')
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('logoutUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      logoutUser.rejected(new Error(errorMessage), '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('logoutUserThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      logoutUser.fulfilled({ success: true }, '')
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
    expect(actualState.user).toEqual(null);
  });

  test('forgotPasswordThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      forgotPassword.pending('', { email: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('forgotPasswordThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      forgotPassword.rejected(new Error(errorMessage), '', {
        email: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('forgotPasswordThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      forgotPassword.fulfilled({ success: true }, '', {
        email: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
  });

  test('resetPasswordThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      resetPassword.pending('', { token: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('resetPasswordThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      resetPassword.rejected(new Error(errorMessage), '', {
        token: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('resetPasswordThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      resetPassword.fulfilled({ success: true }, '', {
        token: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.loginError).toBeUndefined();
  });

  test('updateUserThunk.pending', () => {
    const actualState = userSliceReducer(
      initialState,
      updateUser.pending('', { email: '', name: '', password: '' })
    );
    expect(actualState.isLoading).toBe(true);
  });

  test('updateUserThunk.rejected', () => {
    const errorMessage = 'Test error';
    const actualState = userSliceReducer(
      initialState,
      updateUser.rejected(new Error(errorMessage), '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.loginError).toBe(errorMessage);
  });

  test('updateUserThunk.fulfilled', () => {
    const actualState = userSliceReducer(
      initialState,
      updateUser.fulfilled(mockUser, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(actualState.isLoading).toBe(false);
    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.user).toBe(mockUser);
    expect(actualState.loginError).toBeUndefined();
  });
});