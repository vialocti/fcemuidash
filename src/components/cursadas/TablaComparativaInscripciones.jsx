import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import React from 'react'

const calcularPorcentaje = (rechazado, total) => {
  if (!total || total === 0) return '0 %';
  return `${((rechazado / total) * 100).toFixed(1)} %`;
}

const TablaComparativaInscripciones = ({ datos }) => {
  
 //console.log(datos)

  const datosCompletos = datos &&
    Array.isArray(datos.anios) &&
    Array.isArray(datos.totales) &&
    Array.isArray(datos.aceptados) &&
    Array.isArray(datos.rechazados) &&
    datos.anios.length > 0 &&
    datos.totales.length > 0
    
  if (!datosCompletos) return null
 // console.log(datosCompletos)
  return (
    <TableContainer component={Paper}>
      <Typography variant='h6' sx={{ mt: 2, mb: 1 }}>Comparativa Inscripciones</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Año</strong></TableCell>
            {datos.anios.map((año) => (
              <TableCell key={año} align="center"><strong>{año}</strong></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><strong>Inscripciones</strong></TableCell>
            {datos.totales.map((total, idx) => (
              <TableCell key={idx} align="center">{total}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell><strong>Aceptados</strong></TableCell>
            {datos.aceptados.map((val, idx) => (
              <TableCell key={idx} align="center">{val}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell><strong>Rechazados</strong></TableCell>
            {datos.rechazados.map((val, idx) => (
              <TableCell key={idx} align="center">{val}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell><strong>% Rechazo</strong></TableCell>
            {datos.rechazados.map((rechazo, idx) => (
              <TableCell key={idx} align="center">
                {calcularPorcentaje(rechazo, datos.totales[idx])}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaComparativaInscripciones
