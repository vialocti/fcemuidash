import { URI_CUR } from '../utils/constantes.js'
import axios from 'axios'

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
/comparativas/:anio/:sede'
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


export const traerListadoAlumnosComision = async (comision,anio,sede,actividad) => {
    //console.log(comision,anio,sede,actividad)
    try {
        const rows = await axios.get(`${uri}/listadoalumnoscomision/${comision}/${anio}/${sede}/${actividad}`)
        //console.log(rows)
        
               return rows.data
        
    } catch (error) {

        console.log(error)
    }
}

//Materias NOMBRE
export const traerMateriasComiAnio = async (anio,sede) => {
   // console.log('uuu')
    try {
        const rows = await axios.get(`${uri}/materiascomision/${anio}/${sede}`)
        
       // console.log(rows.data)
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
            //console.log(comisionesN)
            return comisionesN
      
          }


    } catch (error) {

        console.log(error)
    }
}



//detalle comisiones 

export const traerDetalleComisiones = async (anio,materia, sede,recursado, propuesta) => {
   
    let codsede=''
    if(parseInt(sede)===1){
        codsede='M0'
    }else if(parseInt(sede)===2){
        codsede='S0'
    }else if(parseInt(sede)===3){
        codsede='GA'
    }else if(parseInt(sede)===4){
        codsede='SM'
    }
  //console.log(codsede,anio,materia)
    try {
        let ncomisiones = await traerNumerosComisiones(anio,materia)
        //console.log(ncomisiones)
        const rows = await axios.get(`${uri}/detalleporcomisiones/${anio}/${ncomisiones}/${codsede}/${recursado}/${propuesta}`)
       // console.log(rows.data)
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


//traer inscriptos por actividad sede

export const traerpropuestaversion = async (propuesta) => {
    
    try {
        const rows = await axios.get(`${uri}/propuestaversionact/${propuesta}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

//traer inscriptos por actividad sede

export const traerInscriptosPropuestaSede = async (anio,sede,versionact) => {
    
    try {
        const rows = await axios.get(`${uri}/inscriptospropuestasede/${anio}/${sede}/${versionact}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}


///traer inscriptos por actividad sede

export const traerInscriptosactividadSede = async (anio,sede) => {
    
    try {
        const rows = await axios.get(`${uri}/cantiInscActividadComi/${anio}/${sede}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

//comparativas anio sede
export const traerComparativaInscripcionesAnio = async(anio,sede)=>{
    console.log(sede,anio)
    try {
        const rows = await axios.get(`${uri}/comparativas/${anio}/${sede}`)
        //console.log(rows.data)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}



export const traerActividadesHistoricas = async(sede, anioI)=>{
    try {
        const rows = await axios.get(`${uri}/actividadeshistoricos/${sede}/${anioI}`)
        //console.log(anioI,sede)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}


export const datosHistoricosResultados= async (anioI,anioF, sede, actividad, tcomi)=>{
    
    
    try {
        const rows = await axios.get(`${uri}/historicoIndice/${sede}/${anioI}/${anioF}/${actividad}/${tcomi}`)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}



//comparativas inscripciones actividad
export const traerComparativaInscripcionesActividad = async (anio,sede,actividad,pgenerico) => {
    
    try {
        const rows = await axios.get(`${uri}/comparativaActividad/${anio}/${sede}/${actividad}/${pgenerico}`)
        //console.log(rows.data)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}