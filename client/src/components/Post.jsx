// import React, { useState, useEffect } from 'react';
// import { FaHeart, FaRegHeart, FaComment, FaRegComment } from 'react-icons/fa';
// import { PiPaperPlaneTiltFill, PiPaperPlaneTiltBold } from 'react-icons/pi';
// import axios from 'axios';

// const PHeader = ({ username, profilePic }) => {
//   return (
//     <div className="head flex items-center gap-4 rounded-t-2xl h-16 w-full bg-green-300">
//       <div className="flex items-center ml-3 gap-3">
//         <div className="dp h-9 w-9 rounded-full bg-black overflow-hidden">
//           <img src={profilePic} alt={username} className="h-full w-full object-cover" />
//         </div>
//         <div className="username text-xl font-semibold">{username}</div>
//       </div>
//     </div>
//   );
// };

// const PFooter = ({ postId, username, caption, likes, comments, onLike, onComment, showComments, setShowComments }) => {
//   const [liked, setLiked] = useState(false);
//   const [newComment, setNewComment] = useState('');

//   const handleLike = async () => {
//     setLiked(!liked);
//     await onLike(postId, !liked);
//   };

//   const handleAddComment = async () => {
//     if (newComment.trim()) {
//       await onComment(postId, newComment);
//       setNewComment('');
//     }
//   };

//   return (
//     <div className="flex flex-col items-start pt-2 px-3 gap-4 w-full">
//       <div className="icons flex gap-4 items-center w-full">
//         <div className="heart flex gap-1.5 items-center">
//           {liked ? (
//             <FaHeart className="text-red-500 text-3xl cursor-pointer" onClick={handleLike} />
//           ) : (
//             <FaRegHeart className="text-slate-500 text-3xl cursor-pointer" onClick={handleLike} />
//           )}
//           <span>{likes} Likes</span>
//         </div>
//         <div className="comment flex gap-1.5 items-center">
//           {showComments ? ( 
//             <FaComment className="text-blue-500 text-3xl cursor-pointer" onClick={() => setShowComments(!showComments)} />
//           ) : (
//             <FaRegComment className="text-slate-500 text-3xl cursor-pointer" onClick={() => setShowComments(!showComments)} />
//           )
//         }
//           <span>{comments.length} Comments</span>
//         </div>
//         <div className="share flex gap-2 items-center">
//           <PiPaperPlaneTiltBold className="text-slate-500 text-3xl rotate-45 cursor-pointer" />
//           <span>Share</span>
//         </div>
//       </div>
//       <div>
//         <div className="caption text-xl font-semibold">{username}</div>
//         <div>{caption}</div>
//       </div>
      
//       {showComments && (
//         <div className="comments w-full mt-2">
//           <div className="max-h-40 overflow-y-auto">
//             {comments.map((comment, index) => (
//               <div key={index} className="mb-1">
//                 <span className="font-semibold">{comment.username}: </span>
//                 {comment.text}
//               </div>
//             ))}
//           </div>
//           <div className=" w-full flex items-center gap-3 p-3">
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Add a comment..."
//               className="w-full border rounded px-2 py-1"
//             />
//             <button
//               onClick={handleAddComment}
//               className=" bg-blue-500 text-white px-2 py-1 rounded"
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const PImg = ({ src }) => {
//   return (
//     <div className="w-full h-[400px]">
//       <img src={src} alt="" className="h-full w-full object-cover" />
//     </div>
//   );
// };

// const Post = ({ postId, username, profilePic, postImage, caption }) => {
// // const Post = (
// //   { postId="123",
// //       username="JohnDoe",
// //       profilePic="https://example.com/profile.jpg",
// //       postImage="https://example.com/post.jpg",
// //       caption="This is my awesome post!" 
// //     }
// // ) => {
//   const [postData, setPostData] = useState({
//     likes: 0,
//     comments: []
//   });
//   const [showComments, setShowComments] = useState(false);

//   useEffect(() => {
//     fetchPostData();
//   }, [postId]);

//   const fetchPostData = async () => {
//     try {
//       const response = await axios.get(`/api/posts/${postId}`);
//       setPostData(response.data);
//     } catch (error) {
//       console.error('Error fetching post data:', error);
//     }
//   };

//   const handleLike = async (postId, isLiked) => {
//     try {
//       const response = await axios.post(`/api/posts/${postId}/like`, { isLiked });
//       setPostData(prevData => ({ ...prevData, likes: response.data.likes }));
//     } catch (error) {
//       console.error('Error updating like:', error);
//     }
//   };

//   const handleComment = async (postId, commentText) => {
//     try {
//       const response = await axios.post(`/api/posts/${postId}/comment`, {
//         text: commentText,
//         userId: currentUserId, 
//         username: currentUsername
//       });
//       setPostData(prevData => ({ ...prevData, comments: response.data.comments }));
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center p-4">
//       <div className={`Post Container w-[382px] flex flex-col rounded-2xl border-2 border-slate-400 ${showComments ? 'max-h-[800px]' : 'h-[566.5px]'} transition-all duration-300`}>
//         <PHeader username={username} profilePic={profilePic} />
//         <PImg src={postImage} />
//         <PFooter
//           postId={postId}
//           username={username}
//           caption={caption}
//           // likes={postData.likes}
//           likes={12000}
//           // comments={postData.comments}
//           comments={[{ username: 'Pavan', text: 'Nice post!' }, { username: 'John', text: 'Great pic!' }, { username: 'Jane', text: 'Awesome!' }, { username: 'Alice', text: 'Cool!' }]}
//           onLike={handleLike}
//           onComment={handleComment}
//           showComments={showComments}
//           setShowComments={setShowComments}
//         />
//       </div>
//     </div>
//   );
// };

// export default Post;

import React, { useState, useEffect, useContext } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaRegComment, FaCheck } from 'react-icons/fa';
import { PiPaperPlaneTiltBold } from 'react-icons/pi';
import axios from 'axios';
import { FriendsContext } from '../context/FriendsContext';

