import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import { leerDesdeLocalStorage } from '../components/fileUtils';
import inicializarPuntosDePrueba from '../pages/puntosFijos';

import warningIcon from "../assets/megafono.png";
import iconAuto from "../assets/icon_auto.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";
import iconLista from "../assets/lista.png";

const icons2 = {
  auto: new L.Icon({ iconUrl: iconAuto, iconSize: [32, 32], iconAnchor: [16, 16] }),
  ladron: new L.Icon({ iconUrl: iconLadron, iconSize: [32, 32], iconAnchor: [16, 16] }),
  poste: new L.Icon({ iconUrl: iconPoste, iconSize: [32, 32], iconAnchor: [16, 16] }),
  semaforo: new L.Icon({ iconUrl: iconSemaforo, iconSize: [32, 32], iconAnchor: [16, 16] }),
};

const icons = {
  auto: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconAuto}" class="icon" alt="Auto Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  ladron: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconLadron}" class="icon" alt="Ladron Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  poste: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconPoste}" class="icon" alt="Poste Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  semaforo: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconSemaforo}" class="icon" alt="Semaforo Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
};

function AddMarkers() {
  const map = useMap();
  const navigate = useNavigate();
  inicializarPuntosDePrueba();
  const locations = leerDesdeLocalStorage();

  useEffect(() => {
    // Limpia todos los marcadores existentes antes de añadir nuevos
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    locations.forEach((location) => {
      const icon = icons[location.type] || icons["default"];
      L.marker([location.lat, location.lng], { icon: icon })
        .addTo(map)
        .on("click", () => navigate(`/detalle/${location.id}`));
    });
  }, [map, navigate, locations]);

  return null;
}

function Maps() {
  const [showIcons, setShowIcons] = useState(false);
  const [currentPosition, setCurrentPosition] = useState([-33.5060, -70.6120]);
  const navigate = useNavigate();
  const [listaClass, setListaClass] = useState("1");

  const handleMapMoveEnd = (map) => {
    setCurrentPosition(map.getCenter());
  };

  const handleIconClick = (type) => {
    navigate(`/NuevaAdvertencia/${type}`, { state: { currentPosition } });
  };

  const toggleIcons = () => {
    setShowIcons((prev) => !prev);
    if(showIcons){
      setListaClass("1");
    } else {
      setListaClass("2");
    }
  };

  const getClassLista = (clase) => {
    if (clase === '1') {
      return 'lista-container1';
    } 
    
    return 'lista-container2';
  };

  return (
    <MapContainer
      center={currentPosition}
      zoom={16}
      style={{ height: "742px", width: "100%" }}
      doubleClickZoom={false}
      whenCreated={(map) => {
        map.on("moveend", () => handleMapMoveEnd(map));
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkers />
      <div className="warnings-button-container">
        <div className={getClassLista(listaClass)}>
          <img src={iconLista} alt="Lista de Puntos" className="icon-lista" onClick={() => navigate('/listado')}/>
          <div className="lista-text">Denuncias<br></br> cercanas</div>
        </div>
        {showIcons && (
          <div className="warnings-icons">
            {Object.keys(icons).map((type) => (
              <img
                key={type}
                src={icons2[type].options.iconUrl}
                alt={type}
                onClick={() => handleIconClick(type)}
                className="warning-icon"
              />
            ))}
          </div>
        )}
        <div className="warning-icon-container" onClick={toggleIcons}>
          <img src={warningIcon} alt="Advertencia" className="warning-icon" />
          <div className="warning-label">Denuncia</div>
        </div>
      </div>
    </MapContainer>
  );
}

export default Maps;
