import React, { useState } from "react";
import "./Left.css";
import {
  FaRegEdit,
  FaRegStar,
  FaFolderOpen,
  FaRegClock,
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  return (
    <aside className={`sidebar ${darkMode ? "dark" : "light"}`}>
      <div className="brand">brandname.co</div>
      <nav className="menu">
        <ul>
          <li>
            <FaRegEdit className="icon" />
            <span>Create</span>
          </li>
          <li>
            <FaRegStar className="icon" />
            <span>Highlights</span>
          </li>
          <li>
            <FaFolderOpen className="icon" />
            <span>Archive</span>
          </li>
          <li>
            <FaRegClock className="icon" />
            <span>Activity</span>
          </li>
          <li>
            <FaBars className="icon" />
            <span>More</span>
          </li>

          <li onClick={toggleTheme}>
            {darkMode ? (
              <FaSun className="icon" />
            ) : (
              <FaMoon className="icon" />
            )}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </li>
        </ul>
      </nav>
      <div className="bottom">
        <button className="logout">
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </button>
        <button className="profile">
          <FaUser className="icon" />
          <span>Profile</span>
        </button>
      </div>
    </aside>
  );
}
