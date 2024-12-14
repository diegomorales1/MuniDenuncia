// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MuniLogo from '../assets/icono.png';
import ususario from '../assets/user.png';
import menu from '../assets/menu.png';

export const Header = ({ toggleSidebar }) => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    toggleSidebar();
  };

  return (
    <div className='layout_header'>
      <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img className='logo' src={menu} alt='logo' />
      </div>
      <h1 className='layout__title'>MuniDenuncia</h1>
      <Link to="/perfil">
        <img className="perfil" src={ususario} alt="perfil" />
      </Link>
    </div>
  );
};

export default Header;
