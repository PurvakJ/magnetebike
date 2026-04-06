import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaStore, FaStar, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/products', label: 'Products', icon: <FaStore /> },
    { path: '/client', label: 'Reviews', icon: <FaStar /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <nav className={`navbar ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-header">

        {/* Logo Image */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img
            src="https://i.postimg.cc/KYHcDfBJ/Gemini-Generated-Image-lnyaeylnyaeylnya.png"
            alt="Magnet eBike Logo"
            className="nav-logo-img"
          />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          </li>
        ))}

        {/* Divider before footer section */}
        <li className="nav-divider"></li>

        {/* Footer section */}
        <li className="nav-footer-section">
          <div className="nav-contact-info">
            {/* Add contact info here if needed */}
          </div>
        </li>

        <li className="nav-footer-text">
          <p className="nav-tagline">Experience the future of urban mobility</p>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;