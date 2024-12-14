import React, { useState , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { leerDesdeLocalStorage, eliminarDeLocalStorage } from '../components/fileUtils';
import L from 'leaflet';

import iconAuto from "../assets/icon_auto.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";

const icons2 = {
  auto: new L.Icon({ iconUrl: iconAuto, iconSize: [32, 32], iconAnchor: [16, 16] }),
  ladron: new L.Icon({ iconUrl: iconLadron, iconSize: [32, 32], iconAnchor: [16, 16] }),
  poste: new L.Icon({ iconUrl: iconPoste, iconSize: [32, 32], iconAnchor: [16, 16] }),
  semaforo: new L.Icon({ iconUrl: iconSemaforo, iconSize: [32, 32], iconAnchor: [16, 16] }),
};

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locations = leerDesdeLocalStorage();
  const locationDetail = locations.find((loc) => loc.id === parseInt(id));
  const [partesDireccion, setPartesDireccion] = useState([]);
  const [gravedad, setGravedad] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  if (!locationDetail) {
    return <div className="detalle">Ubicación no encontrada</div>;
  };

  //Esto de aqui mira el tipo de denuncia
  const [tipo_denuncia, setTipo_denuncia] = useState(locationDetail.type);

  useEffect(() => {
    const transformarTipoDenuncia = (tipo) => {
      switch (tipo) {
        case "ladron":
          return "Ladrones en la zona";
        case "auto":
          return "Incidente con vehículos";
        case "poste":
          return "Problema de iluminación";
        case "semaforo":
          return "Semáforo dañado";
        default:
          return tipo; // Retorna el valor original si no coincide con ningún caso
      }
    };

    setTipo_denuncia(transformarTipoDenuncia(locationDetail.type));
  }, [locationDetail.type]);

  //Esto de aqui saca la direccion

  useEffect(() => {
    if (locationDetail) {
      const { lat, lng } = locationDetail;
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
        
          const defaultValues = {
            comuna: "Comuna no encontrada",
            calle: "Calle no encontrada",
            suburbio: "Suburbio no encontrado",
            region: "Región no encontrada"
          };
  
          // Verifica si data.address esta definido
          if (data.address) {
            // Extrae campos de address que da el mapa
            const comuna = data.address.city || data.address.town || data.address.village || data.address.neighbourhood || defaultValues.comuna;
            const calle = data.address.road || defaultValues.calle;
            const suburbio = data.address.suburb || defaultValues.suburbio;
            const region = data.address.state || defaultValues.region;
  
            // Direccion completa
            const direccionCompleta = `${calle}, ${suburbio ? suburbio + ', ' : ''}${comuna ? comuna + ', ' : ''}${region ? region + ', ' : ''}`;
  
            setPartesDireccion({
              comuna,
              direccion: direccionCompleta,
              calle,
              suburbio,
              region
            });
          } else {
            console.error("No se encontró la dirección en la respuesta.");
            setPartesDireccion(defaultValues);
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error al obtener la dirección:", error);
          setPartesDireccion({
            comuna: "Comuna no encontrada",
            calle: "Calle no encontrada",
            suburbio: "Suburbio no encontrado",
            region: "Región no encontrada"
          });
          setIsLoading(false);
        });
    }
  }, [locationDetail]);

  // Esto es para traducir la gravedad

  useEffect(() => {
    const transformarGravedad = (tipo) => {
      switch (tipo) {
        case "alto":
          return "Alta";
        case "medio":
          return "Media";
        case "baja":
          return "Baja";
        default:
          return "Por Definir"
      }
    };

     setGravedad(transformarGravedad(locationDetail.severity));
  }, [locationDetail.severity]);

  const handleDelete = () => {
    eliminarDeLocalStorage(locationDetail.id);
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  const getGravedadClass = (severity) => {
    if (severity === 'alto') {
      return 'detalle__gravedad alta'; // Clase para gravedad alta
    } else if (severity === 'medio') {
      return 'detalle__gravedad media'; // Clase para gravedad media
    } else if (severity == 'Por Definir'){
      return 'detalle__gravedad porDefinir'; // Clase para gravedad baja
    } else {
      return 'detalle__gravedad baja'; // Clase para gravedad baja
    }
  };

  return (
    <div className="detalle">
      <h2 className="detalle__titulo">{tipo_denuncia}</h2>
      <div className="alerta-icon-container">
        <img
          src={icons2[locationDetail.type].options.iconUrl}
          className="alerta-icon"
        />
      </div>

      <div className="detalle__info">

        <div className="detalle__gravedad-container">
        {isLoading ? (
            <div className="cargando-container">
              <div className="cargando-spinner"></div>
              <p className="cargando-text">Cargando dirección...</p>
            </div>
          ) : (
            <>
              <div className="detalle__info-item">
                <span className="detalle__info-label">Comuna: </span>
                <span className="detalle__info-value">{partesDireccion.suburbio}</span>
              </div>
              <div className="detalle__info-item">
                <span className="detalle__info-label">Dirección: </span>
                <span className="detalle__info-value">{partesDireccion.calle}</span>
              </div>
              <div className="detalle__gravedad">
                <span className="detalle__info-label">Gravedad: </span>
                <span className={getGravedadClass(locationDetail.severity)}>{gravedad}</span>
              </div>
            </>
          )}
        </div>

        <div className="detalle__descripcion-container">
          <p className="detalle__descripcion">{locationDetail.description}</p>
        </div>

      </div>

      <button onClick={handleBack} className="detalle__volver-boton">
        Volver
      </button>

    </div>
  );
}

export default Detalle;
