import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper
} from '@mui/material';
import EncabezadoReporte from './componetsreportgral/EncabezadoReporte';

const ReporteGeneral = () => {
  const [filtros, setFiltros] = useState({
    anio: 2024,
    sede: '1',
    periodo: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Filtros aplicados:', filtros);
  };

  return (
    <>
    <Paper elevation={3} sx={{ padding: 1, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Reporte General Periodo Lectivo
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Año"
              name="anio"
              inputProps={{ min: 2019, max: 2032 }}
              value={filtros.anio}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Sede"
              name="sede"
              value={filtros.sede}
              onChange={handleChange}
            >
              <MenuItem value="1">Mendoza</MenuItem>
              <MenuItem value="2">San Rafael</MenuItem>
              <MenuItem value="4">Este</MenuItem>
              <MenuItem value="5">FCE</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Período"
              name="periodo"
              value={filtros.periodo}
              onChange={handleChange}
            >
              <MenuItem value="1">Anual</MenuItem>
              <MenuItem value="2">1er Cuatrimestre</MenuItem>
              <MenuItem value="3">2do Cuatrimestre</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3} display="flex" alignItems="center">
            <Button type="submit" variant="contained" color="primary">
              Ejecutar Consulta
            </Button>
          </Grid>
        </Grid>
      </Box>
</Paper>
      {/* Aquí irían los subcomponentes según los filtros */}
      <Box sx={{ mt: 2 }}>
      <EncabezadoReporte
            anio={filtros.anio}
            sede={filtros.sede}
            periodo={filtros.periodo}
            />
        {/* <ResumenEstadistico filtros={filtros} /> */}
        {/* <ReporteExamenes filtros={filtros} /> */}
        {/* etc... */}
      </Box>
    </>
  );
};

export default ReporteGeneral;
