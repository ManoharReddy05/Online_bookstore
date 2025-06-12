import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        Biblio-Heaven
      </div>
      <div className="navbar-buttons">
        <button className="nav-btn" onClick={() => navigate('/user')}>Home</button>
        {!isLoggedIn ? (
          <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
        ) : (
          <button className="nav-btn nav-btn-logout" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;