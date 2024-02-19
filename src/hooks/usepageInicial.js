import { useState, useEffect } from 'react'
import axios from 'axios'
import { URI_ALU, URI_EGR, URI_INS, URI_PER } from '../utils/constantes.js'
  
const uri_bio = URI_PER
const uri_e = URI_EGR
const uri_i = URI_INS
const uri_a = URI_ALU
export const usePageInicial = (anio) => {
   
   
/*
    const uri_e = 'http://200.12.136.75:5000/dbegresados'
    const uri_i = 'http://200.12.136.75:5000/dbinscriptos'
    const uri_a = 'http://200.12.136.75:5000/alutivos'
    const uri_bio = 'http://200.12.136.74:4000/biometrico'
   */
    const [anioC, setAnioC] = useState(anio)
    //const [cantidadI, setCantidadI] = useState(0)
    const [cantidadSedeEgr, setCantidadEgr] = useState(null)
    const [cantidadAlu, setCantidadAlu] = useState(null)
    const [cantidadInsc, setCantidadInsc] = useState(null)
    const [cantidadAluPro, setCantidadAluPro] = useState(null)
    const [datosAsistencia, setDatosAsistencia] = useState(null)

    const [cantidadInscPeriodo, setCantidadInscPeriodo] = useState(null)
    //const [cantidadComiAnio, setCantidadComiAnio] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        traerInscriptosSede(anioC)
        traerCantidadPorSede(anioC)
        traerAlumnosActivosSede()
        traerAlumnosCarrera()
        traerAsistencia()
        traerCantidadPorPeriodos()
        //traerComisionesAnio(anio)
    }, [anioC])



    useEffect(()=>{
        const fecha = new Date().toISOString()
        let fechacompa = fecha.getFullYear + '-04-01'
        if (fecha < fechacompa){
            //console.log(anio, 'anio-1')
            setAnioC(anio-1)
        }else{
            setAnioC(anio)
        }
        
    },[])

    //egresados anio en curso
    const traerCantidadPorSede = async () => {
        //console.log(`${uri_e}/inscrTotalIngreso/${anioC}`)
        try {
            const rows = await axios.get(`${uri_e}/egresadosanio/${anioC}/L`)
            setCantidadEgr(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    //inscripciones
    const traerInscriptosSede = async () => {
        try {
            const rows = await axios.get(`${uri_i}/inscriptosSedeanio/${anioC + 1}`)
            setCantidadInsc(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    //cantidad por periodos
    const traerCantidadPorPeriodos = async () => {

        try {
            const rows = await axios.get(`${uri_i}/inscriptosperiodo/${anioC + 1}`)
            //console.log(rows)
            setCantidadInscPeriodo(rows.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }


    const traerAlumnosActivosSede = async () => {
        try {
            const rows = await axios.get(`${uri_a}/alumnosSede`)
            setCantidadAlu(rows.data)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    //por carrera
    const traerAlumnosCarrera = async () => {
        try {
            const rows = await axios.get(`${uri_a}/alumsactpro`)
            setCantidadAluPro(rows.data)
        } catch (error) {
            console.log(error)
        }
    }


    //asistencia
    const traerAsistencia = async () => {

        let fc = new Date()
        let anio = fc.getFullYear()
        let mes = fc.getMonth() < 10 ? '0' + (fc.getMonth() + 1) : + (fc.getMonth() + 1)
        let dia = fc.getDate() < 10 ? '0' + fc.getDate() : fc.getDate()

        let fecha = anio + '-' + mes + '-' + dia

        //console.log(`${uri_bio}/asistenciahoy/${fecha}`)
        try {
            const resu = await axios.get(`${uri_bio}/asistenciahoy/${fecha}`)
            //console.log(resu.data)
            setDatosAsistencia(resu.data)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    //comisiones de cursadas en año lectico
    //no utilizado por ahora
    /*
    const traerComisionesAnio = async () => {
        try {
            const rows = await axios.get(`${uri_c}/comisionesanio/${anio}`)
            setCantidadComiAnio(rows.data)
        } catch (error) {
            )
        }
    }
   */
    return { loading, error, cantidadSedeEgr, cantidadInsc, cantidadAlu, cantidadAluPro, datosAsistencia, cantidadInscPeriodo }
}
