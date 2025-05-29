import React, { useState } from 'react'
import InfoMuestraAprobadasTHistorico from '../../components/aprobadasanio/InfoMuestraAprobadasTHistorico'
import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { traerAprobadasAluAnioHist } from '../../services/servicesExamenes'

const AprobadasHistoricosprimer = () => {

    const [anioI, setAnioI]=useState(2019)
    const [anioF, setAnioF]=useState(2023)
    const [propuesta, setPropuesta]= useState('2')
    const [sede, setSede]= useState('1')
    const [datosHistoricos, setDatosHistoricos]=useState(null)

  


    const onHandleChange=(e)=>{
        if(e.target.name==='anioI'){
          setAnioI(e.target.value)
          setAnioF(e.target.value)
        }else if(e.target.name==='anioF'){
          setAnioF(e.target.value)
        }else if(e.target.name==='propuesta'){
          setPropuesta(e.target.value)
        }else if(e.target.name==='sede'){
          setSede(e.target.value)
        }
     
      }    


      const onHandleInfo=async()=>{
        setDatosHistoricos(await traerAprobadasAluAnioHist(sede,propuesta,anioI,anioF))
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
         width: "97%",
         p: 2,
         flexWrap: "wrap",
       }}
     ><
       Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>
       <Typography variant="h6" textAlign={"center"}>
         Datos de cantidad de Alumnos por Materias Aprobadas Historico
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
             <MenuItem value={'1'}>Mendoza</MenuItem>
             <MenuItem value={'2'}>San Rafael</MenuItem>
             <MenuItem value={'3'}>Gral.Alvear</MenuItem>
             <MenuItem value={'4'}>Este</MenuItem>
           
         </Select>
       </Grid>

       <Grid item xs={12} md={2}>
       <InputLabel id="propuesta">Propuesta Academica</InputLabel>
            <Select
              variant="standard"
              name="propuesta"
              id="propuesta"
              onChange={onHandleChange}
              value={propuesta}
            >
            
              <MenuItem value={'2'}>LICENCIATURA EN ADMINISTRACION</MenuItem>
              <MenuItem value={'3'}>LICENCIATURA EN ECONOMIA</MenuItem>
              <MenuItem value={'6'}>LGN.REGIONALES</MenuItem>
              <MenuItem value={'7'}>LICENCIADO EN LOGISTICA</MenuItem>
              <MenuItem value={'8'}>CONTADOR PUBLICO</MenuItem>
              <MenuItem value={'10'}>TODAS</MenuItem>

            </Select>
      
       </Grid>
      
       <Grid item xs={12} md={2} sx={{ ml: 20, mt: 2 }}>
             <Button variant="outlined" onClick={onHandleInfo}>
                     Aceptar
              </Button>
         </Grid>
       
         

       

     </Box>

   </Grid>
   {datosHistoricos
   
     ?<InfoMuestraAprobadasTHistorico datosA={datosHistoricos} />
     :null

   }
 
 </Container>
  )
}

export default AprobadasHistoricosprimer