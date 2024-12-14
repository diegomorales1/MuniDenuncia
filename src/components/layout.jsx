import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from '../pages/home_page';
import LightbulbPage from '../pages/lightbulb_page';
import Login from '../pages/login';
import Detalle from '../pages/detalle'; 
import NuevaAdvertencia from '../pages/NuevaAdvertencia'; 
import Listado from '../pages/Listado';
import Perfil from '../pages/perfil';

import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ toggleSidebar, isSidebarOpen, setIsSidebarOpen  }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login';
  const pageClass = hideHeaderFooter ? 'login-container' : 'layout__page';

  return (
    <div className="layout">
      <Toaster />
      {!hideHeaderFooter && <Header toggleSidebar={toggleSidebar} />}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`${pageClass} ${isSidebarOpen ? 'shifted' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lightbulb" element={<LightbulbPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/NuevaAdvertencia/:type" element={<NuevaAdvertencia />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="phone-simulator">
      <BrowserRouter>
        <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </BrowserRouter>
    </div>
  );
};

export default App;
