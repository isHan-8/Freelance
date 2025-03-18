import React from "react";
import "./LeftNavBar.css"; // You can create a separate CSS file if you need
import { Link } from "react-router-dom";

import {
  MdOutlineExplore,
  MdMessage,
  MdSearch,
  MdNotifications,
  MdPerson,
} from "react-icons/md"; // Import the necessary icons
import { TfiMenu } from "react-icons/tfi";

function LeftNavBar() {
  return (
    <div className="leftNavBar">
      <div className="profileSection">
        <div className="profilePicContainer">
          <img src="./logo192.png" alt="Mark Henry" className="profilePic" />
          <img src="./logo192.png" alt="Overlay" className="overlayPic" />
        </div>
        <h4 className="using">Mark Henry</h4>
        <p className="username">@thebbhenry</p>
      </div>
      <div className="navMenu">
        <div className="menuItem hoverEffect active">
          <MdOutlineExplore className="menuIcon" /> Explore
        </div>
        <div className="menuItem hoverEffect">
          <MdMessage className="menuIcon" />
          <Link to="/chat" style={{ textDecoration: "none", color: "inherit" }}>
            Messages
          </Link>
        </div>

        <div className="menuItem hoverEffect">
          <MdSearch className="menuIcon" /> Search
        </div>
        <div className="menuItem hoverEffect">
          <MdNotifications className="menuIcon" /> Notifications
        </div>
      </div>
      <div className="bottomMenu">
        <div className="menuItem1 hoverEffect">
          <TfiMenu className="menuIcon" /> More
        </div>
        <div className="menuItem1 hoverEffect">
          <MdPerson className="menuIcon" /> Profile
        </div>
      </div>
    </div>
  );
}

export default LeftNavBar;
