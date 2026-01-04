import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext(); // use context instead of localStorage

  return !user ? (
    // Not logged in
    <Navigate to="/login" replace />
  ) : !allowedRoles.includes(user.role) ? (
    // Role not allowed, redirect based on role
    user.role === "admin" ? (
      <Navigate to="/dashboard" replace />
    ) : user.role === "member" || user.role === "user" ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/login" replace />
    )
  ) : (
    // User is logged in and role is allowed
    children
  );
};

export default ProtectedRoute;
