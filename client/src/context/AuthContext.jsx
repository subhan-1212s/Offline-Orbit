import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('orbit_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const loginDemo = async (role) => {
    setLoading(true);
    try {
      const res = await api.demoLogin(role);
      setUser(res.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const switchRole = async (newRole) => {
    await loginDemo(newRole);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      const newU = { ...prev, ...updatedFields };
      localStorage.setItem('orbit_user', JSON.stringify(newU));
      return newU;
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginDemo, switchRole, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
