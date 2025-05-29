import React from 'react';
//import axios from 'axios';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Button } from '@mui/material';
import { CSVLink } from 'react-csv';

const ReporteResultadoExamen = ({ datosmesa}) => {
   

 //console.log(datosmesa)
  return (
    <Container >
    <Typography variant='h5'>Mesas de Examenes</Typography>
    <TableContainer component={Paper} style={{ maxHeight: 500 }}>
      <Table stickyHeader>
     
        <TableHead>
          <TableRow>

           <TableCell>Propuesta</TableCell>
            <TableCell>Actividad</TableCell>
            <TableCell>Nombre Mesa</TableCell>
            <TableCell>Aprobados</TableCell>
            <TableCell>Reprobados</TableCell>
            <TableCell>Ausentes</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>%Aprobados</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datosmesa.map((mesa) => (
            <TableRow key={mesa.mesa_examen}>
              <TableCell>{mesa.propuesta}</TableCell>
              <TableCell>{mesa.mesa_examen_elemento_nombre}</TableCell>
              <TableCell>{mesa.mesa_examen_nombre}</TableCell>
              <TableCell>{mesa.aprobados}</TableCell>
              <TableCell>{mesa.reprobados}</TableCell>
              <TableCell>{mesa.ausentes}</TableCell>
              <TableCell>{mesa.total}</TableCell>
              <TableCell>{(mesa.aprobados/(mesa.total-mesa.ausentes) * 100).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <CSVLink data={datosmesa} separator=";" filename={`mesas.csv`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Exportar Datos Primarios a CSV
          </Button>
        </CSVLink>
    </Container>
  );
};

export default ReporteResultadoExamen;
