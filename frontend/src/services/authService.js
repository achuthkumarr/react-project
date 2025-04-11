import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Authentication failed' };
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },
  
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to process request' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  },
  
  updateProfile: async (userData) => {
    try {
      const response = await api.get('/users/update', userData ,{
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },
  
  changePassword: async (password) => {
    try {
      const response = await api.post('/users/update-password', password, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reset password' };
    }
  }
};