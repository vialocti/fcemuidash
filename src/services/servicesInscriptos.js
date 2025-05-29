import axios from 'axios'
import { URI_INS } from '../utils/constantes.js'

const uri = URI_INS 
//const uri = 'http://200.12.136.75:5000/dbinscriptos'


const tratamientoDatos = (datos) => {

    const anioscomp = []


    datos.map((item) => {

        const ingreParray = item.total.filter(ele => ele.tipo_ingreso !== 6)
        const sumaIN = ingreParray.map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0);
        const ingreICarray = item.total.filter(ele => ele.tipo_ingreso === 6)
        const sumaIC = ingreICarray.map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0);

        let objti = { anio: item.anio, totalI: sumaIN, totalIC: sumaIC }

        anioscomp.push(objti)

        //console.log(item.anio, sumaIN, sumaIC)


    })
    // console.log(anioscomp)

    return anioscomp
}




export const traerCantidad = async (anio) => {
    //console.log(`${uri}/inscrTotalIngreso/${anio}`)
    try {
        const rows = await axios.get(`${uri}/inscrTotalIngreso/${anio}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

export const traerCantidadPorSede = async (anio) => {
    try {
        const rows = await axios.get(`${uri}/totalsedepropuesta/${anio}`)
        //console.log(rows)
        return rows.data
    } catch (error) {

        console.log(error)
    }
}

//cantidad por periodos
export const traerCantidadPorPeriodos = async (anio) => {
    try {
        const rows = await axios.get(`${uri}/inscriptosperiodo/${anio}`)
        //console.log(rows)
        return rows.data
    } catch (error) {

        console.log(error)
    }
}

export const traerInscriptosEntreAnios = async (anioi, aniof) => {

    try {
        const rows = await axios.get(`${uri}/inscriptTanios/${anioi}/${aniof}`)
        console.log(rows.data)
        return tratamientoDatos(rows.data)
    } catch (error) {
        console.log(error)
    }
}

///cantidad inscriptos toto all
export const traerCantidadIncriptosUbicacionTSx = async (anio) => {
    try {

        const rows = await axios.get(`${uri}/inscriptosSedeProTiSexoanio/${anio}`)
        //console.log(rows.data)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}

