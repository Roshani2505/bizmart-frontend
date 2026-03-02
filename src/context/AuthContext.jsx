import React, { createContext, useContext, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });

      // 🔥 SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // 🔥 SET USER
      setUser(res.data.user);

      return res.data;

    } catch (err) {
      alert("Wrong email or password ❌");
      throw err;
    }
  };

  // ✅ SIGNUP
  const signup = async (data) => {
    try {
      const res = await API.post('/auth/signup', data);
      return res.data;
    } catch (err) {
      alert("Signup error ❌");
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}