// ./alumnosTabs/MzaTabs.js
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TablaAlumnosResumen from './TablaAlumnosResumen';

const MzaTabs = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleChange = (event, newValue) => setTabIndex(newValue);
 

  return (
   <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label="Tabs de visualización">
        
        <Tab label="MZA-CPN" />
        <Tab label="MZA-CP" />
        <Tab label="MZA-LA" />
        <Tab label="MZA-LE" />
        <Tab label="MZA-LLO" />
        
      </Tabs>
    </Box>

    
    <Box hidden={tabIndex !== 0}>
      <TablaAlumnosResumen  ubicacionFiltro="MZA" propuestaFiltro="CPN" />
    </Box>
    <Box hidden={tabIndex !== 1}>
      <TablaAlumnosResumen  ubicacionFiltro="MZA" propuestaFiltro="CP" />
    </Box>
    <Box hidden={tabIndex !== 2}>
      <TablaAlumnosResumen  ubicacionFiltro="MZA" propuestaFiltro="LA" />
    </Box>
    <Box hidden={tabIndex !== 3}>
      <TablaAlumnosResumen  ubicacionFiltro="MZA" propuestaFiltro="LE" />
    </Box>
    <Box hidden={tabIndex !== 4}>
      <TablaAlumnosResumen  ubicacionFiltro="MZA" propuestaFiltro="LLO" />
    </Box>
  </>
  );
};

export default MzaTabs;
