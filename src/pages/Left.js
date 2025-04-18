import React, { useState } from "react";
import "./ProfileSection.css";
import Left from "./Left";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("POSTS");

  const renderContent = () => {
    switch (activeTab) {
      case "POSTS":
        return (
          <div className="content">
            <div className="images-row">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Post 1"
                className="post-image"
              />
              <img
                src="https://via.placeholder.com/300x200"
                alt="Post 2"
                className="post-image"
              />
              <img
                src="https://via.placeholder.com/300x200"
                alt="Post 3"
                className="post-image"
              />
            </div>
            <p>This is the POSTS content with three example images.</p>
          </div>
        );
      case "COLLABORATE":
        return <div className="content">This is the COLLABORATE content.</div>;
      case "ABOUT ME":
        return <div className="content">This is the ABOUT ME content.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <Left />
      <div className="profile-container">
        {/* Profile Header and Content */}
        <div className="header">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <h1 className="heading">BRIAN DAVES</h1>
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

        {/* Footer Tabs */}
        <div className="footer">
          <div
            className={`footer-item ${activeTab === "POSTS" ? "active" : ""}`}
            onClick={() => setActiveTab("POSTS")}
          >
            POSTS
          </div>
          <div
            className={`footer-item ${activeTab === "COLLABORATE" ? "active" : ""}`}
            onClick={() => setActiveTab("COLLABORATE")}
          >
            COLLABORATE
          </div>
          <div
            className={`footer-item ${activeTab === "ABOUT ME" ? "active" : ""}`}
            onClick={() => setActiveTab("ABOUT ME")}
          >
            ABOUT ME
          </div>
        </div>

        {/* Render the content based on active tab */}
        <div className="content-container">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
