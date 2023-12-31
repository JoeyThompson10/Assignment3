import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/headerfooter.css';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="brand" onClick={() => navigate("/")}>
        SWE 4633 - Assignment 3 - Joseph Thompson
      </div>
      <nav className="navigation">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/about")}>About</button>
      </nav>
    </header>
  );
}

export default Header;
