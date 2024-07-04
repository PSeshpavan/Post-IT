import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <section className="">
                <Sidebar />
            </section>

            <section>
                <Outlet />
            </section>

            <section className="">
                <Footer />
            </section>
            
        </>
    )
}

export default HomeLayout