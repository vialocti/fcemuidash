import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, {useState } from 'react'
import InfoMuestraIndicesTotPeriodo from '../../components/cursadas/InfoMuestraIndicesTotPeriodo'
import { traerIndicesTotPeriodo } from '../../services/servicesRendimiento'

const IndicesTotalPeriodo = () => {

    const [anioI, setAnioI]=useState(2019)
    const [anioF, setAnioF]=useState(2023)
    const [sede, setSede]= useState('1')
    const [datosITP, setDatosITP]= useState(null)  
   
   
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


      const onHandleInfo=async()=>{
        setDatosITP(await traerIndicesTotPeriodo(anioI,anioF,sede))
       // console.log(datosHistoricos)
    
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

     <Grid item xs={12} md={2} sx={{ mr: 1 }}>
         <InputLabel id="anioI">Año Inicio</InputLabel>

         <TextField
           variant="standard"
           type="text"
           id="anioI"
           name="anioI"
           onChange={onHandleChange}
           value={anioI}
         />
       </Grid>

       <Grid item xs={12} md={2} sx={{ mr: 1 }}>
         <InputLabel id="anioF">Año Fin</InputLabel>

         <TextField
           variant="standard"
           type="text"
           id="anioF"
           name="anioF"
           onChange={onHandleChange}
           value={anioF}
         />
       </Grid>

       <Grid item xs={12} md={2}>
         <InputLabel id="sede">Sede</InputLabel>
         <Select
           variant="standard"
           name="sede"
           id="sede"
           value={sede}
           onChange={onHandleChange}
         >
             <MenuItem value={'0'}>Facultad</MenuItem>
             <MenuItem value={'1'}>Mendoza</MenuItem>
             <MenuItem value={'2'}>San Rafael</MenuItem>
             <MenuItem value={'4'}>Este</MenuItem>
           
         </Select>
       </Grid>

       
      
       <Grid item xs={12} md={2} sx={{ ml: 20, mt: 2 }}>
             <Button variant="outlined" onClick={onHandleInfo}>
                     Aceptar
              </Button>
         </Grid>
       
         

       

     </Box>

   </Grid>
    
   {datosITP
   
     ?<InfoMuestraIndicesTotPeriodo datosI={datosITP} />
     :null

   }
 
 </Container>
  )
}

export default IndicesTotalPeriodo