

// import React, { useState, useEffect, useContext } from 'react';
// import { FaSignOutAlt, FaCompass, FaUserPlus } from 'react-icons/fa';
// import { AiFillHome } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';
// import Cookies from "js-cookie";
// import { AuthContext } from '../context/uisAuthenticated';

// const Sidebar = () => {
//   const [active, setActive] = useState(window.location.pathname.split('/')[1]);
//   const navigate = useNavigate();
//   const { userData,isLoading } = useContext(AuthContext);

//   if(isLoading){
//     return <div> ... </div>
//   }

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Cookies.remove('userId');
//     window.location.reload();
//   };

//   // useEffect(() => {
//   //   console.log('Sidebar: userData updated:', userData);
//   // }, [userData]);

//   const handleNavigate = (path, section) => {
//     setActive(section);
//     navigate(path);
//   };

//   return (
//     <div className="sidebar w-64 bg-white h-full rounded-md shadow-md flex flex-col items-center p-4">
//       {/* Profile */}
//       {
//         (active === 'profile' || active === 'editprofile') ? (
//           ""
//         ) : (
//           <div
//             className={`profile-section flex flex-col items-center mb-8 cursor-pointer ${active === 'profile' ? 'text-bold text-gray-800' : 'text-gray-600'
//               }`}
//             onClick={() => handleNavigate('/profile', 'profile')}
//           >
//             <div className="profile-pic h-24 w-24 rounded-full bg-gray-300 mb-4">
//             {userData && userData.profilePic ? (
//   <img
//     src={userData.profilePic}
//     alt="Profile"
//     className="h-full w-full rounded-full object-cover"
//   />
// ) : (
//   <img
//     alt="Profile"
//     className="h-full w-full rounded-full object-cover"
//   />
// )}
//             </div>
//             {
//               userData && userData.username ? (
//                 <div className="username text-xl font-semibold">{userData.username}</div>
//               ) : (
//                 " "
//               )
//             }
//           </div>
//         )
//       }

//       {/* Home */}
//       <div
//         className={`home w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${active === 'home' ? 'text-bold text-gray-800' : 'text-gray-600'
//           }`}
//         onClick={() => handleNavigate('/home', 'home')}
//       >
//         <AiFillHome className={`text-2xl mr-3 ${active === 'home' ? 'text-gray-800' : 'text-gray-600'}`} />
//         <span className="text-lg">Home</span>
//       </div>

//       {/* Explore */}
//       <div
//         className={`explore w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${active === 'explore' ? 'text-bold text-gray-800' : 'text-gray-600'
//           }`}
//         onClick={() => handleNavigate('/explore', 'explore')}
//       >
//         <FaCompass className={`text-2xl mr-3 ${active === 'explore' ? 'text-gray-800' : 'text-gray-600'}`} />
//         <span className="text-lg">Explore</span>
//       </div>

//       {/* Friend Requests */}
//       <div
//         className={`frnd-requests w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${active === 'frndRequests' ? 'text-bold text-gray-800' : 'text-gray-600'
//           }`}
//         onClick={() => handleNavigate('/frnd-req', 'frndRequests')}
//       >
//         <FaUserPlus className={`text-2xl mr-3 ${active === 'frndRequests' ? 'text-gray-800' : 'text-gray-600'}`} />
//         <span className="text-lg">Friend Requests</span>
//       </div>

//       {/* Logout */}
//       <div
//         className="logout w-full flex items-center p-4 cursor-pointer hover:bg-gray-100 rounded-md"
//         onClick={handleLogout}
//       >
//         <FaSignOutAlt className="text-2xl mr-3 text-gray-600" />
//         <span className="text-lg text-gray-600">Logout</span>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { FaSignOutAlt, FaCompass, FaUserPlus } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
// import { logout } from '../redux/actions/authActions'; // Import your logout action

const Sidebar = () => {
  const [active, setActive] = useState(window.location.pathname.split('/')[1]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // To dispatch actions
  const userData = useSelector((state) => state.auth.userData); // Access userData from Redux
  const isLoading = useSelector((state) => state.auth.isLoading); // Access loading state

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    // dispatch(logout()); // Dispatch logout action
    window.location.reload();
  };

  const handleNavigate = (path, section) => {
    setActive(section);
    navigate(path);
  };

  return (
    <div className="sidebar w-64 bg-white h-full rounded-md shadow-md flex flex-col items-center p-4">
      {/* Profile */}
      {
        (active === 'profile' || active === 'editprofile') ? (
          ""
        ) : (
          <div
            className={`profile-section flex flex-col items-center mb-8 cursor-pointer ${active === 'profile' ? 'text-bold text-gray-800' : 'text-gray-600'
              }`}
            onClick={() => handleNavigate('/profile', 'profile')}
          >
            <div className="profile-pic h-24 w-24 rounded-full bg-gray-300 mb-4">
              {userData && userData.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <img
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              )}
            </div>
            {
              userData && userData.username ? (
                <div className="username text-xl font-semibold">{userData.username}</div>
              ) : (
                " "
              )
            }
          </div>
        )
      }

      {/* Home */}
      <div
        className={`home w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${active === 'home' ? 'text-bold text-gray-800' : 'text-gray-600'
          }`}
        onClick={() => handleNavigate('/home', 'home')}
      >
        <AiFillHome className={`text-2xl mr-3 ${active === 'home' ? 'text-gray-800' : 'text-gray-600'}`} />
        <span className="text-lg">Home</span>
      </div>

      {/* Explore */}
      <div
        className={`explore w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${active === 'explore' ? 'text-bold text-gray-800' : 'text-gray-600'
          }`}
        onClick={() => handleNavigate('/explore', 'explore')}
      >
        <FaCompass className={`text-2xl mr-3 ${active === 'explore' ? 'text-gray-800' : 'text-gray-600'}`} />
        <span className="text-lg">Explore</span>
      </div>

      {/* Friend Requests */}
      <div
        className={`frnd-requests w-full flex items-center p-4 mb-4 cursor-pointer hover:bg-gray-100 rounded-md ${active === 'frndRequests' ? 'text-bold text-gray-800' : 'text-gray-600'
          }`}
        onClick={() => handleNavigate('/frnd-req', 'frndRequests')}
      >
        <FaUserPlus className={`text-2xl mr-3 ${active === 'frndRequests' ? 'text-gray-800' : 'text-gray-600'}`} />
        <span className="text-lg">Friend Requests</span>
      </div>

      {/* Logout */}
      <div
        className="logout w-full flex items-center p-4 cursor-pointer hover:bg-gray-100 rounded-md"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="text-2xl mr-3 text-gray-600" />
        <span className="text-lg text-gray-600">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
