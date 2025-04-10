import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import config from '#src/config.js';  
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for existing tokens on mount
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (accessToken && refreshToken) {
            verifyToken(accessToken);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await axios.post(`${config.BACKEND_URL}/api/v1/user/token/verify/`, {
                token: token
            });
            if (response.status === 200) {
                // Token is valid, get user info
                await getUserInfo();
            }
        } catch (error) {
            // Token is invalid, try to refresh
            await refreshAccessToken();
        }
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axios.post(`${config.BACKEND_URL}/api/v1/user/token/refresh/`, {
                refresh: refreshToken
            });

            localStorage.setItem('accessToken', response.data.access);
            await getUserInfo();
        } catch (error) {
            logout();
        }
    };

    const getUserInfo = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`${config.BACKEND_URL}/api/v1/user/user/me/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            setError(null);
            const response = await axios.post(`${config.BACKEND_URL}/api/v1/user/token/`, {
                username,
                password
            });

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            
            await getUserInfo();
            navigate('/admin');
        } catch (error) {
            setError(error.response?.data?.detail || 'اطلاعات ورود معتبر نیست!');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
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