import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
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
      state.token = action.payload.token;
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
    },
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    }
  }
});

export const { authStart, loginSuccess, authFailure, logout, updateUserProfile } = authSlice.actions;

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

export const googleAuthUser = (googleData) => async (dispatch) => {
  try {
    dispatch(authStart());
    const data = await authService.googleAuth(googleData);
    dispatch(loginSuccess(data.user));
    return data;
  } catch (error) {
    dispatch(authFailure(error.message));
    throw error;
  }
};
export const updateProfile = (userData) => async (dispatch) => {
  try {
    const data = await authService.updateProfile(userData);
    dispatch(updateUserProfile(data.user));
    return data;
  } catch (error) {
    dispatch(authFailure(error.message));
    throw error;
  }
};

export default authSlice.reducer;