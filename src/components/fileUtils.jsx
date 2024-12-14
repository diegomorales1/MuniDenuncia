// fileUtils.js
export function guardarEnLocalStorage(datos) {
    localStorage.setItem("locationsData", JSON.stringify(datos));
}

export function leerDesdeLocalStorage() {
    const datos = localStorage.getItem("locationsData");
    return datos ? JSON.parse(datos) : [];
}

// Nueva función para eliminar un punto por su id
export function eliminarDeLocalStorage(id) {
    const datos = leerDesdeLocalStorage();
    const nuevosDatos = datos.filter((loc) => loc.id !== id);
    guardarEnLocalStorage(nuevosDatos);
}
