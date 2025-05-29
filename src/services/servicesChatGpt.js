import axios from 'axios';
import { URI_AI } from '../utils/constantes';

// Configuración de Axios
const api = axios.create({
    baseURL: URI_AI,
    timeout: 60000,
});


export const analizarDatosAlumnos = async (rows) => {
  try {
    const response = await api.post(`/analizardatos`,{rows});
    return response.data;
  } catch (error) {
    console.error("Error al analizar los datos:", error);
    return "Error al obtener la conclusión del asistente.";
  }
};


export const constructorSQL = async (pregunta)=>{

try {
  const response = await api.post(`/cosusql`,{pregunta});
 
  return response
} catch (error) {
  console.error("Error al analizar los datos:", error);
  return "Error al obtener la conclusión del asistente.";
}
}

 
  
  export const enviarDatosParaAnalisis = async (datos, instrucciones)=> {
    try {
      const response= await api.post('/assitanststadistics', {
        datos,
        instrucciones
      });
  
      console.log('✅ Respuesta del análisis:', response.data);
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Error en Axios:', error.response?.data || error.message);
      } else {
        console.error('❌ Error inesperado:', error);
      }
    }
  };
  



export const sendDataForAnalysis = async (dataArray) => {
    try {
        const response = await fetch("http://200.12.136.75:5500/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: dataArray })
        });

        const result = await response.json();
        return result.analysis;
    } catch (error) {
        console.error("Error:", error);
    }
};

// Llamada de prueba
//sendMessage("Hola, ¿cómo estás?");