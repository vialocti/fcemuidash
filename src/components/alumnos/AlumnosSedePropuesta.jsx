import React, { useEffect, useState } from 'react';
import {
  Container, Box, Tabs, Tab
} from '@mui/material';
import TablaPorPlan from './alumnosTabs/TablaPorPlan';
import TablaPorSede from './alumnosTabs/TablaPorSede';
import TablaResumenCursada from './alumnosTabs/TablaResumenCursada';
import CoeficientesTable from './alumnosTabs/CoeficientesTable';
import TablaAlumnosResumen from './alumnosTabs/TablaAlumnosResumen';
import MzaTabs from './alumnosTabs/MzaTabs';

const AlumnosSedePropuesta = ({ alumnosSede, alumnoscursada, datoscoeft }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [aniosCursada, setAnioCursada] = useState(null);

  const handleChange = (event, newValue) => setTabIndex(newValue);

  const tratamientoDatos = (datos, sede, propuesta, plan) => {
    const resultado = {
      sede, propuesta, plan,
      anio1: 0, anio2: 0, anio3: 0, anio4: 0, anio5: 0, tot: 0
    };

    datos.forEach(d => {
      const año = d.aniocursada;
      if (año >= 1 && año <= 5) {
        resultado[`anio${año}`] = d.count;
      }
    });

    resultado.tot = parseInt(resultado.anio1) + parseInt(resultado.anio2) + parseInt(resultado.anio3) + parseInt(resultado.anio4) + parseInt(resultado.anio5);
    return resultado;
  };

  const generarResumen = (datosSedes) => {
    const sumatoria = {
      sede: 'TOTAL', propuesta: '', plan: '',
      anio1: 0, anio2: 0, anio3: 0, anio4: 0, anio5: 0, tot: 0
    };

    datosSedes.forEach(item => {
      for (let i = 1; i <= 5; i++) {
        sumatoria[`anio${i}`] += parseInt(item[`anio${i}`]);
      }
      sumatoria.tot += item.tot;
    });

    return [...datosSedes, sumatoria];
  };

  useEffect(() => {
    if (alumnoscursada) {
      const datos = [
        tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='CP' && element.planl==='19'), 'MZA','CP', '19'),
      
         tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='CPN' && element.planl==='98'), 'MZA','CPN', '98'),
        
        tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LA' && element.planl==='19'), 'MZA','LA', '19'),
        
        tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LE' && element.planl==='19'), 'MZA','LE', '19'),
        
          tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LA' && element.planl==='98'), 'MZA','LA', '98'),
          tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LE' && element.planl==='98'), 'MZA','LE', '98'),
     
         tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LLO' && element.planl==='1'), 'MZA','LLO', '1'),
     
          tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===1 && element.carerra==='LLO' && element.planl==='2'), 'MZA','LLO_2', '2'),
        
        
     tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===2 && element.carerra==='CP' && element.planl==='19'), 'SRF','CP', '19'),
     
     tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===2 && element.carerra==='CPN' && element.planl==='98'), 'SRF','CPN', '98'),
     
        
     tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===3 && element.carerra==='LNRG' && element.planl==='1'), 'GAV','LNRG', '1'),
     
        
        tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===4 && element.carerra==='LNRG' && element.planl==='1'), 'EST','LNRG', '1'),
        
        tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===4 && element.carerra==='LLO' && element.planl==='1'), 'EST','LLO', '1'),
        
        tratamientoDatos(alumnoscursada.filter(element=>element.ubicacion===4 && element.carerra==='LLO' && element.planl==='2'), 'EST','LLO_2', '2'),
        
        
      
      ];
      setAnioCursada(generarResumen(datos));
    }
  }, [alumnoscursada]);

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="Tabs de visualización">
          <Tab label="Por Plan" />
          <Tab label="Por Sede" />
          <Tab label="Año de Cursada" />
          <Tab label="Banda Coeficientes" />
          <Tab label="MZA" />
          <Tab label="SRF-CP" />
          <Tab label="SRF-CPN" />
          <Tab label="ESTE-LLO" />
        </Tabs>
      </Box>

      <Box hidden={tabIndex !== 0}>
        <TablaPorPlan alumnosSede={alumnosSede} />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <TablaPorSede alumnosSede={alumnosSede} />
      </Box>
      <Box hidden={tabIndex !== 2}>
        <TablaResumenCursada aniosCursada={aniosCursada} />
      </Box>
      <Box hidden={tabIndex !== 3}>
        <CoeficientesTable rows={datoscoeft} />
      </Box>
      
      <Box hidden={tabIndex !== 4}>
       <MzaTabs />
      </Box>
      
      <Box hidden={tabIndex !== 5}>
        <TablaAlumnosResumen  ubicacionFiltro="SRF" propuestaFiltro="CP" />
      </Box>
      <Box hidden={tabIndex !== 6}>
        <TablaAlumnosResumen  ubicacionFiltro="SRF" propuestaFiltro="CPN" />
      </Box>
      <Box hidden={tabIndex !== 7}>
        <TablaAlumnosResumen  ubicacionFiltro="ESTE" propuestaFiltro="LLO" />
      </Box>
    </Container>
  );
};

export default AlumnosSedePropuesta;
