import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private Routes */}
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MovieListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <PrivateRoute>
              <MovieDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        {/* Fallback Routes */}
        <Route path="/" element={<Navigate to="/movies" />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  )
}