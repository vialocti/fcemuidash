import axios from 'axios'
import { URI_REN } from '../utils/constantes.js'

const uri = URI_REN
//const uri = 'http://200.12.136.75:5000/rendimiento'
// '/aluinfouno/:ubicacion/:propuesta/:plan/:planversion/:anioipro'
//'/planversion'




export const traerPlanesVersiones = async (anio) => {
    
    try {
        const rows = await axios.get(`${uri}/planversion`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}


export const traerAlumnosInfouno = async (anio,ubicacion,propuesta,plan,planversion ) => {
    
    try {
        const rows = await axios.get(`${uri}/aluinfouno/${ubicacion}/${propuesta}/${plan}/${planversion}/${anio}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