const PHeader = ({ username, profilePic, isFriendState, handleAddFriend }) => {
  return (
    <div className="head flex items-center justify-between gap-4 rounded-t-2xl h-16 w-full bg-green-300 p-3">
      <div className="flex items-center gap-3">
        <div className="dp h-9 w-9 rounded-full bg-black overflow-hidden">
          <img src={profilePic} alt={username} className="h-full w-full object-cover" />
        </div>
        <div className="username text-xl font-semibold">{username}</div>
      </div>
      <div className="add-friend">
        {!isFriendState ? (
          <button
            onClick={handleAddFriend}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg"
          >
            Add Friend
          </button>
        ) : (
          <FaCheck className="text-green-500 text-2xl" />
        )}
      </div>
    </div>
  );
};

const PFooter = ({ postId, username, caption, likes, comments, onLike, onComment, showComments, setShowComments }) => {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    setLiked(!liked);
    await onLike(postId, !liked);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await onComment(postId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="flex flex-col items-start pt-2 px-3 gap-4 w-full">
      <div className="icons flex gap-4 items-center w-full">
        <div className="heart flex gap-1.5 items-center">
          {liked ? (
            <FaHeart className="text-red-500 text-3xl cursor-pointer" onClick={handleLike} />
          ) : (
            <FaRegHeart className="text-slate-500 text-3xl cursor-pointer" onClick={handleLike} />
          )}
          <span>{likes} Likes</span>
        </div>
        <div className="comment flex gap-1.5 items-center">
          {showComments ? (
            <FaComment className="text-blue-500 text-3xl cursor-pointer" onClick={() => setShowComments(!showComments)} />
          ) : (
            <FaRegComment className="text-slate-500 text-3xl cursor-pointer" onClick={() => setShowComments(!showComments)} />
          )}
          <span>{comments.length} Comments</span>
        </div>
        <div className="share flex gap-2 items-center">
          <PiPaperPlaneTiltBold className="text-slate-500 text-3xl rotate-45 cursor-pointer" />
          <span>Share</span>
        </div>
      </div>
      <div>
        <div className="caption text-xl font-semibold">{username}</div>
        <div>{caption}</div>
      </div>
      
      {showComments && (
        <div className="comments w-full mt-2">
          <div className="max-h-40 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="mb-1">
                <span className="font-semibold">{comment.username}: </span>
                {comment.text}
              </div>
            ))}
          </div>
          <div className=" w-full flex items-center gap-3 p-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border rounded px-2 py-1"
            />
            <button
              onClick={handleAddComment}
              className=" bg-blue-500 text-white px-2 py-1 rounded"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PImg = ({ src }) => {
  return (
    <div className="w-full h-[400px]">
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
};

const Post = ({ postId, username, profilePic, postImage, caption }) => {
  const [postData, setPostData] = useState({
    likes: 0,
    comments: []
  });
  const [showComments, setShowComments] = useState(false);
  const { addFriend, isFriend } = useContext(FriendsContext);
  const [isFriendState, setIsFriendState] = useState(false);

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  useEffect(() => {
    setIsFriendState(isFriend(username)); // Update when friends list changes
  }, [isFriend, username]);

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      setPostData(response.data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  const handleLike = async (postId, isLiked) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`, { isLiked });
      setPostData(prevData => ({ ...prevData, likes: response.data.likes }));
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comment`, {
        text: commentText,
        userId: currentUserId, 
        username: currentUsername
      });
      setPostData(prevData => ({ ...prevData, comments: response.data.comments }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddFriend = async () => {
    const newFriend = {
      id: username, // Assuming username is unique and used as userId
      name: username,
      profilePic: profilePic,
    };
    try {
      await addFriend(newFriend);
      setIsFriendState(true);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`Post Container w-[382px] flex flex-col rounded-2xl border-2 border-slate-400 ${showComments ? 'max-h-[800px]' : 'h-[566.5px]'} transition-all duration-300`}>
        <PHeader 
          username={username} 
          profilePic={profilePic} 
          isFriendState={isFriendState} 
          handleAddFriend={handleAddFriend} 
        />
        <PImg src={postImage} />
        <PFooter
          postId={postId}
          username={username}
          caption={caption}
          // likes={postData.likes}
          likes={12000}
          // comments={postData.comments}
          comments={[{ username: 'Pavan', text: 'Nice post!' }, { username: 'John', text: 'Great pic!' }, { username: 'Jane', text: 'Awesome!' }, { username: 'Alice', text: 'Cool!' }]}
          onLike={handleLike}
          onComment={handleComment}
          showComments={showComments}
          setShowComments={setShowComments}
        />
      </div>
    </div>
  );
};

export default Post;
