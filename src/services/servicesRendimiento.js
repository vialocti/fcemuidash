import { URI_REN } from '../utils/constantes.js'
import axios from 'axios'

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
    //console.log(anio,ubicacion,propuesta,plan,planversion)
    try {
        const rows = await axios.get(`${uri}/aluinfouno/${ubicacion}/${propuesta}/${plan}/${planversion}/${anio}`)
        //console.log(rows)
        return rows.data

    } catch (error) {

        console.log(error)
    }
}

//traer Indicesperiodos
export const traerIndicesTotPeriodo = async (anioI, anioF, sede)=>{
    try {
        if(sede==='0'){
            const rows = await axios.get(`${uri}/indicestotalesFac/${anioI}/${anioF}`)
            return rows.data

            }
        else{
            const rows = await axios.get(`${uri}/indicestotales/${anioI}/${anioF}/${sede}`)
            return rows.data
        }
     
        //console.log(rows)
        

    } catch (error) {

        console.log(error)
    }
}

// traer indices por sedesanios

export const traerIndicesTotperiodoSede =async (anioI, anioF) => {
    try {
      // 1. Genera el array de años.
      const anios = [];
      for (let anio = anioI; anio <= anioF; anio++) {
        anios.push(anio);
      } 
  
      // 2. Convierte el array en una cadena separada por comas.
      const aniosString = anios.join(',');
      const rows = await axios.get(`${uri}/indices?tipo=anio_sede&anios=${aniosString}`)
      return rows.data
      // 3. Construye el URL completo.
 
      
      // Aquí puedes usar la URL para hacer la petición, por ejemplo con fetch.
      //console.log(url); // Muestra el URL en la consola para verificar que se construyó correctamente.
      
      // Ejemplo de cómo usar fetch para llamar al endpoint.
      // const response = await fetch(url);
      // const data = await response.json();
      // return data;
      
    } catch (error) {
      console.log(error);
    }
  };


  export const traerIndicesTotperiodoPropuesta =async (anioI, anioF) => {
    try {
      // 1. Genera el array de años.
      const anios = [];
      for (let anio = anioI; anio <= anioF; anio++) {
        anios.push(anio);
      } 
  
      // 2. Convierte el array en una cadena separada por comas.
      const aniosString = anios.join(',');
      const rows = await axios.get(`${uri}/indices?tipo=anio_propuesta&anios=${aniosString}`)
      return rows.data
      // 3. Construye el URL completo.
 
      
      // Aquí puedes usar la URL para hacer la petición, por ejemplo con fetch.
      //console.log(url); // Muestra el URL en la consola para verificar que se construyó correctamente.
      
      // Ejemplo de cómo usar fetch para llamar al endpoint.
      // const response = await fetch(url);
      // const data = await response.json();
      // return data;
      
    } catch (error) {
      console.log(error);
    }
  };
  




//traer coef de tcarrera por propuesta
export const traerCoeficientesPropuestasPlan = async ()=>{
    try {
        
            const rows = await axios.get(`${uri}/aluindices`)
            return rows.data
       //console.log(rows)
        

    } catch (error) {

        console.log(error)
    }
}

