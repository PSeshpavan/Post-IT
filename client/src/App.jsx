import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './_root/pages/Home';
import LoginForm from './_auth/forms/LoginForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import Profile from './_root/pages/Profile';
import HomeLayout from './_root/HomeLayout';
import { AuthProvider } from './context/uisAuthenticated';
import { FriendsProvider } from './context/FriendsContext';
import ProtectedRoute from './ProtectedRoute';
// import {Sidebar, Post, CreatePost, DispFriends} from './components';
import Sidebar from './components/Sidebar';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import DispFriends from './components/DispFriends';
import Explore from './_root/pages/Explore';
import SavedPosts from './_root/pages/SavedPosts';



const App = () => {
    return (
        <AuthProvider>
            <FriendsProvider>
            <BrowserRouter>
                <Routes>
                    {/* Private Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<HomeLayout />}>
                            <Route path='home' element={<Home />} />
                            
                        </Route>
                    </Route>
                    <Route path="profile" element={<Profile />} />
                    <Route path="sidebar" element={<Sidebar />} />
                    <Route path="post" element={<Post />} />
                    <Route path="cpost" element={<CreatePost />} />
                    <Route path="dfrnds" element={<DispFriends />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="saved-posts" element={<SavedPosts />} />
                    {/* Public Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="login" element={<LoginForm />} />
                        <Route path="signup" element={<SignupForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </FriendsProvider>
        </AuthProvider>
    );
};

export default App;
