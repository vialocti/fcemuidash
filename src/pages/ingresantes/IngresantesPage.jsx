import React,{useEffect,useState} from 'react'
import { traerCantidadIngreso, traerCantidadIngresoUbicacion,traerCantidadIngresoUbicacionTSx } from '../../services/servicesIngresantes'
import { Box, Container, Grid, TextField, Typography } from '@mui/material'
import IngresantesAnioSede from '../../components/ingresantes/IngreseantesAnioSede'



const IngresantesPage = () => {

 // const [cantidad, setCantidad]= useState(0)
  //const [cantidadSede, setCantidadSede]=useState(null)
  const [cantidadTSx, setCantidadTSx]=useState(null)
  const [anio,setAnio] = useState(2023)

  const [anioTitulo, setanioTitulo] = useState(2023)
  
  useEffect(()=>{
    
    const getTraerDatos = async ()=>{
      if(anio>2005){
   //       setCantidad(await traerCantidadIngreso(anio))
          //setCantidadSede(await traerCantidadIngresoUbicacion(anio))
          setCantidadTSx(await traerCantidadIngresoUbicacionTSx(anio))
    }else{
     // setCantidad(await traerCantidadIngreso(1))
      //setCantidadSede(await traerCantidadIngresoUbicacion(1))
      setCantidadTSx(await traerCantidadIngresoUbicacionTSx(1))
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
           <Box sx={{height:'40px',background:'bluelight', mt:2, p:3, border:2, width:'100%'}} >     
              
              <Typography variant='h6' textAlign={'center'}>Muestra el Número de Ingresantes en un Año lectivo</Typography>
              <Typography variant='h6' textAlign={'center'}>Por Genero, por tipo Ingreso, por Carrera y por Sede</Typography>
        
          </Box>
        </Grid>
        <Grid item>
            {cantidadTSx?
            <IngresantesAnioSede cantidadSede={cantidadTSx} anioT={anioTitulo}  />
            :null 
            }
        </Grid>
    </Grid>
     
  )
}
export default IngresantesPage