import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { traerComisionesCursadasAnio, traerInscripcionesCursadasSedepropuesta, traerInscritosCursadaSedepropuesta } from '../../../services/servicesCursadas';

import { calcularaniolectivo } from '../../../utils/helpers/calcularanio';

// --- (La función calcularSumaPorMultiplesCriterios no cambia, la dejamos como está) ---
const calcularSumaPorMultiplesCriterios = (arr, filtros) => {
  if (Object.keys(filtros).length === 0) {
    return arr.reduce((acumulador, objeto) => acumulador + parseInt(objeto.count, 10), 0);
  }
  const datosFiltrados = arr.filter(objeto => {
    return Object.keys(filtros).every(criterio => {
      return objeto[criterio] === filtros[criterio];
    });
  });
  return datosFiltrados.reduce((acumulador, objeto) => acumulador + parseInt(objeto.count, 10), 0);
};


// --- Componente auxiliar para el contenido de las pestañas (Tabs) ---
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}> {/* Añadimos un padding para el contenido */}
          {children}
        </Box>
      )}
    </div>
  );
}


const CursadasTab = () => {
  // --- (Toda la sección de useState y useEffect para la data no cambia) ---
  const [inscripciones, setInscripciones] = useState([])
  const [comisiones, setComisiones] = useState([])
  const [alumnosInsc, setAlumnosInsc] = useState([])
  const [anio, setAnio] = useState(calcularaniolectivo());
  const [cargando, setCargando] = useState(false);
  const [periodo, setPeriodo] = useState(0);
  const [totInscripciones, setTotInscripciones] = useState(0);
  const [totComisiones, setTotComisiones] = useState(0);
  const [totAlumnosInsc, setTotAlumnosInsc] = useState(0);
  const [totContPub, setTotContPub] = useState(0);
  const [totLicAdm, setTotLicAdm] = useState(0);
  const [totLicEcon, setTotLicEcon] = useState(0);
  const [totLicLog, setTotLicLog] = useState(0);
  const [totContPubNac, setTotContPubNac] = useState(0);
  const [totLicNegRG, setTotLicNegRG] = useState(0);  
  const [totMza, setTotMza] = useState(0);
  const [totSR, setTotSR] = useState(0);
  const [totGA, setTotGA] = useState(0);
  const [totSM, setTotSM] = useState(0);
  const [totAlumContPub, setTotAlumContPub] = useState(0);
  const [totAlumLicAdm, setTotAlumLicAdm] = useState(0);
  const [totAlumLicEcon, setTotAlumLicEcon] = useState(0);
  const [totAlumLicLog, setTotAlumLicLog] = useState(0);
  const [totAlumContPubNac, setTotAlumContPubNac] = useState(0);
  const [totAlumLicNegRG, setTotAlumLicNegRG] = useState(0);
  const [totAlumMza, setTotAlumMza] = useState(0);    
  const [totAlumSR, setTotAlumSR] = useState(0);
  const [totAlumGA, setTotAlumGA] = useState(0);
  const [totAlumSM, setTotAlumSM] = useState(0);

  // --- NUEVO ESTADO para controlar la pestaña activa ---
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => { 
    const fetchData = async () => {
      setCargando(true);
      try {
        const insc = await traerInscripcionesCursadasSedepropuesta(anio);
        setInscripciones(insc);
        const comi= await traerComisionesCursadasAnio(periodo);
        setComisiones(comi);
        const alumInsc= await traerInscritosCursadaSedepropuesta(anio);
        setAlumnosInsc(alumInsc);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, [anio, periodo]);

  useEffect(() => {
    if(comisiones.length > 0 ){ setTotComisiones(comisiones.length) }
    if(inscripciones.length > 0 ){
      setTotInscripciones(calcularSumaPorMultiplesCriterios(inscripciones, {}))
      setTotContPub(calcularSumaPorMultiplesCriterios(inscripciones, { propuesta: 8 }))
      setTotLicAdm(calcularSumaPorMultiplesCriterios(inscripciones, { propuesta: 2 }))
      setTotLicEcon(calcularSumaPorMultiplesCriterios(inscripciones, { propuesta: 3 }))
      setTotLicLog(calcularSumaPorMultiplesCriterios(inscripciones, { propuesta: 7 }))
      setTotContPubNac(calcularSumaPorMultiplesCriterios(inscripciones, { propuesta: 1 }))
      setTotLicNegRG(calcularSumaPorMultiplesCriterios(inscripciones, { propuesta: 6 }))
      setTotMza(calcularSumaPorMultiplesCriterios(inscripciones, { ubicacion: 1 }))
      setTotSR(calcularSumaPorMultiplesCriterios(inscripciones, { ubicacion: 2 }))
      setTotGA(calcularSumaPorMultiplesCriterios(inscripciones, { ubicacion: 3 }))
      setTotSM(calcularSumaPorMultiplesCriterios(inscripciones, { ubicacion: 4 }))
      }
    if(alumnosInsc.length > 0 ){  
      setTotAlumnosInsc(calcularSumaPorMultiplesCriterios(alumnosInsc, {}))
      setTotAlumContPub(calcularSumaPorMultiplesCriterios(alumnosInsc, { propuesta: 8 })) 
      setTotAlumLicAdm(calcularSumaPorMultiplesCriterios(alumnosInsc, { propuesta: 2 }))
      setTotAlumLicEcon(calcularSumaPorMultiplesCriterios(alumnosInsc, { propuesta: 3 }))
      setTotAlumLicLog(calcularSumaPorMultiplesCriterios(alumnosInsc, { propuesta: 7 }))
      setTotAlumContPubNac(calcularSumaPorMultiplesCriterios(alumnosInsc, { propuesta: 1 }))
      setTotAlumLicNegRG(calcularSumaPorMultiplesCriterios(alumnosInsc, { propuesta: 6 }))
      setTotAlumMza(calcularSumaPorMultiplesCriterios(alumnosInsc, { ubicacion: 1 }))
      setTotAlumSR(calcularSumaPorMultiplesCriterios(alumnosInsc, { ubicacion: 2 }))
      setTotAlumGA(calcularSumaPorMultiplesCriterios(alumnosInsc, { ubicacion: 3 }))
      setTotAlumSM(calcularSumaPorMultiplesCriterios(alumnosInsc, { ubicacion: 4 }))
      }
  }, [inscripciones, comisiones, alumnosInsc]);
  
  // --- (La función determinarColorDeFondo no cambia) ---
  const determinarColorDeFondo = (car) => {
    let relacion = 0;
    car = car || '';
    if (car === 'CP') relacion = (totContPub / totAlumContPub);
    if (car === 'CPN') relacion = (totContPubNac / totAlumContPubNac);
    if (car === 'LA') relacion = (totLicAdm / totAlumLicAdm);
    if (car === 'LE') relacion = (totLicEcon / totAlumLicEcon);
    if (car === 'LLO') relacion = (totLicLog / totAlumLicLog);
    if (car === 'LNRG') relacion = (totLicNegRG / totAlumLicNegRG);

    if (isNaN(relacion)) return 'grey.300'; // Color por defecto si hay división por cero

    if (relacion >= (totInscripciones / totAlumnosInsc)) return 'success.light';
    if (relacion < (totInscripciones / totAlumnosInsc)) return 'warning.light';
    return 'error.light';
  };

  const determinarColorFondoSede=(sede)=>{
    let relacion=0
    sede = sede || '';
 

    
    if(sede==='MZA') relacion = (totMza + totAlumMza);
    if(sede==='SR') relacion = (totSR + totAlumSR);
    if(sede==='GA') relacion = (totGA + totAlumGA);
    if(sede==='SM') relacion = (totSM + totAlumSM);

    if (isNaN(relacion)) return 'grey.300'; // Color por defecto si hay división por cero
    if (isNaN(relacion)) return 'grey.300'; // Color por defecto si hay división por cero

    if (relacion >= (totInscripciones / totAlumnosInsc)) return 'success.light';
    if (relacion < (totInscripciones / totAlumnosInsc)) return 'warning.light';
   
    return 'error.light';


}

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <Grid container spacing={2} >
      {/* Primera fila: Título (sin cambios) */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant='h4'>Datos de Inscripciones a Cursada</Typography>
        </Paper>
      </Grid>

      {/* Segunda fila: Totales (sin cambios) */}
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Comisiones</Typography><Typography variant='h5'>{totComisiones}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Alumnos Insc.</Typography><Typography variant='h5'>{totAlumnosInsc}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Inscripciones</Typography><Typography variant='h5'>{totInscripciones}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Relacion</Typography><Typography variant='h5'>{(totInscripciones/totAlumnosInsc).toFixed(2)}</Typography>
        </Paper>
      </Grid>

      {/* TERCERA FILA: NUEVO SISTEMA DE TABS */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="Selector de vista" centered>
              <Tab label="Detalle por Carrera" />
              <Tab label="Detalle por Sede" />
            </Tabs>
          </Box>
          
          {/* Contenido de la Pestaña 0: Por Carrera */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              {/* --- Este es el contenido de tu ANTIGUA TERCERA FILA --- */}
              <Grid item xs={12} sm={6} md={2}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('CP') }}>
                  <Typography  variant='h6'>Contador Público</Typography>
                  <Typography variant='h6'>Inscripciones: {totContPub}</Typography>
                  <Typography variant='h6'>Alumnos:{totAlumContPub}</Typography>
                  <Typography variant='h6'>Relacion: {(totContPub / totAlumContPub).toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LA') }}>
                  <Typography  variant='h6'>Lic.Administración</Typography>
                  <Typography variant='h6'>Inscripciones: {totLicAdm}</Typography>
                  <Typography variant='h6'>Alumnos:{totAlumLicAdm}</Typography>
                  <Typography variant='h6'>Relacion: {(totLicAdm / totAlumLicAdm).toFixed(2)}</Typography>
                </Paper>
              </Grid>
              {/* ... (resto de las carreras) ... */}
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LE')  }}><Typography variant='h6'>Lic.Economía</Typography><Typography variant='h6'>Inscripciones: {totLicEcon}</Typography><Typography variant='h6'>Alumnos: {totAlumLicEcon}</Typography><Typography variant='h6'>Relacion: {(totLicEcon / totAlumLicEcon).toFixed(2)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LLO') }}><Typography variant='h6'>Lic.Logistística</Typography><Typography variant='h6'>Inscripciones: {totLicLog}</Typography><Typography variant='h6'>Alumnos: {totAlumLicLog}</Typography><Typography variant='h6'>Relacion: {(totLicLog/ totAlumLicLog).toFixed(2)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('CPN')  }}><Typography variant='h6'>Cont.Público Nacional</Typography><Typography variant='h6'>Inscipciones: {totContPubNac}</Typography><Typography variant='h6'>Alumnos: {totAlumContPubNac}</Typography><Typography variant='h6'>Relacion: {(totContPubNac / totAlumContPubNac).toFixed(2)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LNRG') }}><Typography variant='h6'>Lic.Neg.RG</Typography><Typography variant='h6'>Inscripciones: {totLicNegRG}</Typography><Typography variant='h6'>Alumnos: {totAlumLicNegRG}</Typography><Typography variant='h6'>Relacion: {(totLicNegRG / totAlumLicNegRG).toFixed(2)}</Typography></Paper></Grid>
            </Grid>
          </TabPanel>

          {/* Contenido de la Pestaña 1: Por Sede */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              {/* --- Este es el contenido de tu ANTIGUA CUARTA FILA --- */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('MZA') }}>
                  <Typography  variant='h6'>Mendoza</Typography>
                  <Typography variant='h6'>Inscripciones: {totMza}</Typography>
                  <Typography variant='h6'>Alumnos: {totAlumMza}</Typography>
                  <Typography variant='h6'>Relacion: {(totMza / totAlumMza).toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('SR') }}>
                  <Typography  variant='h6'>San Rafael</Typography>
                  <Typography variant='h6'>Inscripciones: {totSR}</Typography>
                  <Typography variant='h6'>Alumnos: {totAlumSR}</Typography>
                  <Typography variant='h6'>Relacion: {(totSR / totAlumSR).toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('GA') }}>
                  <Typography  variant='h6'>Gral.Alvear</Typography>
                  <Typography variant='h6'>Inscripciones: {totGA}</Typography>
                  <Typography variant='h6'>Alumnos: {totAlumGA}</Typography>
                  <Typography variant='h6'>Relacion: {(totGA / totAlumGA).toFixed(2)}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('SM') }}>
                  <Typography  variant='h6'>San Martin </Typography>
                  <Typography variant='h6'>Inscripciones: {totSM}</Typography>
                  <Typography variant='h6'>Alumnos: {totAlumSM}</Typography>
                  <Typography variant='h6'>Relacion: {(totSM / totAlumSM).toFixed(2)}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  );

};
export default CursadasTab;