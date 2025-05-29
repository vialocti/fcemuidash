import axios from 'axios'
import { URI_EGR } from '../utils/constantes.js'

const uri = URI_EGR
//const uri = 'http://200.12.136.75:5000/dbegresados'
//dbegresados/egreanio/2023/L
//egreaniolista/:anio/:lapso/:sede/:car
//egresadosaniosede/:anio/:lapso/:sede
//egrepromcaranio/:anio/:car/:lapso
//trae un listado con propmedios de egreso por carrerapor año

export const getEgresadosAnioSedePropuestaProm = async (anio, lapso) => {

    try {

        const rows = await axios.get(`${uri}/egreanio/${anio}/${lapso}`)


        return rows.data
    } catch (error) {
        console.log(error)
    }

}

//listado por sede carrera
export const getListadoEgreAnioSedePropuesta = async (anio, lapso, sede, car) => {

    try {

        const rows = await axios.get(`${uri}/egreaniolista/${anio}/${lapso}/${sede}/${car}`)
        return rows.data
    } catch (error) {
        console.log(error)
    }

}



//listado por carrera anio promedios y duracion
export const getListadoEgreAnioPropuesta = async (anio, car, lapso, ficola, ffcola) => {
    console.log(`${uri}/egrepromcaranio/${anio}/${car}/${lapso}/${ficola}/${ffcola}`)
    try {

        const rows = await axios.get(`${uri}/egrepromcaranio/${anio}/${car}/${lapso}/${ficola}/${ffcola}`)
        return rows.data
    } catch (error) {
        console.log(error)
    }

}


export const getCantiEgreAnioSede = async (anio, lapso, sede) => {
    try {

        const rows = await axios.get(`${uri}/egresadosaniosede/${anio}/${lapso}/${sede}`)
        return rows.data

    } catch (error) {
        console.log(error)
    }
}

//devuelve egresados de las carreras entre los años solicitados
//lapso L:ciclo lectivo, C:año calendario

export const getEgresadosEntreAnios = async (anioI, anioF, lapso) => {

    try {
        const rows = await axios.get(`${uri}/egreenteanios/${anioI}/${anioF}/${lapso}`)

        return rows.data
    } catch (error) {
        console.log(error)
    }
}


export const getEgresadosAniosaFecha = async () => {  
    try {

        const rows = await axios.get(`${uri}/egresadosaniosfecha`)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}            

