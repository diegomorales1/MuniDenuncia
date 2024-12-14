import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leerDesdeLocalStorage } from '../components/fileUtils';

//import iconMapa from "../assets/mapa.png";
// <img src={iconMapa} alt="Mapa" className="listado__mapa" />
import iconAuto from "../assets/icon_auto.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";

const icons = {
  auto: iconAuto,
  ladron: iconLadron,
  poste: iconPoste,
  semaforo: iconSemaforo,
};

function Listado() {
  const navigate = useNavigate();
  const locations = leerDesdeLocalStorage();
  const [locationsWithDetails, setLocationsWithDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Número de denuncias por página
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      const updatedLocations = await Promise.all(
        locations.map(async (location) => {
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`);
            const data = await response.json();
            if (data.address) {
              const calle = data.address.road || "Calle no encontrada";
              const suburbio = data.address.suburb || "Comuna no encontrada";
              const comuna = data.address.city || data.address.town || data.address.village || data.address.neighbourhood || "Comuna no encontrada";
              const direccionCompleta = `${calle}, ${suburbio ? suburbio + ', ' : ''}${comuna}`;
              return { ...location, address: direccionCompleta };
            }
            return { ...location, address: "Dirección no disponible" };
          } catch (error) {
            console.error("Error al obtener la dirección:", error);
            return { ...location, address: "Dirección no disponible" };
          }
        })
      );
      setLocationsWithDetails(updatedLocations);
      setIsLoading(false);
    };

    fetchAddresses();
  }, [locations]);

  const transformarGravedad = (tipo) => {
    switch (tipo) {
      case "alto":
        return "Alta"; 
      case "medio":
        return "Media";
      case "baja":
        return "Baja";
      default:
        return "Por Definir"; 
    }
  };

  // Calcular el índice de los elementos que se van a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locationsWithDetails.slice(indexOfFirstItem, indexOfLastItem);
  // Calcular el número total de páginas
  const totalPages = Math.ceil(locationsWithDetails.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="listado">
      <div className="lista-text">Denuncias en tu comuna: San Joaquin</div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      ) : (
        currentItems.map((location) => (
          <div
            key={location.id}
            className="listado__item"
            onClick={() => navigate(`/detalle/${location.id}`)}
          >
            <img src={icons[location.type]} alt={location.type} className="listado__icono" />
            <div className="listado__info">
              <span className="listado__layer-label">Dirección: </span>
              <p>{location.address}</p>
              <p>
                <span className="listado__layer-label">Gravedad: </span> 
                <span className={`listado__gravedad ${transformarGravedad(location.severity)}`}>
                  {transformarGravedad(location.severity)}
                </span>
              </p>
            </div>
          </div>
        ))
      )}

      
      <div className="listado__footer">
        <button onClick={() => navigate('/')} className="listado__volver">
          Volver
        </button>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}

export default Listado;
