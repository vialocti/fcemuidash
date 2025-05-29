import { Box, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { traerCantidadIngresoUbicacionTSx } from '../../services/servicesIngresantes'

//import IngresantesAnioSede from '../../components/ingresantes/IngreseantesAnioSede'
import IngresantesTabs from '../../components/ingresantes/IngresantesTabs'

const IngresantesPage = () => {

  const [estadoingreso, setestadoingreso]= useState(1)
  //const [cantidadSede, setCantidadSede]=useState(null)
  const [cantidadTSx, setCantidadTSx]=useState(null)
  const [anio,setAnio] = useState(2025)

 // const [anioTitulo, setanioTitulo] = useState(2023)
  
  useEffect(()=>{
    
    const getTraerDatos = async ()=>{
      if(anio>2005){
   //       setCantidad(await traerCantidadIngreso(anio))
          //setCantidadSede(await traerCantidadIngresoUbicacion(anio))
          setCantidadTSx(await traerCantidadIngresoUbicacionTSx(anio,estadoingreso))
    
        }else{
     // setCantidad(await traerCantidadIngreso(1))
      //setCantidadSede(await traerCantidadIngresoUbicacion(1))
      setCantidadTSx(await traerCantidadIngresoUbicacionTSx(1))
    }
    }

    getTraerDatos()
   
  },[anio, estadoingreso])
  
/*
  const buscarInfo =()=>{

  }
*/
  const onHandleChange =()=>{
    setAnio(document.getElementById('anio').value)
    //setanioTitulo(document.getElementById('anio').value)
    //setestadoingreso(document.getElementById('estadoingreso').value)
  }
  //console.warn(cantidadTSx) 
 
  
  return (
    

      <Grid container>
        
            
               
                <Grid item xs={12} md={2}>
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
                </Grid>
               

                <Grid item xs={12} md={3}>
                <Box sx={{height:'40px',background:'bluelight', mt:2, p:3, border:2}}>
                <InputLabel id='estadoingreso'>Estado Ingreso</InputLabel>
                <Select 
                 variant='standard'
                 name="estadoingreso"
                 id='estadoingreso' 
                 value={estadoingreso}
                 onChange={(event)=>setestadoingreso(event.target.value)}>
                    <MenuItem value="1">Con Legajo</MenuItem>
                    <MenuItem value="2">Provisorios(s.Legajo)</MenuItem>
                    
                </Select>
                 </Box>         
           </Grid>
           
            <Grid item xs={12} md={7}>
           
           <Box sx={{height:'40px',background:'bluelight', mt:2, p:3, border:2}} >     
              
              <Typography variant='h6' textAlign={'center'}>Muestra el Número de Ingresantes en un Año lectivo</Typography>
              <Typography variant='h6' textAlign={'center'}>Sin Legajo Alumnos Ingresantes sin Matricular </Typography>
        
          </Box>
        </Grid>
        <Grid item xs={12}>
            {cantidadTSx?
            <IngresantesTabs cantidadSede={cantidadTSx}  />
            :null 
            }
        </Grid>
    </Grid>
     
  )
}
export default IngresantesPage