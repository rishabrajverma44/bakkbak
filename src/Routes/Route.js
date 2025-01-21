import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ element, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, restricted, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && restricted ? <Navigate to="/home" /> : element;
};

export { PrivateRoute, PublicRoute };
