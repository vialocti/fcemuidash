import { URI_ALUI, URI_REN } from '../utils/constantes.js'

import axios from 'axios'

const uri = URI_ALUI
const urir = URI_REN
//const uri = 'http://200.12.136.75:5000/alutivos'
/*

router.get('/alumsact', getAlumnosActivos)
router.get('/alumsactper', getAlumnosPerActivos)
router.get('/alumsactpro', getAlumnosPorPropuesta)
router.get('/alumsactubipro', getAlumnosPorUbiPropuesta)
router.get('/reinscriptos/:anio', getReinscriptosUbiProp)
/cohorteevol/:anioI/:sede/:carrera/:anioFC/:tipoI
*/

export const traerReinscriptosAnio = async (anio) => {
   
    try {
        const rows = await axios.get(`${uri}/traerReinscriptos/${anio}`)
        //console.log(rows.data)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}



export const traerDatosindicesCursada=async(anio)=>{

    try {
        const rows = await axios.get(`${urir}/indicescl/${anio}`)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}

export const traerDatosindicesCursadaI0 = async (anio) => {

    try {
        const rows = await axios.get(`${urir}/indicescl0/${anio}`);
        return rows.data;
    } catch (error) {
        console.log(error);
    }
}