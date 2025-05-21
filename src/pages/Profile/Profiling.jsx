import React, { useState } from "react";
import "./Profiling.css";
import Left from "./Left";
import { FaRegCommentDots, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("POSTS");
  const [likedItems, setLikedItems] = useState({ 0: false, 1: false });

  const toggleLike = (index) => {
    setLikedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="profile-page">
      <Left />
      <div className="profile-container">
        <div className="header">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 className="heading">BRIAN DAVES</h1>
            <button className="responsive-button">
                <FiEdit2 style={{ marginRight: "4px" }} />
                Edit
              </button>
            </div>

            <p className="headingg">@davey_brian</p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">90</span>
                <span className="stat-label">POSTS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.5k</span>
                <span className="stat-label">FOLLOWERS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.7</span>
                <span className="stat-label">SCORE</span>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="reviews-traits-container">
          <div className="reviews">
            <h3>REVIEWS</h3>
            <div className="review-item">
              <div className="review-content">
                <div className="review-header">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Reviewer"
                    className="reviewer-image"
                  />
                  <div className="reviewer-name">NAME</div>
                </div>
                <div className="review-message">
                  Message here (Shared with [Name])
                </div>
              </div>
            </div>
            <div className="review-item">
              <div className="review-content">
                <div className="review-header">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Reviewer"
                    className="reviewer-image"
                  />
                  <div className="reviewer-name">NAME</div>
                </div>
                <div className="review-message">
                  Message here (Shared with [Name])
                </div>
              </div>
            </div>
          </div>

          <div className="traits">
            <h3>TRAITS</h3>
            <div className="trait-container">
              <div className="trait-item">
                <div className="trait-number">3.9</div>
                <div className="trait-label">Category</div>
              </div>
              <div className="trait-item">
                <div className="trait-number">4.6</div>
                <div className="trait-label">Category</div>
              </div>
              <div className="trait-item">
                <div className="trait-number">4.4</div>
                <div className="trait-label">Category</div>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h3>RECENT ACTIVITY</h3>
          <div className="activity-item">
            <div className="activity-image">
              <img src="profile1.jpg" alt="Brian" />
            </div>
            <label>BRIAN CHECKED INTO THE CLUBS MARRIOT</label>
            <div className="icons">
              <FaRegCommentDots className="icon" />
              {likedItems[0] ? (
                <FaHeart className="icon red" onClick={() => toggleLike(0)} />
              ) : (
                <FaRegHeart className="icon" onClick={() => toggleLike(0)} />
              )}
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-image">
              <img src="profile2.jpg" alt="Brian" />
            </div>
            <label>BRIAN VISITED AT GREEKWOOD GOLF CO</label>
            <div className="icons">
              <FaRegCommentDots className="icon" />
              {likedItems[1] ? (
                <FaHeart className="icon red" onClick={() => toggleLike(1)} />
              ) : (
                <FaRegHeart className="icon" onClick={() => toggleLike(1)} />
              )}
            </div>
          </div>
        </div>

        <div className="profile-tabs-container">
          {/* Footer Tabs */}
          <div className="footer">
            <div
              className={`footer-item ${activeTab === "POSTS" ? "active" : ""}`}
              onClick={() => setActiveTab("POSTS")}
            >
              POSTS
            </div>
            <div
              className={`footer-item ${
                activeTab === "COLLABORATE" ? "active" : ""
              }`}
              onClick={() => setActiveTab("COLLABORATE")}
            >
              COLLABORATE
            </div>
            <div
              className={`footer-item ${
                activeTab === "ABOUT ME" ? "active" : ""
              }`}
              onClick={() => setActiveTab("ABOUT ME")}
            >
              ABOUT ME
            </div>
          </div>

   
          <div className="content-container">
            {activeTab === "POSTS" && (
              <div className="content">
                <div className="images-row">
                  <img
                    src="https://images.unsplash.com/photo-1702043541557-84015adfedfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpwZ3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Post 1"
                    className="post-image"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1702043541557-84015adfedfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpwZ3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Post 2"
                    className="post-image"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1702043541557-84015adfedfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpwZ3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Post 3"
                    className="post-image"
                  />
                </div>
                <p>This is the POSTS content with three example images.</p>
              </div>
            )}
            {activeTab === "COLLABORATE" && (
              <div className="content">
                Just the day before, our host had written of the challenges of
                writing short. In journalism–my friend’s chosen trade, and
                mostly my own, too– Mark Twain’s observation undoubtedly
                applies: “I didn’t have time to write a short letter, so I wrote
                a long one instead.” The principle holds across genres...
                (trimmed for brevity)
              </div>
            )}
            {activeTab === "ABOUT ME" && (
              <div className="content">
                Have time to write a short letter, so I wrote a long one
                instead.” The principle holds across genres... (trimmed for
                brevity)
              </div>
            )}
          </div>
        </div>
      </div>
      //{" "}
    </div>
  );
};
export default Profile;
