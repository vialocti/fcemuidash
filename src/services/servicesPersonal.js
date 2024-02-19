import axios from 'axios'
import { URI_PER } from '../utils/constantes.js'

const uri = URI_PER
//const uri = 'http://200.12.136.74:4000/biometrico'


export const traerDatosPeronalHR = async (fecha, claustro) => {
    try {

        const resu = await axios.get(`${uri}/horasregistros/${fecha}/${claustro}`)
        //console.log(resu.data)
        return resu.data
    } catch (error) {
        console.log(error)
    }
}

