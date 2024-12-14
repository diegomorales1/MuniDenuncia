import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { guardarEnLocalStorage, leerDesdeLocalStorage } from '../components/fileUtils';
import L from "leaflet";

import iconAuto from "../assets/icon_auto.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";

const icons = {
  auto: new L.DivIcon({
    className: "markPin",
    html: `<img src="${iconAuto}" class="icon" alt="Auto Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  ladron: new L.DivIcon({
    className: "markPin",
    html: `<img src="${iconLadron}" class="icon" alt="Ladron Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  poste: new L.DivIcon({
    className: "markPin",
    html: `<img src="${iconPoste}" class="icon" alt="Poste Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  semaforo: new L.DivIcon({
    className: "markPin",
    html: `<img src="${iconSemaforo}" class="icon" alt="Semaforo Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
};

function NuevaAdvertencia() {
  const { type: initialType } = useParams();
  const [selectedType, setSelectedType] = useState(initialType);
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Por definir");
  const [position, setPosition] = useState(state?.currentPosition);
  const [type, setType] = useState(initialType);
  const navigate = useNavigate();

  const handleIconClick = (newType) => {
    setSelectedType(newType);
    setType(newType); 
  };

  const handleAddLocation = (e) => {
    e.preventDefault();

    setSeverity("Por Definir");

    const newLocation = {
      id: Date.now(),
      lat: position[0],
      lng: position[1],
      type,
      title,
      description,
      severity: "Por Definir",
    };

    const locations = leerDesdeLocalStorage();
    locations.push(newLocation);

    guardarEnLocalStorage(locations);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        const center = map.getCenter();
        setPosition([center.lat, center.lng]);
      },
    });
    return null;
  };

  return (
    <form onSubmit={handleAddLocation} className="advertencia-form">
      <label className="advertencia-form__label">Ubicación</label>
      <MapContainer center={position} zoom={16} style={{ height: "325px", width: "350px", marginBottom: "20px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icons[type]} />
        <MapEvents />
      </MapContainer>
      <label className="advertencia-form__label">Tipo de denuncia</label>
      <div className="icon-selection">
        {Object.keys(icons).map((iconType) => (
          <div
            key={iconType}
            onClick={() => handleIconClick(iconType)}
            className={`icon-container ${selectedType === iconType ? "selected" : ""}`}
          >
            <img src={icons[iconType].options.html.match(/src="([^"]+)"/)[1]} alt={`${iconType} icon`} className="icon-image" />
          </div>
        ))}
      </div>
      <label className="advertencia-form__label">Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="advertencia-form__textarea" />
      </label>
      
      <div className="advertencia-form__buttons">
        <button type="button" onClick={handleCancel} className="advertencia-form__button advertencia-form__button--cancel">Cancelar</button>
        <button type="submit" className="advertencia-form__button">Publicar</button>
      </div>
    </form>
  );
}

export default NuevaAdvertencia;
