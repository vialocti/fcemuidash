// IngresoPorCarrera.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BarChartBasic from '../../../utils/graphics/BarChartBasic';


const IngresoPorCarrera = ({ cantidadSede }) => {
  const [totales, setTotales] = useState({});
  const [carreras, setCarreras]= useState([])

 // const carrerasArray = ['CP', 'LA', 'LE', 'LNRG', 'LLO'];
  
 useEffect(()=>{
  setCarreras(['CP', 'LA', 'LE', 'LNRG', 'LLO'])
 },[])

  useEffect(() => {
    const t = {};
    carreras.forEach(c => t[c] = 0);

    cantidadSede.forEach(({ carrera, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (t[carrera] !== undefined) {
        t[carrera] += cantidad;
      }
    });
  
    setTotales(t);

  }, [cantidadSede,carreras]);

  const datos = carreras.map(c => totales[c]);
  const etiquetas = carreras;

  return (
    <Box>
      <Box sx={{ textAlign: 'center', border: 1, m: 1 }}>
        <Typography variant='h6'>Ingreso Por Propuesta</Typography>
      </Box>
      <Paper sx={{ display: 'flex', p: 1, m: 1 }}>
        <Box sx={{ width: '50%', height: '50%' }}>
          <BarChartBasic datos={datos} etiquetas={etiquetas} label="Por Propuesta" />
        </Box>
        <Box sx={{ ml: 4, mt: 4 }}>
          {carreras.map(c => (
            <Typography key={c} component='p'>
              {c}: {totales[c]}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default IngresoPorCarrera;
