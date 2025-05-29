import React, { useState } from 'react'
import { traerAprobadasAnioActividades } from '../../services/servicesExamenes'
import { useEffect } from 'react'
import { Box, CircularProgress, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

const InfoMuestraAprobadasActividad = ({anio,sede,propuesta}) => {

  const [datosAc, setdatosAc] = useState(null)

  useEffect(() => {
   
  
    const cargarDatos = async() => {
      
      setdatosAc(await traerAprobadasAnioActividades(anio,sede,propuesta))
    }

    if (anio && sede && propuesta){
      cargarDatos()
    }
  }, [anio, sede,propuesta])
  
/*
  if(datosAc){
    console.log(datosAc)
  }
    */
  return (
    <Container>
    <hr />
    
  
   
 
    <Typography variant='h4'>Datos promocionados, examenes aprobados, reprobados y ausentes</Typography>
    
    

    <Table>
    <TableHead>
                  <TableRow>
                    <TableCell>Actividad</TableCell>
                    <TableCell>Promocionados</TableCell>
                    <TableCell>Aprobadas Examen</TableCell>
                    <TableCell>Reprobados Examen</TableCell>
                    <TableCell>Ausentes Examen</TableCell>
                    <TableCell>Total de Aprobados</TableCell>
                    
                  </TableRow>
                  
                  </TableHead>
                   
                   <TableBody>
                   {datosAc?datosAc.length>0
                    ? datosAc.map((dato, index) => (
                        <TableRow key={index}>
                          <TableCell>{dato.actividad}</TableCell>
                          <TableCell>{dato.promocionados}</TableCell> 
                          <TableCell>{dato.aprobadosE}</TableCell>
                          <TableCell>{dato.reprobadosE}</TableCell>
                          <TableCell>{dato.ausentesE}</TableCell>
                         <TableCell>{parseInt(dato.promocionados) + parseInt(dato.aprobadosE)}</TableCell>
                        
                        </TableRow>
                      ))
                    :   <Box sx={{ display: 'flex' }}>
                
                             <CircularProgress  />
                        </Box>:
                        
                        <Box sx={{ display: 'flex' }}>
                
                             <CircularProgress  />
                        </Box>}

                  </TableBody>

    </Table>
    </Container>
  )
}

export default InfoMuestraAprobadasActividad