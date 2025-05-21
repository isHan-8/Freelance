import React, { useState, useEffect } from "react";
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
import "./LeftNavBar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function LeftNavBar({ theme, switchTheme }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 838);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 838);
    if (window.innerWidth >= 838) {
      setSidebarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !sidebarVisible && (
        <button className="toggleArrow" onClick={() => setSidebarVisible(true)}>
          <MdChevronRight size={24} />
        </button>
      )}

      {isMobile && sidebarVisible && (
        <button
          className="toggleArrow"
          onClick={() => setSidebarVisible(false)}
          style={{ left: "80px" }}
        >
          <MdChevronLeft size={24} />
        </button>
      )}

      <div
        className={`leftNavBar ${
          isMobile && !sidebarVisible ? "hiddenSidebar" : ""
        }`}
      >
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
    </>
  );
}

export default LeftNavBar;
