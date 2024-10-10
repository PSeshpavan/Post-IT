import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactQueryProvider from './utils/ReactQueryProvider';


// Context API's / Redux
import { AuthProvider } from './context/uisAuthenticated';
import { FriendsProvider } from './context/FriendsContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Pages
import Home from './_root/pages/Home';
import LoginForm from './_auth/forms/LoginForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import Profile from './_root/pages/Profile';
import HomeLayout from './_root/HomeLayout';
import EditProfile from './_root/pages/EditProfile';
import Explore from './_root/pages/Explore';
import FriendRequestsPage from './_root/pages/FriendRequest';
import PostPage from './components/PostPage';
import ProtectedRoute from './ProtectedRoute';

// Components
import Sidebar from './components/Sidebar';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import DispFriends from './components/DispFriends';
// import SavedPosts from './_root/pages/SavedPosts';



const App = () => {
    return (
        <ReactQueryProvider>
            <Provider store={store}>
                {/* <AuthProvider> */}
                <FriendsProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Private Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<HomeLayout />}>
                                    <Route path='home' element={<Home />} />
                                    <Route path='profile' element={<Profile />} />
                                    <Route path='editprofile' element={<EditProfile />} />
                                    <Route path='explore' element={<Explore />} />
                                    <Route path='frnd-req' element={<FriendRequestsPage />} />
                                    <Route path="post/:id" element={<PostPage />} />
                                </Route>
                            </Route>
                            {/* <Route path="profile" element={<Profile />} />
                    <Route path="sidebar" element={<Sidebar />} />
                    <Route path="post" element={<Post />} />
                    <Route path="cpost" element={<CreatePost />} />
                    <Route path="dfrnds" element={<DispFriends />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="saved-posts" element={<SavedPosts />} /> */}
                            {/* Public Routes */}
                            <Route element={<AuthLayout />}>
                                <Route path="login" element={<LoginForm />} />
                                <Route path="signup" element={<SignupForm />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </FriendsProvider>
                {/* </AuthProvider> */}
            </Provider>
        </ReactQueryProvider>
    );
};

export default App;
