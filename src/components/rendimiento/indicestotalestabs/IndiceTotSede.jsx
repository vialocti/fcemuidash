import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TablaAnio from './TablaAnio';
import TablaSede from './TablaSede';
import Tabs from '@mui/material/Tabs';

const IndiceTotSede = ({ datosApi }) => {
  const [tabValue, setTabValue] = useState(0); 
  const [datosPorSede, setDatosPorSede] = useState({});
  const [datosPorAnio, setDatosPorAnio] = useState({});
  const [tabOrder, setTabOrder] = useState([]);
  const sedesNombres = {
    1: 'Mendoza',
    2: 'San Rafael',
    3: 'Gral. Alvear',
    4: 'San Martin',
  };

  useEffect(() => {
    if (!datosApi || datosApi.length === 0) return;

    const porSede = {};
    const porAnio = {};
    const sedesUnicas = new Set();
    const aniosUnicos = new Set();
    
    datosApi.forEach(item => {
      sedesUnicas.add(item.sede);
      aniosUnicos.add(item.anio_academico);

      if (!porSede[item.sede]) {
        porSede[item.sede] = [];
      }
      porSede[item.sede].push(item);

      if (!porAnio[item.anio_academico]) {
        porAnio[item.anio_academico] = [];
      }
      porAnio[item.anio_academico].push(item);
    });
   
    setDatosPorSede(porSede);
    setDatosPorAnio(porAnio);
    
    // Crear un orden de pestañas para mapear el índice del Tab
    // Las sedes son números, los años son cadenas, esto nos permite diferenciarlos
    const order = [...Array.from(sedesUnicas).sort(), ...Array.from(aniosUnicos).sort()];
    setTabOrder(order);
    //console.log(order)
    // Establecer la primera pestaña por defecto
    if (order.length > 0) {
      setTabValue(0);
    }
  }, [datosApi]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  if (tabOrder.length === 0) {
    return <div>Cargando datos...</div>;
  }
  
  const activeTabKey = tabOrder[tabValue];
  const isSedeTab = activeTabKey !== undefined && activeTabKey < 2000;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="academic data tabs" variant="scrollable" scrollButtons="auto">
          {tabOrder.map((key, index) => {
           if (key > 2000) { // Pestañas de Año
            return <Tab label={`Año ${key}`} key={`tab-anio-${key}`} />;
          } else { // Pestañas de Sede
            return <Tab label={`Sede ${sedesNombres[key]}`} key={`tab-sede-${key}`} />;
          }
          })}
        </Tabs>
      </Box>
      {/* Renderizado condicional del contenido de la tabla */}
      {isSedeTab ? (
        <TablaSede datos={datosPorSede[activeTabKey]} />
      ) : (
        <TablaAnio datos={datosPorAnio[activeTabKey]} sedesNombres={sedesNombres} />
      )}
    </Box>
  );
};

export default IndiceTotSede;