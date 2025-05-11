// // src/pages/Feed.js

// import React, { useState, useEffect, useContext } from 'react';
// import api from '../utils/api';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext
// import { useNavigate } from 'react-router-dom';
// import './Feed.css';

// const Feed = () => {
//   const { user, loading } = useContext(AuthContext); // Get user and loading status from context
//   const [stories, setStories] = useState([]); // Initialize stories as an empty array
//   const [posts, setPosts] = useState([]);
//   const [moodPopupVisible, setMoodPopupVisible] = useState(false);
//   const navigate = useNavigate();
//   const backendBaseURL = process.env.REACT_APP_API_BASE_URL;

//   const createImageUrl = (baseUrl, imagePath) => {
//     // Remove "api/" from the base URL if present
//     let modifiedBaseUrl = baseUrl.replace(/\/api\/?$/, '');
//     // Ensure that there is exactly one slash between the base URL and the image path
//     if (modifiedBaseUrl.endsWith('/') && imagePath.startsWith('/')) {
//       return `${modifiedBaseUrl}${imagePath.substring(1)}`;
//     } else if (!modifiedBaseUrl.endsWith('/') && !imagePath.startsWith('/')) {
//       return `${modifiedBaseUrl}/${imagePath}`;
//     } else {
//       return `${modifiedBaseUrl}${imagePath}`;
//     }
//   };

//   useEffect(() => {
//     // If loading is complete and user is not authenticated, redirect to login
//     // if (!loading && !user) {
//     //   navigate('/login');
//     // }

//     if (user) {
//       // Fetch stories and posts only if the user is authenticated
//       api.get('/api/stories/')
//         .then(response => {
//           setStories(Array.isArray(response.data) ? response.data : []);
//         })
//         .catch(error => {
//           console.error('Error fetching stories:', error);
//         });

//       api.get('/api/feed/posts/')
//         .then(response => {
//           setPosts(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching posts:', error);
//         });

//       // Show mood popup if not selected today
//       if (!sessionStorage.getItem('moodSelectedToday')) {
//         setTimeout(() => {
//           setMoodPopupVisible(true);
//         }, 10000); // 10 seconds delay
//       }
//     }
//   }, [user, loading, navigate]);

//   const handleMoodSubmit = (e) => {
//     e.preventDefault();
//     const mood = e.target.mood.value;
//     api.post('/api/accounts/set_mood/', { mood })
//       .then(() => {
//         sessionStorage.setItem('moodSelectedToday', true);
//         setMoodPopupVisible(false);
//       })
//       .catch(error => {
//         console.error('Error setting mood:', error);
//       });
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state if still fetching user data
//   }

//   return (
//     <div className="container mt-5">
//       {/* User Stories Carousel */}
//       <div id="userStoriesCarousel" className="owl-carousel owl-theme">
//         <div className="item add-story-container">
//           {/* <img   src={user.profile_picture_url} alt={user?.username ? `${user.username}'s profile` : 'Add Story'} /> */}
//           <div className="add-icon"><i className="fas fa-plus"></i></div>
//           <p>Your Story</p>
//         </div>
//         {stories.map(story => ( // Ensure stories is iterable
//           <div key={story.id} className="item text-center">
//             <img src={story.image_url} alt={`${story.username}'s story`} />
//             <p>{story.username}</p>
//           </div>
//         ))}
//       </div>

//       {/* Short-Form Content Section */}
//       <div id="shortFormContent">
//         <div className="row">
//           {posts.map(post => (
//             <div key={post.id} className="col-lg-4 col-md-6 mb-4">
//               <div className="card feed-post">
//                 {post.media_url && (
//                   post.media_type === 'image' ? (
//                     <img src={post.media_url} alt={`Post by ${post.username}`} className="card-img-top" />
//                   ) : (
//                     <video controls className="card-img-top">
//                       <source src={post.media_url} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   )
//                 )}
//                 <div className="card-body">
//                   <p>{post.content}</p>
//                   <p><small>{new Date(post.created_at).toLocaleString()}</small></p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mood Popup */}
//       {moodPopupVisible && (
//         <div id="moodPopup" className="mood-popup">
//           <div className="mood-popup-content">
//             <h5>How are you feeling today?</h5>
//             <form onSubmit={handleMoodSubmit}>
//               <select name="mood" className="form-select mb-3" required>
//                 <option value="" disabled>Select your mood</option>
//                 <option value="happy">Happy</option>
//                 <option value="sad">Sad</option>
//                 <option value="motivated">Motivated</option>
//                 <option value="reflective">Reflective</option>
//               </select>
//               <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;

// Feed.js
import React, { useState, useEffect } from "react";
import "./Feed.css";
import LeftNavBar from "./LeftNavBar";
import RightSidebar from "./RightSidebar";
import MainFeed from "./MainFeed";

function App() {
  const [theme, setTheme] = useState("light");

  // Apply theme to body
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="appLayout">
      <LeftNavBar theme={theme} switchTheme={switchTheme} />
      <MainFeed theme={theme} />
      <RightSidebar theme={theme} />
    </div>
  );
}

export default App;
