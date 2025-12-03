import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const recoveredUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, []);

    const login = async (email, senha, originUrl = '/') => {

        const response = await api.post('/api/auth/login', { email, senha, originUrl });

        const { token, user: userData, redirectUrl } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        return (redirectUrl === '/' ? '/home' : redirectUrl);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            authenticated: !!user, 
            user, 
            login, 
            logout, 
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};