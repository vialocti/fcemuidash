import axios from 'axios'
import { URI_CUR } from '../utils/constantes.js'


const uri = URI_CUR
//const uri = 'http://200.12.136.75:5000/cursadas'
/*
'/periodoslectivos/:anio'//periodos lectivos
'/listcomisionesanio/:anio'//listado comisiones
'/comisionesanio/:anio'//cantidad de comisiones por sede
'/comisionesperlect/:anio' //cantidad de comisiones por sede periodo
'/comisionesaniopatron/:anio/:nmateria', //listado comisiones año materia
'/materiascomision/:anio' materias comision
'/cantiInsccomisiones/:anio'
'/cantiinscriptosComiplan/:anio'
'/detalleactasCur/:anio/:origen/:periodo'
'/detalleporcomision/:anio/:ncomision'
'router.get('/detalleporcomisiones/:anio/:ncomisiones',resultadoActaDetallesporComisiones)
*/

export const traerPeriodosLectivos = async (anio) => {
    
    try {
        const rows = await axios.get(`${uri}/periodoslectivos/${anio}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}



export const traerListadoComisiones = async (anio) => {
    //console.log(`${uri}/inscrTotalIngreso/${anio}`)
    try {
        const rows = await axios.get(`${uri}/listcomisionesanio/${anio}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

//Materias NOMBRE
export const traerMateriasComiAnio = async (anio) => {
    console.log('uuu')
    try {
        const rows = await axios.get(`${uri}/materiascomision/${anio}`)
        
        console.log(rows.data)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

//COmisiones Materias

export const traerComisionesMateriaAnio = async (anio,nmateria) => {
    
    try {
        const rows = await axios.get(`${uri}/comisionesaniopatron/${anio}/${nmateria}`)
        //console.log(rows.data)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

export const traerNumerosComisiones = async (anio,nmateria) => {
    
    try {
        const rows = await axios.get(`${uri}/comisionesnumero/${anio}/${nmateria}`)
        //console.log(rows.data)
        let comisiones = rows.data
        if(comisiones){
            let comisionesN = "";
            for (const elemento of comisiones) {
              //console.log(elemento);
              comisionesN += elemento.comision + ",";
            }
            comisionesN = comisionesN.substring(0, comisionesN.length - 1);
            return comisionesN
      
          }


    } catch (error) {

        console.log(error)
    }
}



//detalle comisiones 

export const traerDetalleComisiones = async (anio,materia) => {
    

    try {
        let ncomisiones = await traerNumerosComisiones(anio,materia)
        //console.log(ncomisiones)
        const rows = await axios.get(`${uri}/detalleporcomisiones/${anio}/${ncomisiones}`)
        //console.log(rows.data)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

//comisionesperiodo lectivo
export const traerComisionesPerLect = async (anio) => {
       

    try {
        const rows = await axios.get(`${uri}/comisionesperlect/${anio}`)
        return rows.data

    } catch (err) {
        console.log(err)
        
    }
}
