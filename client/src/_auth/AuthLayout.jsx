import React,{useState} from 'react'
import { Outlet,Navigate } from 'react-router-dom'


const AuthLayout = () => {

const [Authenticated, setAuthenticated] = useState(false)

  return (
    <>
      {Authenticated ? (
        <Navigate to="/profile" />
      ) : (
        <div className='flex'>
        <img 
          src="/assets/landing.jpg" 
          alt="alt-img"
          className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        <section className='flex flex-1 justify-center items-center flex-col'>
          <Outlet />
        </section>
          

        </div>)}
    </>
  )
}

export default AuthLayout