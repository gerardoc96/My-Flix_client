import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk for login
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

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',

  async ({ Username, Password, Email, Birthday }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users', {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Birthday
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating user details
export const updateUser = createAsyncThunk(
  'auth/updateUser',

  async ({ Username, Password, Email, Birthday }, { getState, rejectWithValue }) => {
    const { auth: { user } } = getState();
    try {
      const { data } = await api.put(`/users/${user.Username}`, {
        Username,
        Password,
        Email,
        Birthday
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Async thunk for deleting the user's profile
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',

  async (_, { getState, rejectWithValue }) => {
    const { auth: { user } } = getState();
    try {
      await api.delete(`/users/${user.Username}`);
      return;
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
  LoginStatus: 'idle',
  LoginError: null,
  signupStatus: 'idle',
  signupError: null,
  updateStatus: 'idle',
  updateError: null,
  deleteStatus: 'idle',
  deleteError: null
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


  extraReducers: builder => {
    builder
      // Login async thunk
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.LoginError = null;
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
        state.LoginError = payload.message || 'Login failed';
      })

      // Signup async thunk
      .addCase(signup.pending, (state) => {
        state.signupStatus = 'loading';
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupStatus = 'succeeded';
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.signupStatus = 'failed';
        state.signupError = payload.errors
          ? payload.errors.map(e => e.msg).join(', ') : payload.message || 'Signup failed';
      })

      // UpdateUser async thunk
      .addCase(updateUser.pending, state => {
        state.updateStatus = 'loading';
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.updateStatus = 'succeeded';
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.updateStatus = 'failed';
        state.updateError = payload.message || 'Failed to update profile';
      })

      //DeleteUser async thunk
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteStatus = 'succeeded';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.deleteStatus = 'failed';
        state.deleteError = payload.message || 'Failed to delete profile';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;