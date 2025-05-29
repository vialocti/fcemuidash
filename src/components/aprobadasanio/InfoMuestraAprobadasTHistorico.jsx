import React, { useEffect, useState } from 'react'
//import { traerAprobadasAluAnioHist } from '../../services/servicesExamenes'
import { Box, CircularProgress, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'




const InfoMuestraAprobadasTHistorico = ({datosA}) => {

//const [totalI, setTotalI] = useState(0)

  useEffect(() => {
   
  
  
  }, [])
  
  const sumar=(ele)=>{
    return ele.ap_cero + ele.ap_una + ele.ap_dos + ele.ap_tres  + ele.ap_cuatro + ele.ap_cinco + ele.ap_seis + ele.ap_siete +ele.ap_ocho + ele.ap_nueve
  }

  const sumarmas3=(ele)=>{
    return ele.ap_cuatro + ele.ap_cinco + ele.ap_seis + ele.ap_siete +ele.ap_ocho + ele.ap_nueve
  }
  
  if(datosA){
    console.log(datosA)
  }

  return (
    <Container maxWidth={false}>
    
        <Typography variant='h4'>Datos Historicos, cantidad de alumnos por numero de materias aprobadas </Typography>

        <Table>
        <TableHead>
                  <TableRow>
                    <TableCell>Año</TableCell>
                    <TableCell>Propuesta</TableCell>
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
                datosA.map((ele,index)=>(
                <TableRow key={index}>
                    <TableCell>{ele.anio}</TableCell> 
                    <TableCell>{ele.propuesta}</TableCell>
                    <TableCell>{sumar(ele)}</TableCell>
                    <TableCell>{ele.ap_cero}</TableCell>
                    <TableCell>{ele.ap_una}</TableCell> 
                    <TableCell>{ele.ap_dos}</TableCell>
                    <TableCell>{ele.ap_tres}</TableCell>
                    <TableCell>{ele.ap_cuatro}</TableCell>
                    <TableCell>{ele.ap_cinco}</TableCell>
                    <TableCell>{ele.ap_seis}</TableCell>
                    <TableCell>{ele.ap_siete}</TableCell>
                    <TableCell>{ele.ap_ocho}</TableCell>
                    <TableCell>{ele.ap_nueve}</TableCell>
                    <TableCell>{(ele.ap_nueve/sumar(ele)).toFixed(2)}</TableCell>
                    <TableCell>{(sumarmas3(ele)/sumar(ele)).toFixed(2)}</TableCell>
                    
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

export default InfoMuestraAprobadasTHistorico