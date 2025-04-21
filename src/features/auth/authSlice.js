import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// async thunk for login
export const login = createAsyncThunk(
  'auth/login',

  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', {
        Username: username,
        Password: password
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initialize state from localStorage if available
const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = localStorage.getItem('user');

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  status: 'idle',
  error: null
};

// initial state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  // clears out user and token on logout
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // handles the three states of the login async thunk
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload.user));
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.massage || 'Login failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;