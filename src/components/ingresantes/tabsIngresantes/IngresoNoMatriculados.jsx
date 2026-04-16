import { Box, Paper, Typography } from '@mui/material';
// IngresoPorCarrera.jsx
import React, { useEffect, useState } from 'react';



const IngresoNoMatriculados = ({ alumnosNoMatriculados }) => {
  const [totales, setTotales] = useState({});
  

 // const carrerasArray = ['CP', 'LA', 'LE', 'LNRG', 'LLO'];
  
 

  useEffect(() => {
    const t = {};
  
    setTotales(t);
console.log(alumnosNoMatriculados)
  }, [alumnosNoMatriculados]);

  

  return (
    <Box>
      <Box sx={{ textAlign: 'center', border: 1, m: 1 }}>
        <Typography variant='h6'>Ingreso Por Propuesta</Typography>
      </Box>
      <Paper sx={{ display: 'flex', p: 1, m: 1 }}>
        <Box sx={{ width: '50%', height: '50%' }}>
          
        </Box>
        <Box sx={{ ml: 4, mt: 4 }}>
       
         
        </Box>
      </Paper>
    </Box>
  );
};


export default IngresoNoMatriculados;
