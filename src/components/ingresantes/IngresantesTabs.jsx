import { Box, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import IngresoPorCarrera from './tabsIngresantes/IngresoPorCarrera';
import IngresoPorGenero from './tabsIngresantes/IngresoPorGenero';
import IngresoPorSede from './tabsIngresantes/IngresoPorSede';
//import TablaDetallada from './tabsIngresantes/Tabladetallada';
import TablaDinamica from './tabsIngresantes/TablaDinamica';


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
  const [tablaI, setTablaI] = useState({});
  const [totalCarreraI, setTotalCarreraI] = useState({});
  const [totalSedeI, setTotalSedeI] = useState({});
  const [totalGeneralI, setTotalGeneralI] = useState(0);
 const [tablaC, setTablaC] = useState({});
 const [totalCarreraC, setTotalCarreraC] = useState({});
 const [totalSedeC, setTotalSedeC] = useState({});
 const [totalGeneralC, setTotalGeneralC] = useState(0);

  useEffect(() => {
    const tablaI = {};
    const totalCarreraI = {};
    const totalSedeI = {};
    const cantidadSedeI = cantidadSede.filter(item => item.tipo_ingreso !== 6);

    const tablaC = {};
    const totalCarreraC = {};
    const totalSedeC = {};
    const cantidadSedeC = cantidadSede.filter(item => item.tipo_ingreso === 6);
    
    cantidadSedeI.forEach(({ sede, carrera, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (!tablaI[sede]) tablaI[sede] = {};
      if (!tablaI[sede][carrera]) tablaI[sede][carrera] = 0;
      tablaI[sede][carrera] += cantidad;

      if (!totalCarreraI[carrera]) totalCarreraI[carrera] = 0;
      totalCarreraI[carrera] += cantidad;

      if (!totalSedeI[sede]) totalSedeI[sede] = 0;
      totalSedeI[sede] += cantidad;
    });


    setTablaI(tablaI);
    setTotalCarreraI(totalCarreraI);
    setTotalSedeI(totalSedeI);
    setTotalGeneralI(Object.values(totalCarreraI).reduce((a, b) => a + b, 0));

    cantidadSedeC.forEach(({ sede, carrera, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (!tablaC[sede]) tablaC[sede] = {};
      if (!tablaC[sede][carrera]) tablaC[sede][carrera] = 0;
      tablaC[sede][carrera] += cantidad;

      if (!totalCarreraC[carrera]) totalCarreraC[carrera] = 0;
      totalCarreraC[carrera] += cantidad;

      if (!totalSedeC[sede]) totalSedeC[sede] = 0;
      totalSedeC[sede] += cantidad;
    });


    setTablaC(tablaC);
    setTotalCarreraC(totalCarreraC);
    setTotalSedeC(totalSedeC);
    setTotalGeneralC(Object.values(totalCarreraC).reduce((a, b) => a + b, 0));
   
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
       {/* Título */}
      

      {/* Totales globales */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

                            <Typography variant='h5' textAlign={'center'} >
                            Ingresantes  </Typography>
              </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Total Ingreso Facultad 1ra Vez:</strong> {totalGeneralI}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Total Ingreso Cambio de Carrera:</strong> {totalGeneralC}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Pestañas de ingresantes"
      >
       
        <Tab label="Ingreso Facultad" />
        <Tab label="Cambio Carrera" />
        <Tab label="Grafica Por Genero" />
        <Tab label="Grafica Por Propuesta" />
        <Tab label="Grafica Por Sede" />

      </Tabs>

      <TabPanel value={value} index={0}>
    {/* Tabla detallada de ingresantes por sede y carrera 
        <TablaDetallada cantidadSede={cantidadSede} totalGeneralI={totalGeneralI} />
      */}
      <TablaDinamica
          sedes={sedes}
          carreras={carreras}
          tabla={tablaI}
          totalCarrera={totalCarreraI}
          totalSede={totalSedeI}
          totalGeneral={totalGeneralI}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TablaDinamica
          sedes={sedes}
          carreras={carreras}
          tabla={tablaC}
          totalCarrera={totalCarreraC}
          totalSede={totalSedeC}
          totalGeneral={totalGeneralC}
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
