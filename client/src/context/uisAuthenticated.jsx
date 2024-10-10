import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null); // Set initial state to null to differentiate between uninitialized and empty data
    const [isLoading, setIsLoading] = useState(true);

    const hasCookie = () => Cookies.get('token') !== undefined;


    return (
        <AuthContext.Provider value={{ hasCookie, userData, setUserData, isLoading,setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
