import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      authService.logout();
    }
  }
});

export const { authStart, loginSuccess, authFailure, logout } = authSlice.actions;

// Thunk action creators
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await authService.login(email, password);
    dispatch(loginSuccess(data.user));
    return data;
  } catch (error) {
    dispatch(authFailure(error.message));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await authService.register(userData);
    dispatch(loginSuccess(data.user));
    return data;
  } catch (error) {
    dispatch(authFailure(error.message));
    throw error;
  }
};

export default authSlice.reducer;