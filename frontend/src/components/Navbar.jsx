// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user info in localStorage
    const checkAuth = () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        setUser(parsed.user);
      } else {
        setUser(null);
      }
    };

    // Check on mount and when storage changes
    checkAuth();
    window.addEventListener('userLogin', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('userLogin', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🏅 Sportify</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/courts">Courts</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/membership">Membership</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
      <div className="nav-auth">
        {user ? (
          <div className="user-menu">
            <span>Welcome, {user.name}</span>
            {user.role === 'admin' && (
              <Link to="/admin" className="btn">Admin Dashboard</Link>
            )}
            {user.role === 'coach' && (
              <Link to="/coach" className="btn">Coach Dashboard</Link>
            )}
            <button
              onClick={() => {
                localStorage.removeItem('userInfo');
                setUser(null);
                navigate('/');
              }}
              className="btn btn-logout"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="btn">Login / Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
