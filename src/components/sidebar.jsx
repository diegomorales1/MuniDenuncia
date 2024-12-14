import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import user from '../assets/user.png';
import menu from '../assets/menu.png';
import mapa from '../assets/mapa.png';
import lista from '../assets/lista.png';
import pin from '../assets/pin.png';
import config from '../assets/config.png';
import salir from '../assets/salida.png';
import appIcon from '../assets/icono.png';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarRef = useRef(null);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const SidebarLink = ({ to, onClick, label, icon}) => (
    <li>
      <NavLink 
        to={onClick ? null : to}
        className={({ isActive }) => 
          `nav-bar__link ${isActive && !onClick ? 'nav-bar__link--active' : ''}`
        }
        onClick={closeSidebar}
      >
        {icon && <img src={icon} alt="" className="sidebar-icon" />}
        <span onClick={onClick || null} className="links">{label}</span>
      </NavLink>
    </li>

  );

  const handleClickWithPopup = (e) => {
    e.preventDefault();
    toast("Próximamente en MuniDenuncia", {
      icon: '🔥',
      duration: 1500,
    });
    closeSidebar();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <img src={appIcon} alt="App Icon" className="app-icon" />
          <span className="logo-name">MuniDenuncia</span>
          <img name="menu" className="sidebar__close-btn" src={menu} onClick={closeSidebar} alt="Cerrar Sidebar" />
        </div>

        <div className="user-container">
          <NavLink to="/perfil" onClick={closeSidebar}>
          <img className="perfil" src={user} alt="perfil" />
          </NavLink>
          <div className="user-details">
            <div className="name">Julius Hibbert</div>
          </div>
        </div>

        <ul className="nav-container">
          <SidebarLink to="/" label="Mapa" icon={mapa}/>
          <SidebarLink to="/listado" label="Denuncias cercanas" icon={lista}/>

          <SidebarLink to="#" onClick={handleClickWithPopup} label="Ubicaciones favoritas" icon={pin}/>
          <SidebarLink to="#" onClick={handleClickWithPopup} label="Configuración" icon={config}/>
          
          <SidebarLink to="#" onClick={handleClickWithPopup} label="Cerrar sesión" icon={salir}/>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
