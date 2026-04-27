import axios from 'axios';
import { URI_PROC } from '../utils/constantes.js';

// Evolución de cohorte detallada con distribución por año de cursada
export const traerEvolucionCohorteDetallada = async (anioI, sede, carrera, anioFC, tipoI) => {
  try {
    const { data } = await axios.get(
      `${URI_PROC}/evolucion-cohorte-detallada/${anioI}/${sede}/${carrera}/${anioFC}/${tipoI}`
    );
    return data;
  } catch (error) {
    console.error('Error traerEvolucionCohorteDetallada:', error);
    return null;
  }
};