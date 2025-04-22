import React from 'react';
import './Header.css';
import Logo1 from '../../uiComponents/AppLogo/Logo1.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="header-left">
        <h1 className="header-title">
          <span className="header-title-bold">W</span>ealthVista
        </h1>
        <h2 className="header-subtitle">Welcome to WealthVista!</h2>
        <p className="header-description">
          Explore your financial goals and track your progress with ease.
        </p>
        <div className="header-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/signin')}>
            Sign In
          </button>
        </div>
      </div>
      <div className="header-right">
        <img src={Logo1} alt="Wealth illustration" className="header-image" />
      </div>
    </div>
  );
};

export default Header;
