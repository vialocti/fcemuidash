import { Divider, Grid, Paper, Typography } from '@mui/material';

import React from 'react';
import { agruparYCalcularResumen } from '../../../utils/helpers/calculopromedioindices';

const PromediosPorSede = ({ data }) => {
  const promediosPorSede = agruparYCalcularResumen(data, 'sede');
  console.log(promediosPorSede)
  // Calcular totales globales
  const totales = promediosPorSede.reduce(
    (acc, item) => {
      acc.indice_cursada += item.indice_cursada;
      acc.indice_e1 += item.indice_e1;
      acc.indice_e2 += item.indice_e2;
      return acc;
    },
    { indice_cursada: 0, indice_e1: 0, indice_e2: 0 }
  );

  const cantidad = promediosPorSede.length;
  const totalesPromedio = {
    indice_cursada: totales.indice_cursada / cantidad,
    indice_e1: totales.indice_e1 / cantidad,
    indice_e2: totales.indice_e2 / cantidad,
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Promedios por Sede
      </Typography>
      <Grid container spacing={2}>
        {promediosPorSede.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${item.nombre}-${index}`}>
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

export default PromediosPorSede;
