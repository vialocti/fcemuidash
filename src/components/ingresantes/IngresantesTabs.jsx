import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Container } from '@mui/material';
import TablaDetallada from './tabsIngresantes/Tabladetallada';
import TablaDinamica from './tabsIngresantes/TablaDinamica';
import IngresoPorGenero from './tabsIngresantes/IngresoPorGenero';
import IngresoPorCarrera from './tabsIngresantes/IngresoPorCarrera';
import IngresoPorSede from './tabsIngresantes/IngresoPorSede';


const sedes = ['MZA', 'SRF', 'GALV', 'ESTE'];
const carreras = ['CP', 'LA', 'LE', 'LLO', 'LNRG'];

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const IngresantesTabs = ({ cantidadSede }) => {
  const [value, setValue] = useState(0);
  const [tabla, setTabla] = useState({});
  const [totalCarrera, setTotalCarrera] = useState({});
  const [totalSede, setTotalSede] = useState({});
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    const tabla = {};
    const totalCarrera = {};
    const totalSede = {};

    cantidadSede.forEach(({ sede, carrera, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (!tabla[sede]) tabla[sede] = {};
      if (!tabla[sede][carrera]) tabla[sede][carrera] = 0;
      tabla[sede][carrera] += cantidad;

      if (!totalCarrera[carrera]) totalCarrera[carrera] = 0;
      totalCarrera[carrera] += cantidad;

      if (!totalSede[sede]) totalSede[sede] = 0;
      totalSede[sede] += cantidad;
    });

    setTabla(tabla);
    setTotalCarrera(totalCarrera);
    setTotalSede(totalSede);
    setTotalGeneral(Object.values(totalCarrera).reduce((a, b) => a + b, 0));
  }, [cantidadSede]);

  const handleChange = (event, newValue) => setValue(newValue);

  if (!cantidadSede || cantidadSede.length === 0) {
    return (
      <Typography variant="h6" sx={{ m: 2 }}>
        No hay datos disponibles.
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Pestañas de ingresantes"
      >
        <Tab label="Tabla Dato Detallados" />
        <Tab label="Tabla Sede - Propuesta" />
        <Tab label="Grafica Por Genero" />
        <Tab label="Grafica Por Propuesta" />
        <Tab label="Grafica Por Sede" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <TablaDetallada cantidadSede={cantidadSede} totalGeneral={totalGeneral} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TablaDinamica
          sedes={sedes}
          carreras={carreras}
          tabla={tabla}
          totalCarrera={totalCarrera}
          totalSede={totalSede}
          totalGeneral={totalGeneral}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
      <IngresoPorGenero cantidadSede={cantidadSede} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <IngresoPorCarrera cantidadSede={cantidadSede} />
      </TabPanel>
      <TabPanel value={value} index={4}>  
      
        <IngresoPorSede cantidadSede={cantidadSede} />
      </TabPanel>
    </Container>
  );
};

export default IngresantesTabs;
