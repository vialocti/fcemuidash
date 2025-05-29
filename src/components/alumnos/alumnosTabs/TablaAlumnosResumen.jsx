// src/components/ResumenAlumnosTable.jsx

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import { URI_ALU } from '../../../utils/constantes.js';

const uri = URI_ALU;

const TablaAlumnosResumen = ({ ubicacionFiltro, propuestaFiltro }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(`${uri}/resumenalumnos`);
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error('Error fetching alumnos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  // Aplicamos filtros si están definidos
  const alumnosFiltrados = alumnos.filter(alumno => {
    const coincideUbicacion = !ubicacionFiltro || alumno.ubicacion === ubicacionFiltro;
    const coincidePropuesta = !propuestaFiltro || alumno.propuesta === propuestaFiltro;
    return coincideUbicacion && coincidePropuesta;
  });

  if (alumnosFiltrados.length === 0) {
    return <Typography variant="h6">No hay datos disponibles con los filtros aplicados.</Typography>;
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{ maxHeight: 500, overflow: 'auto', mt: 3, boxShadow: 3 }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><strong>Sede</strong></TableCell>
            <TableCell><strong>Propuesta</strong></TableCell>
            <TableCell><strong>Año Cursada</strong></TableCell>
            <TableCell align="right"><strong>Cantidad</strong></TableCell>
            <TableCell align="right"><strong>%Coef. Carrera</strong></TableCell>
            <TableCell align="right"><strong>%Completado</strong></TableCell>
            <TableCell align="right"><strong>%Pérdida Reg.</strong></TableCell>
            <TableCell align="right"><strong>%Promedio CA</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnosFiltrados.map((alumno, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: alumno.propuesta === 'TOTAL' ? '#e0f7fa' : 'inherit',
                fontWeight: alumno.propuesta === 'TOTAL' ? 'bold' : 'normal',
              }}
            >
              <TableCell>{alumno.ubicacion}</TableCell>
              <TableCell>{alumno.propuesta}</TableCell>
              <TableCell>{alumno.aniocursada !== null ? alumno.aniocursada : '-'}</TableCell>
              <TableCell align="right">{alumno.cantidad_alumnos}</TableCell>
              <TableCell align="right">{alumno.promedio_coef_tcarrera}</TableCell>
              <TableCell align="right">{alumno.promedio_completado}</TableCell>
              <TableCell align="right">{alumno.promedio_perdidas_reg}</TableCell>
              <TableCell align="right">{alumno.promedio_promedioca}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaAlumnosResumen;
