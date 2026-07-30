import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    const { token, username: uname, role } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ username: uname, role }));
    setUser({ username: uname, role });

    return response.data;
  };

  const register = async (username, password, role) => {
    const response = await axiosInstance.post('/auth/register', { username, password, role });
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}