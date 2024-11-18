import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextProps {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    const login = async (username: string, password: string) => {
        const response = await axios.post<{ token: string }>('/api/auth/login', { username, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        const userResponse = await axios.get('/api/user/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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