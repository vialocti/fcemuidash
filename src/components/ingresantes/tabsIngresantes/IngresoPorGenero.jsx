// IngresoPorGenero.jsx
import React, { useEffect, useState } from 'react';
import { Box,  Paper, Typography } from '@mui/material';
//import PieChartOne from '../../../utils/graphics/PieChartOne';
import BarChartBasic from '../../../utils/graphics/BarChartBasic';
//import PieChartOne from './PieChartOne'; // Asegúrate que el componente PieChartOne esté disponible

const IngresoPorGenero = ({ cantidadSede }) => {
  const [totalF, setTotalF] = useState(0);
  const [totalM, setTotalM] = useState(0);
  const [totalX, setTotalX] = useState(0);

  useEffect(() => {
    let f = 0, m = 0, x = 0;
    cantidadSede.forEach(({ sexo, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (sexo === 'F') f += cantidad;
      else if (sexo === 'M') m += cantidad;
      else if (sexo === 'X') x += cantidad;
    });

    setTotalF(f);
    setTotalM(m);
    setTotalX(x);
  }, [cantidadSede]);

  const datos = [totalF, totalM, totalX];
  const etiquetas = ['Mujer', 'Hombre', 'No Binario'];

  return (
    <>
      <Box sx={{ textAlign: 'center', border: 1, m: 1 }}>
        <Typography variant="h6">Ingreso por Género</Typography>
      </Box>
      <Paper sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center' }}>
        <Box sx={{ width: '50%', height: '50%' }}>
       
       <BarChartBasic datos={datos} etiquetas={etiquetas} label="Por Propuesta" />
        </Box>
        <Box sx={{ ml: 4, mb: 25 }}>
          <Typography>Mujeres: {totalF}</Typography>
          <Typography>Hombres: {totalM}</Typography>
          <Typography>No Binario: {totalX}</Typography>
        </Box>
      </Paper>
    </>
  );
};

export default IngresoPorGenero;
//<PieChartOne datos={datos} labels={labels} label={'Por Género'} />