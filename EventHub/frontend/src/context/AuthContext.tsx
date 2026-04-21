import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Student, Faculty, AuthState } from '../types';

interface AuthContextType extends AuthState {
    login: (user: Student | Faculty, role: 'student' | 'faculty') => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        role: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth));
        }
    }, []);

    const login = (user: Student | Faculty, role: 'student' | 'faculty') => {
        const newAuth = {
            user,
            role,
            isAuthenticated: true,
        };
        setAuth(newAuth);
        localStorage.setItem('auth', JSON.stringify(newAuth));
    };

    const logout = () => {
        setAuth({
            user: null,
            role: null,
            isAuthenticated: false,
        });
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
