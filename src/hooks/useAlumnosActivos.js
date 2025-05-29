import { useState, useEffect } from 'react'
import axios from 'axios'
import { URI_ALU } from '../utils/constantes.js'
//import { traerCantidad } from '../services/servicesInscriptos'


const uri =  URI_ALU 

export const useAlumnosActivos = () => {

    
    //const uri = 'http://200.12.136.75:5000/alutivos'

    const [cantidadAP, setCantidadAP] = useState(0)
    const [cantidadA, setCantidadA] = useState(0)
    const [alumnosUbiSede, setAlumnosUbiSede] = useState(null)
    const [alumnosAnioCursada, setAlumnosAnioCursada] = useState(null)
    const [planesact, setPlanesact] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        traerCantidadA()
        traerCantidadAP()
        traerAlumnosPorSede()
        traerPlanesVersiones()
        traerAlumnosPorAnioCursada()
    }, [])


    const traerCantidadAP = async (anio) => {

        try {
            const rows = await axios.get(`${uri}/alumsactper`)
            setCantidadAP(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const traerCantidadA = async () => {

        try {
            const rows = await axios.get(`${uri}/alumsact`)
            setCantidadA(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const traerAlumnosPorSede = async () => {

        try {
            const rows = await axios.get(`${uri}/alumsactubipro`)
            setAlumnosUbiSede(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
   

    const traerAlumnosPorAnioCursada = async ()=>{
        try {
            const rows = await axios.get(`${uri}/alumnosaniocursada`)
            setAlumnosAnioCursada(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const traerPlanesVersiones = async () => {

        try {
            const rows = await axios.get(`${uri}/planesversion`)
            setPlanesact(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return { loading, error, cantidadA, cantidadAP, alumnosUbiSede, alumnosAnioCursada,planesact }
}
