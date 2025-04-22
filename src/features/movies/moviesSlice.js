import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
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

// Thunk for fetching a single movie by ID
export const getMovie = createAsyncThunk(
  'movies/getOne',

  async (Title, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/movies/${encodeURIComponent(Title)}`);
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
    currentMovie: null,
    statusAll: 'idle',
    StatusOne: 'idle',
    errorAll: null,
    errorOne: null
  },
  reducers: {},

  // handles the three states of the getMovies thunk
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.statusAll = 'loading';
        state.errorAll = null;
      })
      .addCase(getMovies.fulfilled, (state, { payload }) => {
        state.statusAll = 'succeeded';
        state.list = payload;
      })
      .addCase(getMovies.rejected, (state, { payload }) => {
        state.statusAll = 'failed';
        state.errorAll = payload.massage || 'Could not fetch movies';
      })

      // handles the three states of the getMovie thunk
      .addCase(getMovie.pending, (state) => {
        state.StatusOne = 'loading';
        state.errorOne = null;
        state.currentMovie = null;
      })
      .addCase(getMovie.fulfilled, (state, { payload }) => {
        state.StatusOne = 'succeeded';
        state.currentMovie = payload;
      })
      .addCase(getMovie.rejected, (state, { payload }) => {
        state.StatusOne = 'failed';
        state.errorOne = payload.massage || 'Could not fetch the movie';
      });
  }

});

export default moviesSlice.reducer;