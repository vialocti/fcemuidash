import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { traerIndicesTotPeriodo, traerIndicesTotperiodoPropuesta, traerIndicesTotperiodoSede } from '../../services/servicesRendimiento'

import IndiceTotSede from '../../components/rendimiento/indicestotalestabs/IndiceTotSede';
import IndicesTotPropuesta from '../../components/rendimiento/indicestotalestabs/IndicesTotPropuesta';
import InfoMuestraIndicesTotPeriodo from '../../components/rendimiento/indicestotalestabs/InfoMuestraIndicesTotPeriodo';

const IndicesTotalPeriodo = () => {


    // Año inicial inteligente
  const getAnioInicial = () => {
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const fechaLimite = new Date(anioActual, 2, 31); // 31 de marzo
    return hoy > fechaLimite ? anioActual : anioActual - 1;
  };
    const [anioI, setAnioI]=useState(getAnioInicial()-4)
    const [anioF, setAnioF]=useState(getAnioInicial()-1)
    const [sede, setSede]= useState('0')
    const [datosITP, setDatosITP]= useState([])
    const [datosIPropuesta, setDatosIPropuesta]=useState([]) 
    const [datosISede, setDatosIsede]=useState([]) 

    const [seleccion, setSeleccion] = useState(''); 
   
   
    const onHandleChange=(e)=>{
        if(e.target.name==='anioI'){
          setAnioI(e.target.value)
          setAnioF(parseInt(e.target.value) + 1)
        }else if(e.target.name==='anioF'){
          setAnioF(e.target.value)
        
        }else if(e.target.name==='sede'){
          setSede(e.target.value)
        }
     
      }    

      useEffect(()=>{
        const traerDatos =async ()=>{
        try {
          const [
            dataITP,
            dataIPropuesta,
            dataISede
          ] = await Promise.all([
            traerIndicesTotPeriodo(anioI, anioF, sede),
            traerIndicesTotperiodoPropuesta(anioI, anioF),
            traerIndicesTotperiodoSede(anioI, anioF),
          ]);
  
          setDatosITP(dataITP);
          setDatosIPropuesta(dataIPropuesta);
          setDatosIsede(dataISede);
  
        } catch (error) {
          console.log(error)
        }
        
        
       }
        if(anioI > 2018 && anioF>anioI){
          traerDatos()
        }
      },[anioF, anioI])


      const onHandleInfo=async()=>{
        setDatosITP(await traerIndicesTotPeriodo(anioI,anioF,sede))
     
    
      }
     
      if(datosITP){
        console.log(datosITP)
      }
  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
    <Grid container>
     
    
     <Box
       sx={{
         display: "flex",
         border: 1,
         borderRadius: 2,
         backgroundColor: "beige",
         width: "100%",
         p: 1,
         flexWrap: "wrap",
       }}
     ><
       Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>
       <Typography variant="h6" textAlign={"center"}>
         Indices de Cursada Total sede - Periodo
       </Typography>
     </Grid>

 
</Box>
       <Grid container spacing={2} sx={{ p: 3 }}>
            {/* Columna izquierda */}
            <Grid item xs={12} md={2}>
            <Paper elevation={2} sx={{ p: 2, mt:4}}>

              
                <Typography variant="h6" sx={{ mb: 2 }}>Año Inicio </Typography>
                 <TextField
                  name="anioI"
                  variant="outlined"
                  fullWidth
                  value={anioI}
                  type="number" 
                   onChange={onHandleChange}
                  
                  sx={{ mb: 2 }}
                />
               
               <Typography variant="h6" sx={{ mb: 2 }}>Año Fin </Typography>
                 <TextField
                  name="anioF"
                  variant="outlined"
                  fullWidth
                  value={anioF}
                  type="number" 
                   onChange={onHandleChange}
                  
                  sx={{ mb: 2 }}
                />

              <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('indicestot')}
                >
                  Indices Facultad
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('indiceprop')}
                >
                  Indices Propuesta
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('indicesede')}
                >
                  Indices Sedes
                </Button>
                
                </Paper>
            </Grid>

            <Grid item xs={12} md={10}>
 
            {seleccion === 'indicestot' &&  datosITP &&  <InfoMuestraIndicesTotPeriodo datosI={datosITP} />}
            {seleccion === 'indiceprop' && datosIPropuesta && <IndicesTotPropuesta datosApi={datosIPropuesta} />}
            {seleccion === 'indicesede' && datosISede && <IndiceTotSede datosApi={datosISede} />}
           
            </Grid>

      </Grid>       

     

   </Grid>
    
  
 
 </Container>
  )
}

export default IndicesTotalPeriodo