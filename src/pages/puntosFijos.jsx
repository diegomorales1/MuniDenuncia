// Definir puntos de prueba solo una vez al iniciar
import { leerDesdeLocalStorage, guardarEnLocalStorage } from '../components/fileUtils';

const puntosDePrueba = [
    {
      id: 1,
      lat: -33.5025,
      lng: -70.6128,
      type: "auto",
      title: "Accidente leve",
      description: "Choque menor en la intersección.",
      severity: "bajo"
    },
    {
      id: 2,
      lat: -33.5030,
      lng: -70.6140,
      type: "ladron",
      title: "Robo en progreso",
      description: "Sospechoso intentando abrir vehículos.",
      severity: "alto"
    },
    {
      id: 3,
      lat: -33.5045,
      lng: -70.6135,
      type: "poste",
      title: "Poste dañado",
      description: "Poste inclinado tras accidente.",
      severity: "medio"
    },
    {
      id: 4,
      lat: -33.5050,
      lng: -70.6120,
      type: "semaforo",
      title: "Semáforo fuera de servicio",
      description: "Intersección peligrosa sin semáforo.",
      severity: "alto"
    },
    {
      id: 5,
      lat: -33.5010,
      lng: -70.6115,
      type: "auto",
      title: "Vehículo mal estacionado",
      description: "Vehículo bloqueando paso peatonal.",
      severity: "bajo"
    },
    {
      id: 6,
      lat: -33.5060,
      lng: -70.6105,
      type: "ladron",
      title: "Intento de robo",
      description: "Individuo sospechoso rondando el área.",
      severity: "medio"
    },
    {
      id: 7,
      lat: -33.5075,
      lng: -70.6150,
      type: "poste",
      title: "Poste con cortocircuito",
      description: "Chispas visibles en poste eléctrico.",
      severity: "alto"
    },
    {
      id: 8,
      lat: -33.5035,
      lng: -70.6090,
      type: "semaforo",
      title: "Semáforo intermitente",
      description: "Luz roja intermitente sin razón aparente.",
      severity: "medio"
    },
    {
      id: 9,
      lat: -33.5080,
      lng: -70.6130,
      type: "auto",
      title: "Accidente grave",
      description: "Vehículo volcado en la calzada.",
      severity: "alto"
    }
  ];

//Función para inicializar los puntos de prueba si no existen algunos previos
function inicializarPuntosDePrueba() {
  const locations = leerDesdeLocalStorage();
  const colocado = 0;
  console.log("Longitud de locations:", locations.length);
  if (locations.length === 0 && colocado === 0) {
    guardarEnLocalStorage(puntosDePrueba);
    colocado = 1;
  }
}

export default inicializarPuntosDePrueba;
