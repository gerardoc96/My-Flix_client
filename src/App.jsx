import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import ProfilePage from './pages/ProfilePage';
import NavigationBar from './components/navigationbar/NavigationBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export default function App() {
  return (
    <>
      <NavigationBar />

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
          path="/movies/:Title"
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