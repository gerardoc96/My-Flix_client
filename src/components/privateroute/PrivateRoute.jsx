import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

// Checks if the user is authenticated before allowing access to certain routes
export default function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}