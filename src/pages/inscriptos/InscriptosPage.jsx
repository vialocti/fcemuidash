import React,{useEffect,useState} from 'react'

import { Box, Container, Grid, TextField, Typography } from '@mui/material'
//import IngresantesAnioSede from '../../components/ingresantes/IngreseantesAnioSede'
import { traerCantidadIncriptosUbicacionTSx } from '../../services/servicesInscriptos'
import InscriptosAnioSede from '../../components/inscriptos/InscriptosAnioSede'



const InscriptosPage = () => {

   const [cantidadTSx, setCantidadTSx]=useState(null)
  const [anio,setAnio] = useState(2024)

  const [anioTitulo, setanioTitulo] = useState(2024)
  
  useEffect(()=>{
    
    const getTraerDatos = async ()=>{
      if(anio>2005){
          setCantidadTSx(await traerCantidadIncriptosUbicacionTSx(anio))
      }else{

          setCantidadTSx(await traerCantidadIncriptosUbicacionTSx(1))
      }
    }

    getTraerDatos()
   
  },[anio])
  
/*
  const buscarInfo =()=>{

  }
*/
  const onHandleChange =()=>{
    setAnio(document.getElementById('anio').value)
    setanioTitulo(document.getElementById('anio').value)
  }
  //console.warn(cantidadTSx) 
 
  
  return (
    

      <Grid container>
         <Grid item xs={12} sm={12} md={12} sx={{display:'flex'}}>
            <Box sx={{height:'40px',background:'bluelight', mt:2, p:3, border:2}}>
            
            <TextField 
                  variant='standard'
                  type="text"
                  id="anio"
                  name="anio"
                  label="Año Ingreso "
                  
                  onChange={onHandleChange}
                  value={anio}
                
                />
                          
           </Box>     
           <Box sx={{height:'40px',background:'#BBBBBB', mt:2, p:3, border:2, width:'100%'}} >     
              
           <Typography variant='h6' textAlign={'center'}>Muestra el Número de Inscriptos en un Año lectivo</Typography>
          <Typography variant='h6' textAlign={'center'}>Por Genero, por tipo Ingreso, por Carrera y por Sede</Typography>
        
             
        
        </Box>
        </Grid>
        <Grid item>
            {cantidadTSx?
            <InscriptosAnioSede cantidadSede={cantidadTSx} anioT={anioTitulo}  />
            :null 
            }
        </Grid>
    </Grid>
     
  )
}
export default InscriptosPage