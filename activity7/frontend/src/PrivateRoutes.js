import React from 'react';
import { Navigate } from 'react-router-dom';

// private route 
const PrivateRoutes = ({ children }) => {
    // getting the token from the localStorage
  const token = localStorage.getItem('token');

//   if token is not available then redirect to the login page 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
