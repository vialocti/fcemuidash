// IngresoPorSede.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BarChartBasic from '../../../utils/graphics/BarChartBasic';
//import BarChartBasic from './BarChartBasic'; // Asegúrate de tener este componente

const IngresoPorSede = ({ cantidadSede }) => {
  const [totales, setTotales] = useState({});
  const [sedes, setsedes]=useState([])


  useEffect(()=>{
    setsedes(['MZA', 'SRF', 'GALV', 'ESTE'])
  },[])


  useEffect(() => {
    const t = {};
    sedes.forEach(s => t[s] = 0);

    cantidadSede.forEach(({ sede, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (t[sede] !== undefined) {
        t[sede] += cantidad;
      }
    });

    setTotales(t);
  }, [cantidadSede, sedes]);

  const datos = sedes.map(s => totales[s]);
  const etiquetas = sedes;

  return (
    <Box>
      <Box sx={{ textAlign: 'center', border: 1, m: 1 }}>
        <Typography variant='h6'>Ingreso Por Sede</Typography>
      </Box>
      <Paper sx={{ display: 'flex', p: 1, m: 1 }}>
        <Box sx={{ width: '50%', height: '50%' }}>
          <BarChartBasic datos={datos} etiquetas={etiquetas} label="Por sede" />
        </Box>
        <Box sx={{ ml: 4, mt: 4 }}>
          {sedes.map(s => (
            <Typography key={s} component='p'>
              {s}: {totales[s]}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default IngresoPorSede;
