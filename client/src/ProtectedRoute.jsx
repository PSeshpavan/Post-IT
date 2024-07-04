import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext} from './context/uisAuthenticated';

const ProtectedRoute = () => {
    const { isAuthenticated, hasCookie } = useContext(AuthContext);

    if(hasCookie()) {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    } else {
        return <Navigate to="/login" />;
    }

};

export default ProtectedRoute;
