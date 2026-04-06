import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAdminAuthenticated, getCurrentAdmin, adminLogout } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);
    setAdminUser(authenticated ? getCurrentAdmin() : null);
  };

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  const logout = () => {
    adminLogout();
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const login = () => {
    checkAuth();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};