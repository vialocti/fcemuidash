import React, { useEffect, useState } from 'react'
import { traerAprobadasAnio } from '../../services/servicesExamenes'
import { Box, CircularProgress, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'




const InfoMuestraAprobadasT = ({anio,sede,propuesta}) => {

const [datosA, setdatosA] = useState(null)

  useEffect(() => {
   
  
    const cargarDatos = async() => {
      let tipoO="Q"
      setdatosA(await traerAprobadasAnio(anio,sede,propuesta, tipoO))
    }

    if (anio && sede && propuesta){
      cargarDatos()
    }
  }, [anio, sede,propuesta])
  

  const sumarT = (datosA)=>{
    return datosA[0].cero + datosA[0].una + datosA[0].dos + datosA[0].tres + datosA[0].cuatro + datosA[0].cinco + datosA[0].seis + datosA[0].siete + datosA[0].ocho + datosA[0].nueve
  }

  const sumarmas3 = (datosA)=>{
    return datosA[0].cuatro + datosA[0].cinco + datosA[0].seis + datosA[0].siete + datosA[0].ocho + datosA[0].nueve
  }
  if(datosA){
   
  }

  return (
    <Container>
    
        <Typography variant='h5'>alumnos/nro aprobadas, %curso completo y %promocionados a 2do año</Typography>

        <Table>
        <TableHead>
                  <TableRow>
                    <TableCell>Ingres.</TableCell>
                    <TableCell>Cero Aprobadas</TableCell>
                    <TableCell>Una Aprobadas</TableCell>
                    <TableCell>Dos Aprobadas</TableCell>
                    <TableCell>Tres Aprobadas</TableCell>
                    <TableCell>Cuatro Aprobadas</TableCell>
                    <TableCell>Cinco Aprobadas</TableCell>
                    <TableCell>Seis Aprobadas</TableCell>
                    <TableCell>Siete Aprobadas</TableCell>
                    <TableCell>Ocho Aprobadas</TableCell>
                    <TableCell>Nueve Aprobadas</TableCell>
                    <TableCell>Curso Completo</TableCell>
                    <TableCell>Pasan a 2do Año</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
            {datosA ?datosA.length >0? 
                
                <TableRow>
                   <TableCell>{sumarT(datosA)}</TableCell>
                    <TableCell>{datosA[0].cero}</TableCell>
                    <TableCell>{datosA[0].una}</TableCell> 
                    <TableCell>{datosA[0].dos}</TableCell>
                    <TableCell>{datosA[0].tres}</TableCell>
                    <TableCell>{datosA[0].cuatro}</TableCell>
                    <TableCell>{datosA[0].cinco}</TableCell>
                    <TableCell>{datosA[0].seis}</TableCell>
                    <TableCell>{datosA[0].siete}</TableCell>
                    <TableCell>{datosA[0].ocho}</TableCell>
                    <TableCell>{datosA[0].nueve}</TableCell>
                    <TableCell>{(datosA[0].nueve/sumarT(datosA)).toFixed(2)}</TableCell>
                    <TableCell>{(sumarmas3(datosA)/sumarT(datosA)).toFixed(2)}</TableCell>
                    
              </TableRow>
            
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

export default InfoMuestraAprobadasT