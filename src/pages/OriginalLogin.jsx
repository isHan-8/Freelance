import React, { useState } from "react";
import "./OriginalLogin.css";
import { FaGreaterThan } from "react-icons/fa6";

const LoginPage = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`login-container ${isDark ? "dark" : "light"}`}>
   <label className="switch">
  <input type="checkbox" checked={isDark} onChange={toggleTheme} />
  <span className="slider round"></span>
</label>


      <div className="login-left">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form">
          <label>USERNAME</label>
          <input type="text" />
          <label>PASSWORD</label>
          <input type="password" />
          <button type="submit" className="login-button">
            LOGIN <FaGreaterThan className="arrow" />
          </button>
        </form>
      </div>

      <div className="login-right">
        <h1 className="brand-name">brandname</h1>
        <div className="features-box">
          <p>
            recent new features
            <br />
            in the app/web
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
