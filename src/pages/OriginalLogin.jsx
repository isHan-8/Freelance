import React from 'react';
import './OriginalLogin.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form">
          <label>USERNAME</label>
          <input type="text" />
          <label>PASSWORD</label>
          <input type="password" />
          <button type="submit" className="login-button">
            LOGIN <span className="arrow">▶</span>
          </button>
        </form>
      </div>
      <div className="login-right">
        <h1 className="brand-name">brandname</h1>
        <div className="features-box">
          <p>recent new features<br />in the app/web</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
