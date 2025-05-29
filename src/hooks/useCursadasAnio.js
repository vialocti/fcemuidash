import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { URI_CUR } from '../utils/constantes'

const uri = URI_CUR
export const useCursadasAnio = (anio) => {
    
    //http://200.12.136.75:5000/cursadas/comisionesperlect/2023

    const [sedeComisionesPL, setsedeComisionesPL] = useState(null)
    const [listadoComisiones, setListadoComisiones]=useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=>{
        traerCursadasSede(anio)
        traerListaComisiones(anio)
    },[anio])
    
    const traerCursadasSede = async (anio) => {
       

        try {
            const rows = await axios.get(`${uri}/comisionesperlect/${anio}`)
            setsedeComisionesPL(rows.data)
        } catch (err) {
            setError(err)
            
        } finally {
            setLoading(false)
        }
    }



    const traerListaComisiones = async (anio) => {
       

        try {
            const rows = await axios.get(`${uri}/listcomisionesanio/${anio}`)
            setListadoComisiones(rows.data)
        } catch (err) {
            setError(err)
            
        } finally {
            setLoading(false)
        }
    }


    return {error, loading,sedeComisionesPL,listadoComisiones}
}


