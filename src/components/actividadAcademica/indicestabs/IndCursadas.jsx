import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TabPanel, a11yProps } from './TabPanel'; // Componente auxiliar para las pestañas

//import PromediosGenerales from './PromediosGenerales';
import PromediosPorCarrera from './PromediosPorCarrera';
import PromediosPorPeriodo from './PromediosPorPeriodo';
import PromediosPorSede from './PromediosPorSede';
import { calcularResumen } from '../../../utils/helpers/calculopromedioindices';
import { traerDatosindicesCursada } from '../../../services/servicesAcademica';
import { calcularaniolectivo } from '../../../utils/helpers/calcularanio';

// Componente principal del dashboard
const IndCursadas = () => {
  const [data, setData] = useState([]);
  const [anio, setAnio] = useState(2025)
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [resumenGral, setResumenGral]=useState([])

  // Simulación de una llamada a API
  
  useEffect(() => {
    const anioActual = calcularaniolectivo();
    setAnio(anioActual);
  }, []);
  
  useEffect(() => {
    // Reemplaza esto con tu llamada real a fetch o axios
    const getDatosIndice=async ()=>{
        const result = await traerDatosindicesCursada(anio)
        setData(result)
       setResumenGral(calcularResumen(result));
        
    }
 
    setTimeout(() => {
       getDatosIndice()
      setLoading(false);
    }, 1000);
  }, [anio]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
//console.log(resumenGral)
  return (
    <Grid container spacing={2} >
    {/* Primera fila: Título (sin cambios) */}
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant='h4'>Datos Indices de Cursada</Typography>
      </Paper>
    </Grid>

     {/* Segunda fila: Totales (sin cambios) */}
     <Grid container spacing={2} sx={{mt:2, ml: 1}}>
  {[
    { label: "Total Inscriptos", value: resumenGral.total_inscriptos },
    { label: "Regulares", value: resumenGral.regular },
    { label: "Libres", value: resumenGral.reprobados },
    { label: "Ausentes", value: resumenGral.ausentes },
    { label: "Promocionados", value: resumenGral.promocionados },
  ].map((item) => (
    <Grid item xs={12} md key={item.label}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>{item.label}</Typography>
        <Typography variant="h6">{item.value}</Typography>
      </Paper>
    </Grid>
  ))}
</Grid>

       {/* Segunda fila: Totales (sin cambios) */}
       <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Indice Cursada</Typography><Typography variant='h6'>{resumenGral.indice_cursada}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Indice Ciclo Corto</Typography><Typography variant='h6'>{resumenGral.indice_e1}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Inndice Ciclo Largo</Typography><Typography variant='h6'>{resumenGral.indice_e2}</Typography>
        </Paper>
      </Grid>
    
    <Grid item xs={12}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
         
          <Tab label="Por Carrera" {...a11yProps(1)} />
          <Tab label="Por Sede" {...a11yProps(2)} />
          <Tab label="Por Período" {...a11yProps(3)} />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <PromediosPorCarrera data={data} indcur={resumenGral.indice_cursada} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PromediosPorSede data={data} indcur={resumenGral.indice_cursada} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <PromediosPorPeriodo data={data} indcur={resumenGral.indice_cursada} />
      </TabPanel>
      </Grid>
    </Grid>
  );
};

export default IndCursadas;