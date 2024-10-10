// import React, { useContext, useEffect } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from './context/uisAuthenticated';
// import Cookies from 'js-cookie';
// import axios from 'axios';

// const ProtectedRoute = () => {
//     const { hasCookie,userData,isLoading } = useContext(AuthContext);

//     return hasCookie() ? <Outlet userData={userData}/> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthLoading, setUserData, setAuthError } from '@/features/auth/authSlice';

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const { userData, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUserData = async () => {
            dispatch(setAuthLoading(true));
            try {
                const token = Cookies.get('token');
                if (token) {
                    const response = await axios.get('http://localhost:3000/api/userdata', {
                        headers: {
                            Authorization: token,
                        },
                    });
                    dispatch(setUserData(response.data));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                dispatch(setAuthError('Failed to fetch user data'));
            } finally {
                dispatch(setAuthLoading(false));
            }
        };

        if (!userData) {
            fetchUserData();
        }
    }, [dispatch, userData]);

    if (isLoading) {
        return <div>Loading...</div>; // Add a loading spinner or placeholder
    }

    return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

