import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Redirect to the books page or a login page
    return <Navigate to="/books" replace />;
  }

  return children;
};

export default ProtectedRoute;
