import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk for fetching all movies
export const getMovies = createAsyncThunk(
  'movies/getAll',

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/movies');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// initial state
const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},

  // handles the three states of the thunk
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.list = payload;
      })
      .addCase(getMovies.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.massage || 'Could not fetch movies';
      });
  }
});

export default moviesSlice.reducer;