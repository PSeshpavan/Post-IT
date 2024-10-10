// import React, { useState, useEffect,useContext } from 'react';
// import CreatePost from "../../components/CreatePost";
// import DispFriends from "../../components/DispFriends";
// import Post from "../../components/Post";
// import axios from 'axios';
// import { AuthContext } from '@/context/uisAuthenticated';

// const Home = () => {
//   const [posts, setPosts] = useState([]); 
//   const [error, setError] = useState(null);
//   const { userData } = useContext(AuthContext); // State to handle errors

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/posts');
//         if (Array.isArray(response.data)) {
//           console.log("INSIDE HOME",response.data);
//           setPosts(response.data);
//         } else {
//           setError('API did not return an array');
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setError('Failed to fetch posts');
//       }
//     };

//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     console.log('HomePage: userData updated:', userData);
//   }, [userData]);


//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Main content area */}
//       <div className="flex-1 flex flex-col mx-4 lg:mr-[25%] lg:ml-8 space-y-4">
//         <section className="mt-4">
//           <CreatePost className="w-full bg-white rounded-lg shadow-md p-4"/>
//         </section>
//         <section className="flex-col flex-1 bg-white rounded-lg shadow-md p-4 justify-center pl-40">
//           {/* Display all the posts below here */}
//           {error ? (
//             <div className="text-red-500">{error}</div>
//           ) : (
//             posts.map((post) => (
//               <Post
//                 key={post._id}
//                 postId={post._id}
//                 username={post.userId.username}
//                 profilePic={post.userId.profilePic}
//                 postImages={post.postImages}
//                 postVideos={post.postVideos}
//                 caption={post.caption}
//               />
//             ))
//           )}
//         </section>
//       </div>

//       {/* DispFriends component */}
//       <section className="hidden lg:block fixed top-0 right-0 w-1/5 h-[95vh] bg-white rounded-lg shadow-md mt-4 mb-4 p-4 overflow-y-auto">
//         <DispFriends />
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreatePost from "../../components/CreatePost";
import DispFriends from "../../components/DispFriends";
import Post from "../../components/Post";
// import { fetchPosts } from '../../redux/actions/postActions'; // Import the fetchPosts action

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items); // Access posts from Redux store
  const error = useSelector((state) => state.posts.error); // Access error state from Redux store
  const userData = useSelector((state) => state.auth.userData); // Access userData from Redux store

  useEffect(() => {
    dispatch(fetchPosts()); // Fetch posts on component mount
  }, [dispatch]);

  useEffect(() => {
    console.log('HomePage: userData updated:', userData);
  }, [userData]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex-1 flex flex-col mx-4 lg:mr-[25%] lg:ml-8 space-y-4">
        <section className="mt-4">
          <CreatePost className="w-full bg-white rounded-lg shadow-md p-4" />
        </section>
        <section className="flex-col flex-1 bg-white rounded-lg shadow-md p-4 justify-center pl-40">
          {/* Display all the posts below here */}
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                username={post.userId.username}
                profilePic={post.userId.profilePic}
                postImages={post.postImages}
                postVideos={post.postVideos}
                caption={post.caption}
              />
            ))
          )}
        </section>
      </div>

      {/* DispFriends component */}
      <section className="hidden lg:block fixed top-0 right-0 w-1/5 h-[95vh] bg-white rounded-lg shadow-md mt-4 mb-4 p-4 overflow-y-auto">
        <DispFriends />
      </section>
    </div>
  );
};

export default Home;
