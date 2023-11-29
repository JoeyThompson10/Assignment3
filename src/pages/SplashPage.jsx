import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/logo.svg';
import viteLogo from '../assets/vite.svg';

import '../css/SplashPage.css';

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-page">
      <div className="logo-container">
        <img src={reactLogo} className="logo react-logo" alt="React Logo" />
        <img src={viteLogo} className="logo vite-logo" alt="Vite Logo" />
      </div>
      <h1>Welcome to Joey's React Template!</h1>
    </div>
  );
}

export default SplashPage;
