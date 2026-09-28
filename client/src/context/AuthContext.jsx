import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { getDynamicStreak, recordDailyActivity } from '../utils/streakTracker.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('orbit_user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object') return null;
      const dynamicStreak = getDynamicStreak(parsed._id || parsed.email);
      return { ...parsed, streakDays: dynamicStreak };
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Sync dynamic streak on mount and record daily activity
  useEffect(() => {
    if (user) {
      const realStreak = recordDailyActivity(user._id || user.email);
      if (user.streakDays !== realStreak) {
        setUser(prev => {
          if (!prev) return null;
          const updated = { ...prev, streakDays: realStreak };
          localStorage.setItem('orbit_user', JSON.stringify(updated));
          return updated;
        });
      }
    }
  }, [user?._id]);

  const loginDemo = async (role) => {
    setLoading(true);
    try {
      const res = await api.demoLogin(role);
      const dynamicStreak = recordDailyActivity(res.user?._id || res.user?.email);
      const dynamicUser = { ...res.user, streakDays: dynamicStreak };
      localStorage.setItem('orbit_user', JSON.stringify(dynamicUser));
      setUser(dynamicUser);
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
