import { Grid, Paper, Typography } from '@mui/material';

import React from 'react';
import { agruparYCalcularResumen } from '../../../utils/helpers/calculopromedioindices';

const PromediosPorPeriodo = ({ data }) => {
  const promediosPorPeriodo = agruparYCalcularResumen(data, 'periodo');
  console.log(promediosPorPeriodo)
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Promedios por Período
      </Typography>
      <Grid container spacing={2}>
        {promediosPorPeriodo.map((item, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={`${item.nombre}-${index}`}
          >
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {item.nombre}
              </Typography>
              <Typography variant="body2">
                <strong>Total Inscriptos:</strong> {item.total_inscriptos}
              </Typography>
              <Typography variant="body2">
                <strong>Índice Cursada:</strong> {item.indice_cursada.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                <strong>Índice E1:</strong> {item.indice_e1.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                <strong>Índice E2:</strong> {item.indice_e2.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PromediosPorPeriodo;
