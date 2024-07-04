import React, { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import CreatePost from '../../components/CreatePost';
import DispFriends from '../../components/DispFriends';


const Home = () => {
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    delete axios.defaults.headers.common['Authorization'];
    window.location.reload();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <section className="">
        <CreatePost />
      </section>
      <section>
        {/* Display all the posts */}
      </section>
      <section className="">
        <DispFriends />
      </section>
    </div>

  )
}

export default Home