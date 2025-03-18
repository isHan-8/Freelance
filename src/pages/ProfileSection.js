import React , {useState} from "react";
import "./ProfileSection.css";
import Left from "./Left"
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
    <label>
      BRIAN CHECKED INTO THE CLUBS MARRIOT
    </label>
    <div className="icons">
      <span>💬</span>
      <span>❤️</span>
    </div>
  </div>
  <div className="activity-item">
    <div className="activity-image">
      <img src="profile2.jpg" alt="Brian" />
    </div>
    <label>
      BRIAN VISITED AT GREEKWOOD GOLF CO
    </label>
    <div className="icons">
      <span>💬</span>
      <span>❤️</span>
    </div>
  </div>
  </div>

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
      <div className="content-container">{renderContent()}</div>
    </div>
    // </div>
  );
};
export default Profile;
