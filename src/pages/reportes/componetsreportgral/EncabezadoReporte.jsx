import React from 'react';
import { Typography, Paper, Stack } from '@mui/material';

// Mapeo para mostrar valores legibles desde los códigos
const sedesMap = {
  1: 'Mendoza',
  2: 'San Rafael',
  4: 'Este',
  5: 'FCE',
};

const periodosMap = {
  1: 'Anual',
  2: '1er Cuatrimestre',
  3: '2do Cuatrimestre',
};

const EncabezadoReporte = ({ anio, sede, periodo }) => {
  return (
    <Paper elevation={2} sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Informe general - Período lectivo: {periodosMap[periodo]}, Año: {anio}, Sede: {sedesMap[sede]}
      </Typography>

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body1">• Aspirantes totales</Typography>
        <Typography variant="body1">• Ingresantes</Typography>
        <Typography variant="body1">• Alumnos reinscriptos</Typography>
        <Typography variant="body1">• Alumnos inscriptos a cursada</Typography>
        <Typography variant="body1">• Exámenes</Typography>
        <Typography variant="body1">• Egresados totales</Typography>
        <Typography variant="body1">• Índice de Cursada Final</Typography>
      </Stack>
    </Paper>
  );
};

export default EncabezadoReporte;
