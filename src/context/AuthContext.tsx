import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  image: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUserFromSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);

      const userResponse = await axios.get<User>(
        `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(userResponse.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const getUserFromSession = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userResponse = await axios.get<User>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (userResponse.status === 200 && userResponse.headers['content-type'].includes('application/json')) {
          setUser(userResponse.data);
        } else {
          throw new Error('Invalid response');
        }
      } catch (error) {
        console.error('Failed to fetch user from session:', error);
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserFromSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getUserFromSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};