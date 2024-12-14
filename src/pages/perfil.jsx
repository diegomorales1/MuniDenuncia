import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leerDesdeLocalStorage } from '../components/fileUtils';
import user from '../assets/user.png';
import camaraIcon from '../assets/camara.png';
import { toast } from 'react-hot-toast';



function Perfil() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCentered, setIsCentered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const usuario = leerDesdeLocalStorage('usuario') || {};
    setNombre(usuario.nombre || '');
    setCorreo(usuario.correo || '');
    setDireccion(usuario.direccion || '');
    setIsLoading(false);

    const timer = setTimeout(() => {
      setIsCentered(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCameraClick = () => {
    toast("Próximamente en MuniDenuncia", {
      icon: '🔥',
      duration: 1500,
    })
    setIsPopupVisible(true);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="layout_perfil">
      
      <div className="layout_perfil__header">
        <div 
          className={`profile-image-container`}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <img 
            src={user} 
            alt="logo" 
            className={`logo-header ${isCentered ? 'move-to-center' : ''} ${isHovered ? 'hovered' : ''}`} 
          />
          {isHovered && (
            <div className="icon-container" onClick={handleCameraClick}>
              <img src={camaraIcon} alt="Cambiar foto" className="icon" title="Cambiar foto" />
            </div>
          )}
        </div>
      </div>
      
      <div className="perfil-editable">
        <label>
          Nombre:
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} className='advertencia-form__label' placeholder="Julius Hibbert" readOnly />
        </label>
        <label>
          Correo:
          <input value={correo} onChange={(e) => setCorreo(e.target.value)} className='advertencia-form__label' placeholder="Julius.Hibbert@email.com" readOnly />
        </label>
        <label>
          Dirección:
          <input value={direccion} onChange={(e) => setDireccion(e.target.value)} className='advertencia-form__label' placeholder="Av Vicuna Mackenna 1234" readOnly />
        </label>
      </div>

      <div className="listado__footer">
        <button onClick={() => navigate('/')} className="listado__volver">
          Volver
        </button>
      </div>
    </div>
  );
}

export default Perfil;
