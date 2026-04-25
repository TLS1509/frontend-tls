/**
 * ProtectedRoute Component - Wraps routes that require authentication
 *
 * Checks if user is authenticated and redirects to login if not
 */

import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  // If not authenticated, redirect to WordPress login
  if (!user) {
    // Redirect to WordPress login page
    window.location.href = '/app/wp-login.php';
    return null;
  }

  return <>{children}</>;
};
