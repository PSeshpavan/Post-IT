import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const hasCookie = () => {
        if(Cookies.get('token') !== undefined) {
            return true;
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, hasCookie }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
