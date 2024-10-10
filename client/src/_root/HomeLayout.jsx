// import React, { useContext, useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { AuthContext } from '@/context/uisAuthenticated';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const HomeLayout = () => {
//     const { hasCookie,isLoading,setUserData,userData,setIsLoading } = useContext(AuthContext);

//     useEffect(() => {
//         console.log('Fetched user data:', userData);
//     }, [isLoading,userData]);

//     useEffect(() => {
//         console.log('Fetching user data...');
//         fetchUserData();
//     }, []);

//     const fetchUserData = async () => {
//         try {
//             if (hasCookie()) {
//                 const response = await axios.get('http://localhost:3000/api/userdata', {
//                     headers: {
//                         authorization: Cookies.get('token'),
//                     },
//                 }).then((response) => {
//                     setUserData(response.data);
//             });
//                 } else {
//                     setUserData(null);
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setUserData(null);
//         } finally {
//                     setIsLoading(false); 
//                 }
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-100">
//             <section className="lg:hidden">
//                 <Navbar />
//             </section>
            
//             <div className="flex">
//                 <section className="fixed hidden lg:block top-0 left-0 h-[95vh] mt-4 z-10">
//                     <Sidebar className="h-[95vh]" />
//                 </section>

//                 <section className="flex-1 lg:ml-60 w-[10vw]">
//                     <Outlet />
//                 </section>
//             </div>

//             <section className="mt-auto">
//                 <Footer />
//             </section>
//         </div>
//     );
// };

// export default HomeLayout;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchUserData } from '@/features/auth/authSlice';

const HomeLayout = () => {
    const dispatch = useDispatch();
    const { userData, isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Error loading user data.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <section className="lg:hidden">
                <Navbar />
            </section>

            <div className="flex">
                <section className="fixed hidden lg:block top-0 left-0 h-[95vh] mt-4 z-10">
                    <Sidebar className="h-[95vh]" />
                </section>

                <section className="flex-1 lg:ml-60 w-[10vw]">
                    <Outlet />
                </section>
            </div>

            <section className="mt-auto">
                <Footer />
            </section>
        </div>
    );
};

export default HomeLayout;
