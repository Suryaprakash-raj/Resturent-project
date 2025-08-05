import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      throw err;
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    if (navigate) navigate('/login');
  };

  // Check auth on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setUser(res.data);
          setToken(token);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
