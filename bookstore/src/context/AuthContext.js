// src/context/AuthContext.js
import { PREFIX } from '../service/config';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch(`${PREFIX}/check_login`, {
                    method: 'GET',
                    credentials: 'include' // 允许携带 Cookie
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLogin(data.isLogin);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                setIsLogin(false);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
