// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">Memory Game</div>
//       <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
//         {/* <li><a href="#home">Home</a></li>
//         <li><a href="#about">About</a></li>
//         <li><a href="#contact">Contact</a></li> */}
//       </ul>
//       <button className="navbar-toggle" onClick={toggleMenu}>
//         <span className="bar"></span>
//         <span className="bar"></span>
//         <span className="bar"></span>
//       </button>
//     </nav>
//   );
};

export default Navbar;
