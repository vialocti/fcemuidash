import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { traerdatosListadoInfoAlu } from '../../services/servicesUtils'
import { CSVLink } from "react-csv";


const ReportesListadoAlumnosInfo = ({anio,propuestas,matap}) => {
  const [datosListado, setDatosListado]=useState(null)

 
useEffect(()=>{
    const grabarDatos=async (anio,propuestas,matap)=>{
        //console.log(anio,propuestas,matap)
        setDatosListado(await traerdatosListadoInfoAlu(anio,propuestas,matap))
    }
   

    if(anio > 0){ 
      
        grabarDatos(anio,propuestas,matap)
    }
  }, [anio,propuestas,matap])

  if (datosListado){
    console.log(datosListado)
  }
  return (
    <Container maxWidth='fluid' sx={{m:4}}>

     
       {datosListado?  
       <Grid container>
          
           <Grid xs={12} md={8}>
           <Typography variant='h5'>Listado Alumnos Curso Completo- Anio Ingreso: {anio}, Actividades Aprobadas:{matap}</Typography> 
          </Grid>

          
          <Grid xs={12} md={4}>
        
                        <Button variant='outlined'>
                        
                        <CSVLink data={datosListado} separator=";" filename={anio +"Resultado" +  ".csv"}>Exportar</CSVLink>
                       
                        </Button> 
      
                             
            
          </Grid>
       
       <Grid xs={12} md={12}>
        <TableContainer component={Paper} sx={{ maxWidth: '90%', mx: "auto", mt: 2 }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Legajo</TableCell>
            <TableCell>Nro Documento</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Propuesta</TableCell>
            <TableCell>Prom. CA</TableCell>
            <TableCell>Prom. SA</TableCell>
            <TableCell>Aprobadas</TableCell>
            <TableCell>Reprobadas</TableCell>
            <TableCell>Coef. TCarrera</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datosListado.map((fila, index) => (
            <TableRow key={index}>
              <TableCell>{fila.legajo}</TableCell>
              <TableCell>{fila.nro_documento}</TableCell>
              <TableCell>{fila.apellido}</TableCell>
              <TableCell>{fila.nombres}</TableCell>
              <TableCell>{fila.ubicacion}</TableCell>
              <TableCell>{fila.propuesta}</TableCell>
              <TableCell>{fila.promedioca}</TableCell>
              <TableCell>{fila.promediosa}</TableCell>
              <TableCell>{fila.aprobadas}</TableCell>
              <TableCell>{fila.reprobadas}</TableCell>
              <TableCell>{fila.coef_tcarrera}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
    </Grid>
    :null}
    </Container>
  )
}

export default ReportesListadoAlumnosInfo