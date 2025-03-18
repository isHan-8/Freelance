import React, { useContext } from 'react';
import './PrivateLayout.css';
import SideMenu from './SideMenu';
import { AuthContext } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  return (
    <div className="private-layout" style={{ backgroundColor: '#212121', minHeight: '100vh' }}>
      <SideMenu user={user} /> {/* Pass user to SideMenu */}
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
