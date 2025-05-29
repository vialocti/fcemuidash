import axios from 'axios';
import { URI_EXA } from '../utils/constantes';

const api = axios.create({
    baseURL: URI_EXA, // Asegúrate de que `uri` esté configurado como la base de la API
    timeout: 30000, // Establece un tiempo de espera apropiado
});

export const traerAprobadasAnio = async (anio, sede, propuesta, tipoO) => {
    // Validar que 'anio' sea un número y esté en un rango razonable
    
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }
*/
    if (!sede || !propuesta) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }

    try {
        const response = await api.get(`/mataprobaluanio/${anio}/${sede}/${propuesta}/${tipoO}`);
      
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




///actividades
export const traerAprobadasAnioActividades = async (anio, sede, propuesta) => {
    // Validar que 'anio' sea un número y esté en un rango razonable
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }
*/
    if (!sede || !propuesta) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }

    try {
        const response = await api.get(`/aproactividadPsede/${anio}/${sede}/${propuesta}`);
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

//histaprobadaluanio/:sede/:propuesta/:anioi/:aniof'


export const traerAprobadasAluAnioHist = async (sede, propuesta,anioi,aniof) => {
    // Validar que 'anio' sea un número y esté en un rango razonable
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }
*/
    if (!sede || !propuesta) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }

    try {
        const response = await api.get(`/histaprobadaluanio/${sede}/${propuesta}/${anioi}/${aniof}`);
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


//periodos anio
export const traerPeriodosExamen =async (anio)=>{

    if(!anio){
        console.error('Parámetro año invalido');
        return { error: 'Parámetro año invalido' };
    }

    try {
        const response = await api.get(`/turnosAnio/${anio}`);
        //console.log(response.data)
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


}

//mesas anio periodo
export const traermesasExamenPeriodo =async (anio, periodo, ubicacion)=>{

    if(!anio && !periodo && !ubicacion){
        console.error('Parámetros año o periodo o ubicacion invalidos');
        return { error: 'Parámetros año o periodo o ubicacion invalidos' };
    }

    try {
        const response = await api.get(`/mesasAnio/${anio}/${periodo}/${ubicacion}`);
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


}

//mesas con resultado
export const traeResultadosMesasPeriodo =async (anio, periodo, ubicacion)=>{

    if(!anio && !periodo && !ubicacion){
        console.error('Parámetros año o periodo o ubicacion invalidos');
        return { error: 'Parámetros año o periodo o ubicacion invalidos' };
    }

    try {
        const response = await api.get(`/examentuti/${anio}/${periodo}/${ubicacion}`);
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


}

//

//resultado de una mesa aprobados, reprobads y ausentes

export const traerResultadoMesa =async (llamado_mesa)=>{

    if(!llamado_mesa){
        console.error('Parámetro llamado invalido');
        return { error: 'Parámetro llamado invalido' };
    }

    try {
        const response = await api.get(`/resultadosmesa/${llamado_mesa}`);
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

}


//resultado de todo un periodo aprobados, reprobados y ausentes

export const traerResultadoTurno =async (llamados)=>{
    console.log(llamados)
    if(!llamados){
        console.error('Parámetro llamados invalido');
        return { error: 'Parámetro llamados invalido' };
    }

    try {
        const response = await api.get(`/resultadoturno/${llamados}`);
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
}


////resultado de todo un periodo aprobados, reprobados y ausentes

export const traerEpocasExamen =async (anio)=>{

    if(!anio){
        console.error('Parámetro anio invalido');
        return { error: 'Parámetro anio invalido' };
    }

    try {
        const response = await api.get(`/examenesepocas/${anio}`);
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
}


