import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  loadingComponent = <div>Loading authentication...</div>,
}) => {
  const { isLoading, error } = useAuth();

  if (isLoading) {
    return loadingComponent as React.ReactElement;
  }

  if (error) {
    console.error('Authentication error:', error);
  }

  return children as React.ReactElement;
};
