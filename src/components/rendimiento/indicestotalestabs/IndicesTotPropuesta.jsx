import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TablaAnioP from './TablaAnioP';
import TablaPropuesta from './TablaPropuesta';
import Tabs from '@mui/material/Tabs';

const IndicesTotPropuesta = ({ datosApi }) => {
  const [tabValue, setTabValue] = useState(0); 
  const [datosPorPropuesta, setDatosPorPropuesta] = useState({});
  const [datosPorAnio, setDatosPorAnio] = useState({});
  const [tabOrder, setTabOrder] = useState([]);
  const propuestasNombres = {
    1: 'CPN',
    2: 'LA',
    3: 'LE',
    6: 'LNRG',
    7: 'LLO',
    8: 'CP',
  };

  useEffect(() => {
    if (!datosApi || datosApi.length === 0) return;

    const porPropuesta = {};
    const porAnio = {};
    const propuestasUnicas = new Set();
    const aniosUnicos = new Set();
    
    datosApi.forEach(item => {
      propuestasUnicas.add(item.propuesta);
      aniosUnicos.add(item.anio_academico);

      if (!porPropuesta[item.propuesta]) {
        porPropuesta[item.propuesta] = [];
      }
      porPropuesta[item.propuesta].push(item);

      if (!porAnio[item.anio_academico]) {
        porAnio[item.anio_academico] = [];
      }
      porAnio[item.anio_academico].push(item);
    });

    setDatosPorPropuesta(porPropuesta);
    setDatosPorAnio(porAnio);
    
    // Sort keys numerically for predictable tab order
    const sortedPropuestas = [...Array.from(propuestasUnicas)].sort((a, b) => a - b);
    const sortedAnios = [...Array.from(aniosUnicos)].sort((a, b) => a - b);
    
    const order = [...sortedPropuestas, ...sortedAnios];
    setTabOrder(order);
    
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
  // Check if the key is a year (greater than 2000) or a propuesta
  const isAnioTab = activeTabKey > 2000;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="academic data tabs" variant="scrollable" scrollButtons="auto">
          {tabOrder.map((key, index) => {
            if (key > 2000) { 
              return <Tab label={`Año ${key}`} key={`tab-anio-${key}`} />;
            } else { 
              return <Tab label={`Propuesta ${propuestasNombres[key]}`} key={`tab-propuesta-${key}`} />;
            }
          })}
        </Tabs>
      </Box>
      
      {activeTabKey !== undefined ? (
        isAnioTab ? (
          <TablaAnioP datos={datosPorAnio[activeTabKey]} propuestasNombres={propuestasNombres} />
        ) : (
          <TablaPropuesta datos={datosPorPropuesta[activeTabKey]} />
        )
      ) : null}
    </Box>
  );
};

export default IndicesTotPropuesta;