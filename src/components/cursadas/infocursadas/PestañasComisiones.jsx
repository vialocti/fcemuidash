import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import TablaDatosComision from './TablaDatosComision';
import TablaResumenComision from './TablaResumenComision';
import TablaResumenGeneral from './TablaResumenGeneral';

const PestanasComisiones = ({ comisiones }) => {
  const [indice, setIndice] = useState(0);

  const handleChange = (event, newValue) => {
    setIndice(newValue);
  };
  
  // Filtrar solo comisiones que tienen alumnos
  const comisionesConAlumnos = comisiones.filter(c => c.alumnos && c.alumnos.length > 0);

  if (!Array.isArray(comisionesConAlumnos) || comisionesConAlumnos.length === 0) {
    return <Typography variant='h4'>No hay comisiones con alumnos disponibles.</Typography>;
  }

  return (
    <Box>
      {/* Resumen General */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Resumen General de la Actividad
      </Typography>
      <TablaResumenGeneral comisiones={comisionesConAlumnos} />
      <Typography variant='h6' sx={{ mt: 2, mb: 1 }}>Informacion por Comision de Cursado</Typography>
      {/* Pestañas por Comisión */}
      <Paper sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={indice}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {comisionesConAlumnos.map((com, i) => (
            <Tab key= {com.comision} label={com.nombre} />
          ))}
        </Tabs>
      </Paper>

      {/* Contenido por Comisión */}
     
      {comisionesConAlumnos[indice] ?
      <Box>
          
        <Typography variant="h6" sx={{ mb: 1 }}>
          Resumen Comisión: {comisionesConAlumnos[indice].nombre}
        </Typography>
        <TablaResumenComision comision={comisionesConAlumnos[indice]} />
        
        <TablaDatosComision datos={comisionesConAlumnos[indice].alumnos} comisionN={comisionesConAlumnos[indice].nombre}/>
      
      </Box>
      :null}
    </Box>
  );
};

export default PestanasComisiones;
