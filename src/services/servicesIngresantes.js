import { URI_ING } from '../utils/constantes.js'
import axios from 'axios'

const uri = URI_ING 
//const uri = 'http://200.12.136.75:5000/dbingreso'

const tratamientoDatos = (datos) => {
    console.log(datos)
    const anioscomp = []


    datos.map((item) => {

        const ingreParray = item.total.filter(ele => ele.tipo_ingreso === 1 || ele.tipo_ingreso === 3 || ele.tipo_ingreso === null)
        const sumaIN = ingreParray.map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0);
        const ingreICarray = item.total.filter(ele => ele.tipo_ingreso === 6)
        const sumaIC = ingreICarray.map(item => item.canti).reduce((prev, curr) => prev + Number(curr), 0);

        let objti = { anio: item.anio, totalI: sumaIN, totalIC: sumaIC }

        anioscomp.push(objti)

        // console.log(item.anio, sumaIN, sumaIC)


    })
    //console.log(anioscomp)

    return anioscomp
}





export const traerCantidadIngreso = async (anio) => {

    try {
        const rows = await axios.get(`${uri}/ingreTotalAnio/${anio}`)
        console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

export const traerCantidadIngresoUbicacion = async (anio) => {
    try {

        const rows = await axios.get(`${uri}/ingresantesTotalIngresoAnioUbi/${anio}`)
        console.log(rows.data)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}


export const traerIngresantesEntreAnios = async (anioi, aniof) => {

    try {

        const rows = await axios.get(`${uri}/ingreTotalTanio/${anioi}/${aniof}`)
        console.log(rows.data)
        return tratamientoDatos(rows.data)

    } catch (error) {
        console.log(error)
    }
}

//const suma = ingreAnios.map(item => item.totali.canti).reduce((prev, curr) => prev + Number(curr), 0);
//        console.log(suma, ingreAnios)

//traer ingresantes anio sede propuesta tipo

export const traerIngresantesSedePropuestaTipo = async (anio, sede, carrera, tipoI) => {
    try {
        const rows = await axios.get(`${uri}/ingresantesaspi/${anio}/${sede}/${carrera}/${tipoI}`)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}


export const traerCantidadIngresoUbicacionTSx = async (anio, estadoingreso) => {
    try {

        const rows = await axios.get(`${uri}/ingresoPorPropuestaSedeTIsexo/${anio}`)
        //console.log(rows.data)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}
