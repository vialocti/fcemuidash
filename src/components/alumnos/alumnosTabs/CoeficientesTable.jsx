import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
  { field: 'sede', headerName: 'Sede', width: 70 },
  { field: 'carrera', headerName: 'Carrera', width: 80 },
  { field: 'plan', headerName: 'Plan', width: 80 },
  { field: 'aniocursada', headerName: 'Año Cursada', width: 100 },
  { field: 'rango_coef', headerName: 'Rango Coef.', width: 120 },
  { field: 'cantidad_alumnos', headerName: 'Estud.', width: 100 },
   { field: 'promedio_coeficiente', headerName: 'Prom. Coef.', width: 120 },
  { field: 'min_coeficiente', headerName: 'Mínimo', width: 90 },
  { field: 'max_coeficiente', headerName: 'Máximo', width: 90 },
  { field: 'desvio_tipo', headerName: 'Desv.Típica', width: 130 },
   { field: 'promedio_completado', headerName: '% Carrera', width: 130 },
];

const CoeficienteTable = ({ rows }) => {
  return (
    <Box sx={{ height: 600, width: '100%', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Distribución según coeficiente de tiempo
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        getRowId={(row, index) =>
          `${row.sede}-${row.carrera}-${row.plan}-${row.aniocursada}-${row.rango_coef}-${index}`
        }
        rowsPerPageOptions={[15]}
      />
    </Box>
  );
};

export default CoeficienteTable;
