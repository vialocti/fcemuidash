
import axios from 'axios';
import { URI_UTL } from '../utils/constantes';


const api = axios.create({
    baseURL: URI_UTL, // Asegúrate de que `uri` esté configurado como la base de la API
    timeout: 60000, // Establece un tiempo de espera apropiado
});




export const traerAprobadasAnioReport = async (anio, sede, fecha) => {
    // Validar que 'anio' sea un número y esté en un rango razonable
    
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }
*/
    if (!sede || !fecha) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }

    try {
        const response = await api.get(`/reporteAprobAnioUno/${anio}/${sede}/${fecha}`);
      
        return response.data; // Devuelve los datos de la API
    } catch (error) {
        // Diferenciar el error de red de otros errores
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error en la respuesta de la API:', error.response.data);
            return { error: 'Error en la respuesta de la API', details: error.response.data };
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No se recibió respuesta de la API:', error.request);
            return { error: 'No se recibió respuesta de la API. Verifique la conexión de red.' };
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error('Error al realizar la solicitud:', error.message);
            return { error: 'Error al realizar la solicitud', details: error.message };
        }
    }
};


//traer datos comisiones actividades ingresantes
//reporteMateriasDatos/:anio/:fecha

export const traerdatosComisionesIngresantes = async (anio, fecha) => {
    // Validar que 'anio' sea un número y esté en un rango razonable
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }
*/
    if (!anio || fecha==='') {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }

    try {
        const response = await api.get(`/reporteMateriasDatos/${anio}/${fecha}`);
        return response.data; // Devuelve los datos de la API
    } catch (error) {
        // Diferenciar el error de red de otros errores
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error en la respuesta de la API:', error.response.data);
            return { error: 'Error en la respuesta de la API', details: error.response.data };
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No se recibió respuesta de la API:', error.request);
            return { error: 'No se recibió respuesta de la API. Verifique la conexión de red.' };
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error('Error al realizar la solicitud:', error.message);
            return { error: 'Error al realizar la solicitud', details: error.message };
        }
    }
};


//reportealuinfomatcompleto/:anio/:propuesta/:matap

export const traerdatosListadoInfoAlu = async (anio, propuestas,matap) => {
    console.log(anio, propuestas, matap)
    // Validar que 'anio' sea un número y esté en un rango razonable
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }

    if (!anio || parseInt(matap)>9) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }
*/
    try {
        const response = await api.get(`/reportealuinfomatcompleto/${anio}/${matap}/${propuestas}`);
        return response.data; // Devuelve los datos de la API
    } catch (error) {
        // Diferenciar el error de red de otros errores
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error en la respuesta de la API:', error.response.data);
            return { error: 'Error en la respuesta de la API', details: error.response.data };
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No se recibió respuesta de la API:', error.request);
            return { error: 'No se recibió respuesta de la API. Verifique la conexión de red.' };
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error('Error al realizar la solicitud:', error.message);
            return { error: 'Error al realizar la solicitud', details: error.message };
        }
    }
};

//traerDatosActividadContacto


export const traerDatosActividadContacto = async (anio, sede) => {
    console.log(anio, sede)
    // Validar que 'anio' sea un número y esté en un rango razonable
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }

    if (!anio || parseInt(matap)>9) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }
*/
    try {
        const response = await api.get(`/indicescomisionesanio/${anio}/${sede}`);
        return response.data; // Devuelve los datos de la API
    } catch (error) {
        // Diferenciar el error de red de otros errores
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error en la respuesta de la API:', error.response.data);
            return { error: 'Error en la respuesta de la API', details: error.response.data };
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No se recibió respuesta de la API:', error.request);
            return { error: 'No se recibió respuesta de la API. Verifique la conexión de red.' };
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error('Error al realizar la solicitud:', error.message);
            return { error: 'Error al realizar la solicitud', details: error.message };
        }
    }
};