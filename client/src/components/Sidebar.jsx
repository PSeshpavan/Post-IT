import React, { useState, useEffect } from 'react';
import { FaBookmark, FaSignOutAlt, FaCompass, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [profile, setProfile] = useState({ username: '', profilePic: '' });
  const [active, setActive] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setProfile({
                    "username": response.data.username,
                    "profilePic": response.data.profilePic
                  });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
        // Perform logout logic here (e.g., clearing tokens, user data, etc.)
        navigate('/login');
      };

  const handleNavigate = (path, section,e) => {
    setActive(section);
    navigate(path);
  };

  return (
    <div className="sidebar w-64 h-screen bg-white shadow-md flex flex-col items-center p-4">
      {/* Profile Section */}
      <div
        className={`profile-section flex flex-col items-center mb-8 cursor-pointer ${
          active === 'profile' ? 'text-bold text-gray-800' : 'text-gray-600'
        }`}
        onClick={() => handleNavigate('/profile', 'profile')}
      >
        <div className="profile-pic h-24 w-24 rounded-full bg-gray-300 mb-4">
          {profile.profilePic && (
            <img
              src={profile.profilePic}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="username text-xl font-semibold">{profile.username}</div>
      </div>

      {/* Explore */}
      <div
        className={`explore w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${
          active === 'explore' ? 'text-bold text-gray-800' : 'text-gray-600'
        }`}
        onClick={() => handleNavigate('/explore', 'explore')}
      >
        <FaCompass className={`text-2xl mr-3 ${active === 'explore' ? 'text-gray-800' : 'text-gray-600'}`} />
        <span className="text-lg">Explore</span>
      </div>

      {/* Saved Posts */}
      <div
        className={`saved-posts w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${
          active === 'savedPosts' ? 'text-bold text-gray-800' : 'text-gray-600'
        }`}
        onClick={() => handleNavigate('/saved-posts', 'savedPosts')}
      >
        <FaBookmark className={`text-2xl mr-3 ${active === 'savedPosts' ? 'text-gray-800' : 'text-gray-600'}`} />
        <span className="text-lg">Saved Posts</span>
      </div>

      {/* Logout */}
      <div
        className="logout w-full flex items-center p-4 cursor-pointer hover:bg-gray-100 rounded-md"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="text-2xl mr-3 text-gray-600" />
        <span className="text-lg">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
