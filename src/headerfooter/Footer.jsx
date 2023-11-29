import React from 'react';
import { Link } from 'react-router-dom';
import '../css/headerfooter.css';

function Footer() {
  return (
    <footer className="footer">
      <nav>
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>
      <p>© 2023 Joseph Thompson</p>
    </footer>
  );
}

export default Footer;