import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css'; // Importing CSS for styling

const SideMenu = ({ user }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      <div id="sideMenu" className="side-menu">
        <div className="menu-content">
          {/* Charactra Icon at the top */}
          <div className="top-menu">
            <Link to="/" className="menu-item" title="Charactra">
              <i className="fa-solid fa-gem"></i> {/* Change to the appropriate icon */}
            </Link>
          </div>
          {/* Main navigation menu */}
          <div className="main-menu">
            <Link to="/feed" className="menu-item" title="Feed">
              <i className="fa-solid fa-home"></i>
            </Link>
            <Link to="/dashboard" className="menu-item" title="Search">
              <i className="fa-solid fa-search"></i>
            </Link>
            <Link to="/create_post" className="menu-item" title="Post">
              <i className="fa-solid fa-plus-circle"></i>
            </Link>
            <Link to="/messages" className="menu-item" title="Messages">
              <i className="fa-solid fa-envelope"></i>
            </Link>
            <Link to="/notifications" className="menu-item" title="Notifications">
              <i className="fa-solid fa-bell"></i>
            </Link>
            <Link to="/events" className="menu-item" title="Events">
              <i className="fa-solid fa-calendar-days"></i>
            </Link>
            <Link to="/dating" className="menu-item" title="Dating">
              <i className="fa-solid fa-heart"></i>
            </Link>
            <Link to="/longs" className="menu-item" title="Longs">
              <i className="fa-solid fa-video"></i>
            </Link>
          </div>
          {/* Bottom navigation menu */}
          <div className="bottom-menu">
            {user && (
              <Link to={`/profile/${user.username}`} className="menu-item" title="Profile">
                <i className="fa-solid fa-user"></i>
              </Link>
            )}
            <div className="menu-item settings" onClick={toggleSettings} title="Settings">
              <i className="fa-solid fa-cog"></i>
            </div>
          </div>
        </div>
      </div>
      {/* Settings Overlay Panel */}
      {settingsOpen && (
        <div className="settings-panel">
          <div className="setting-item">
            Account Privacy:
            <label className="toggle-switch">
              <input type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
              <span className="slider">
                <i className="fa-solid fa-user-secret slider-icon left"></i>
                <i className="fa-solid fa-globe slider-icon right"></i>
              </span>
            </label>
          </div>
          <div className="setting-item">
            Theme Mode:
            <label className="toggle-switch">
              <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              <span className="slider">
                <i className="fa-solid fa-moon slider-icon left"></i>
                <i className="fa-solid fa-sun slider-icon right"></i>
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
