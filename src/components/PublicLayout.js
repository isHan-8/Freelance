import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './PublicLayout.css'; // Importing CSS for styling

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <header className="header">
        <h1 className="logo">Charectra</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
