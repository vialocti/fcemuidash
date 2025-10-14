import { Grid, Paper, Typography } from '@mui/material';

import React from 'react';
import { calcularPromedios } from '../../../utils/helpers/calculopromedioindices';

const PromediosGenerales = ({ data }) => {
  const promedios = calcularPromedios(data);

  return (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Promedios Generales
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">
            **Índice Cursada**: {promedios.indice_cursada}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">
            **Índice E1**: {promedios.indice_e1}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">
            **Índice E2**: {promedios.indice_e2}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PromediosGenerales;