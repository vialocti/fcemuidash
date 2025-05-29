import axios from 'axios'
import { URI_ALU } from '../utils/constantes.js'

const uri = URI_ALU
//const uri = 'http://200.12.136.75:5000/alutivos'
/*

router.get('/alumsact', getAlumnosActivos)
router.get('/alumsactper', getAlumnosPerActivos)
router.get('/alumsactpro', getAlumnosPorPropuesta)
router.get('/alumsactubipro', getAlumnosPorUbiPropuesta)
router.get('/reinscriptos/:anio', getReinscriptosUbiProp)
/cohorteevol/:anioI/:sede/:carrera/:anioFC/:tipoI
*/

export const traerAlumosUbiPro = async () => {
    //console.log(`${uri}/inscrTotalIngreso/${anio}`)
    try {
        const rows = await axios.get(`${uri}/alumsactubipro`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}
//alumnos sin legajos
export const traerAlumosProvisoriosUP = async () => {
    //console.log(`${uri}/inscrTotalIngreso/${anio}`)
    try {
        const rows = await axios.get(`${uri}/aluprovisorios`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}



export const traerCantidadPerAlu = async () => {

    try {
        const rows = await axios.get(`${uri}/alumsactper`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}


export const traerCantidadAlu = async () => {
    //console.log(`${uri}/inscrTotalIngreso/${anio}`)
    try {
        const rows = await axios.get(`${uri}/alumsact`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

export const traerDesmebraCohorte = async (anioI, sede, carrera, anioFC, tipoI) => {

    //console.warn(`${uri}/cohorteevol/${anioI}/${sede}/${carrera}/${anioFC}/${tipoI}`)
    try {
        const rows = await axios.get(`${uri}/cohorteevol/${anioI}/${sede}/${carrera}/${anioFC}/${tipoI}`)
        //console.log(rows.data)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}


