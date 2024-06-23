import React from 'react'
import { createBrowserRouter, RouterProvider,createRoutesFromElements,Route, Routes } from 'react-router-dom'
import  Home  from './_root/pages/Home';
import  LoginForm  from './_auth/forms/LoginForm';
import  SignupForm  from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import Profile from './_root/pages/Profile';
import HomeLayout from './_root/HomeLayout';
const App = () => {
  // Routes
    const router =  createBrowserRouter(
      createRoutesFromElements(
        <Route >
          {/* Private Routes */}
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Public Routes */}
          <Route element={<AuthLayout />} >
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>
        </Route>,

      )
    )

  return (
    <RouterProvider router={router} />
  )
}

export default App

