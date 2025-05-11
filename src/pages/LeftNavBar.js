// LeftNavBar.js
import React from "react";
import { useState } from "react";

import "./LeftNavBar.css";
import { Link } from "react-router-dom";
import {
  MdOutlineExplore,
  MdMessage,
  MdSearch,
  MdNotifications,
  MdPerson,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";
import { TfiMenu } from "react-icons/tfi";

function LeftNavBar({ theme, switchTheme }) {
  const [hovered, setHovered] = useState(false);

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
          <MdOutlineExplore className="menuIcon" />
          <span className="menuText">Explore</span>
        </div>

        <div className="menuItem hoverEffect">
          <MdMessage className="menuIcon" />
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <span className="link-text">Messages</span>
          </Link>
        </div>

        <div className="menuItem hoverEffect">
          <MdSearch className="menuIcon" />
          <Link to="/filter" style={{ textDecoration: "none" }}>
            <span className="link-text">Search</span>
          </Link>
        </div>

        <div className="menuItem hoverEffect">
          <MdNotifications className="menuIcon" />
          <span className="menuText">Notifications</span>
        </div>

        {/* Add Theme Toggle Button */}
        <div className="menuItem hoverEffect" onClick={switchTheme}>
          {theme === "light" ? (
            <MdDarkMode className="menuIcon" />
          ) : (
            <MdLightMode className="menuIcon" />
          )}
          <span className="menuText">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>

      <div className="bottomMenu">
        <div className="menuItem1 hoverEffect">
          <TfiMenu className="menuIcon" />
          <span className="menuText">More</span>
        </div>
        <div className="menuItem1 hoverEffect">
          <MdPerson className="menuIcon" />
          <Link to="/Profile" style={{ textDecoration: "none" }}>
            <span className="link-text">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftNavBar;
