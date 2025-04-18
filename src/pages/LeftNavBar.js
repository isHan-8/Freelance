import React from "react";
import "./LeftNavBar.css";
import { Link } from "react-router-dom";

import {
  MdOutlineExplore,
  MdMessage,
  MdSearch,
  MdNotifications,
  MdPerson,
} from "react-icons/md";
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
          <MdOutlineExplore className="menuIcon" />
          <span className="menuText">Explore</span>
        </div>

        <div className="menuItem hoverEffect">
          <MdMessage className="menuIcon" />
          <Link to="/chat" className="menuText">Messages</Link>
        </div>

        <div className="menuItem hoverEffect">
          <MdSearch className="menuIcon" />
          <span className="menuText">Search</span>
        </div>

        <div className="menuItem hoverEffect">
          <MdNotifications className="menuIcon" />
          <span className="menuText">Notifications</span>
        </div>
      </div>

      <div className="bottomMenu">
        <div className="menuItem1 hoverEffect">
          <TfiMenu className="menuIcon" />
          <span className="menuText">More</span>
        </div>
        <div className="menuItem1 hoverEffect">
          <MdPerson className="menuIcon" />
          <span className="menuText">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default LeftNavBar;
