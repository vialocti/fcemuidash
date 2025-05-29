import { URI_ALUI } from '../utils/constants';
import axios from 'axios';

// Configuración de Axios
const api = axios.create({
    baseURL: URI_ALUI,
});

// Definir un tipo genérico para la respuesta de la API


// Manejo de errores

// Funciones de la API corregidas
export const procesoInicialReinscriptos = async (anio)=> {
    if (!anio) return { error: 'Parámetro año inválido. Verifique la entrada.' };
    
    try {
        const response = await api.get(`/procReinscriptos/${anio}`);
        return response.data;  // Retorna solo los datos de la API
    } catch (error) {
        return "error";
    }
};

export const procesoIngresoInfoInicial = async (tp) => {
    console.log(tp)
    try {
        const response = await api.get(`/procinfoOne/${tp}`);
        return response.data ;
    } catch (error) {
        return "error";
    }
};

export const procesoAprobadasAnio = async () => {
    try {
        const response = await api.get('/aprobadasanio');
        return response.data;
    } catch (error) {
        return "error";
    }
};

export const procesoCalculoAnioCursada19 = async (tipo)=> {
    if (!tipo) return { error: 'Parámetro tipo inválido. Verifique la entrada.' };
    
    try {
        const response = await api.get(`/calculoanioplan19/${tipo}`);
        return response.data;
    } catch (error) {
        return "error";
    }
};

export const procesoCalculoAnioCursada98 = async (tipo) => {
    if (!tipo) return { error: 'Parámetro tipo inválido. Verifique la entrada.' };
    
    try {
        const response = await api.get(`/calculoanioplan98/${tipo}`);
        return response.data;
    } catch (error) {
        return "error";
    }
};

export const procesoCalculoCoeficienteT = async (anio, epoca)=> {
    if (!anio || !epoca) return { error: 'Parámetros inválidos. Verifique la entrada.' };

    try {
        const response = await api.get(`/calcularCoeft/${anio}/${epoca}`);
        return response.data;
    } catch (error) {
        return "error";
    }
};


export const traerDatosinformacionAlumnos = async ()=> {
    
    
    try {
        const response = await api.get(`/traerdatosalu`);
     
        return  response.data.data ;
    } catch (error) {
        return "error";
    }
};

export const procesarCompletudCarrera = async ()=> {
    

    try {
        const response = await api.get(`/calcularporcentaje`);
        return response.data;
    } catch (error) {
        return "error";
    }
};

export const procesarCalidadAlumno = async () => {
    

    try {
        const response = await api.get(`/controlCalidad`);
        return response.data;
    } catch (error) {
        return "error";
    }
};

export const procesarMatriculaAlumno = async () => {
    

    try {
        const response = await api.get(`/controlMatricula`);
        return response.data;
    } catch (error) {
        return "error";
    }
};




/**
router.get('/traerReinscriptos/:anio', getReinscriptos ) dentro del primer proceso
router.post('/grabarReinscripto', insertAlumnoInfo) dentro del primer proceso
router.get('/procReinscriptos/:anio', processReinscriptos) ok

router.get('/procinfoOne', processInfo_One) ok
router.get('/aprobadasanio',calcularAproAnio) ok
router.get('/calculoanioplan19/:tipo', aniocursada19)
router.get('/calculoanioplan98/:tipo',aniocursada98)
router.get('/calcularCoeft/:anio/:epoca',calculoVelocidad)

router.get('/controlCalidad', controlCalidadAluinfo)
router.get('/calcularporcentaje', controlPorcentaje)
router.get('/controlMatricula', controlMatricula)




*/