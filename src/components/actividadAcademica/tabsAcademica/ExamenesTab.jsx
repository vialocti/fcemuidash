import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { traeResultadosMesasPeriodo, traerPeriodosExamen } from '../../../services/servicesExamenes';

import { calcularaniolectivo } from '../../../utils/helpers/calcularanio';

// --- (Las funciones auxiliares no cambian) ---
function extraerPeriodosComoString(arrayDeDatos) {
  if (!Array.isArray(arrayDeDatos) || arrayDeDatos.length === 0) {
    return "";
  }
  const periodos = arrayDeDatos.map(objeto => objeto.turno_examen_periodo);
  return periodos.join(',');
}

const calcularSumasPorCriterios = (arr, filtros) => {
  const datosFiltrados = arr.filter(objeto => {
    return Object.keys(filtros).every(criterio => {
      return objeto[criterio] === filtros[criterio];
    });
  });
  const sumas = datosFiltrados.reduce((acumulador, objeto) => {
    acumulador.aprobados += parseInt(objeto.aprobados, 10) || 0;
    acumulador.ausentes += parseInt(objeto.ausentes, 10) || 0;
    acumulador.reprobados += parseInt(objeto.reprobados, 10) || 0;
    return acumulador;
  }, { aprobados: 0, ausentes: 0, reprobados: 0 });
  return sumas;
};

// --- Componente auxiliar para el contenido de las pestañas (Tabs) ---
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`examenes-tabpanel-${index}`}
      aria-labelledby={`examenes-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ExamenesTab = () => {
  // --- (Toda la sección de useState y useEffect para la data no cambia) ---
  const [periodosturno, setPeriodosturno] = useState('');
  const [examenesresultados, setExamenesresultados] = useState([]);
  const [anioselected, setAnioselected] = useState(calcularaniolectivo());
  const [totmesas, setTotmesas] = useState(0);
  const [totalexamenes, setTotalexamenes] = useState(0);
  const [totalaprobados, setTotalaprobados] = useState(0);
  const [totaldesaprobados, setTotaldesaprobados] = useState(0);
  const [totalausentes, setTotalausentes] = useState(0);
  const [aprobadosMza, setAprobadosMza] = useState(0);
  const [desaprobadosMza, setDesaprobadosMza] = useState(0);
  const [ausentesMza, setAusentesMza] = useState(0);
  const [aprobadosSR, setAprobadosSR] = useState(0);
  const [desaprobadosSR, setDesaprobadosSR] = useState(0);
  const [ausentesSR, setAusentesSR] = useState(0);
  const [aprobadosEste, setAprobadosEste] = useState(0);
  const [desaprobadosEste, setDesaprobadosEste] = useState(0);
  const [ausentesEste, setAusentesEste] = useState(0);
  const [aprobadosGA, setAprobadosGA] = useState(0);
  const [desaprobadosGA, setDesaprobadosGA] = useState(0);
  const [ausentesGA, setAusentesGA] = useState(0);
  const [aprobadosCPN, setAprobadosCPN] = useState(0);
  const [desaprobadosCPN, setDesaprobadosCPN] = useState(0);
  const [ausentesCPN, setAusentesCPN] = useState(0);
  const [aprobadosCP, setAprobadosCP] = useState(0);
  const [desaprobadosCP, setDesaprobadosCP] = useState(0);
  const [ausentesCP, setAusentesCP] = useState(0);
  const [aprobadosLA, setAprobadosLA] = useState(0);
  const [desaprobadosLA, setDesaprobadosLA] = useState(0);
  const [ausentesLA, setAusentesLA] = useState(0);
  const [aprobadosLE, setAprobadosLE] = useState(0);
  const [desaprobadosLE, setDesaprobadosLE] = useState(0);
  const [ausentesLE, setAusentesLE] = useState(0);
  const [aprobadosLLO, setAprobadosLLO] = useState(0);
  const [desaprobadosLLO, setDesaprobadosLLO] = useState(0);
  const [ausentesLLO, setAusentesLLO] = useState(0);
  const [aprobadosLNRG, setAprobadosLNRG] = useState(0);
  const [desaprobadosLNRG, setDesaprobadosLNRG] = useState(0);
  const [ausentesLNRG, setAusentesLNRG] = useState(0);
  
  // --- NUEVO ESTADO para controlar la pestaña activa ---
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const determinarColorDeFondo = (car) => {
    let relacion = 0;
    car = car || '';
    const totalPresentesGeneral = totalaprobados + totaldesaprobados;
    if (totalPresentesGeneral === 0) return 'grey.300'; // Evitar división por cero

    const relacionGeneral = totalaprobados / totalPresentesGeneral;

    if (car === 'CP') relacion = aprobadosCP / (aprobadosCP + desaprobadosCP);
    if (car === 'CPN') relacion = aprobadosCPN / (aprobadosCPN + desaprobadosCPN);
    if (car === 'LA') relacion = aprobadosLA / (aprobadosLA + desaprobadosLA);
    if (car === 'LE') relacion = aprobadosLE / (aprobadosLE + desaprobadosLE);
    if (car === 'LLO') relacion = aprobadosLLO / (aprobadosLLO + desaprobadosLLO);
    if (car === 'LNRG') relacion = aprobadosLNRG / (aprobadosLNRG + desaprobadosLNRG);

    if (isNaN(relacion)) return 'grey.300'; // Color por defecto si hay división por cero

    if (relacion >= relacionGeneral) return 'success.light';
    if (relacion < relacionGeneral) return 'warning.light';
    return 'error.light';
  };

  const determinarColorFondoSede=(sede)=>{
      let relacion=0
      sede = sede || '';
      const totalPresentesGeneral = totalaprobados + totaldesaprobados;
      if (totalPresentesGeneral === 0) return 'grey.300'; // Evitar división por cero
  
      const relacionGeneral = totalaprobados / totalPresentesGeneral;
      if(sede==='MZA') relacion = aprobadosMza / (aprobadosMza + desaprobadosMza);
      if(sede==='SR') relacion = aprobadosSR / (aprobadosSR + desaprobadosSR);
      if(sede==='GA') relacion = aprobadosGA / (aprobadosGA + desaprobadosGA);
      if(sede==='SM') relacion = aprobadosEste / (aprobadosEste + desaprobadosEste);

      if (isNaN(relacion)) return 'grey.300'; // Color por defecto si hay división por cero

      if (relacion >= relacionGeneral) return 'success.light';
      if (relacion < relacionGeneral) return 'warning.light';
      return 'error.light';


  }

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await traerPeriodosExamen(anioselected);
        const periodosString = extraerPeriodosComoString(response);
        setPeriodosturno(periodosString);
      } catch (error) {
        console.error('Error al obtener turnos:', error);
      }
    };
    if (anioselected) {
      fetchTurnos();
    }
  }, [anioselected]);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await traeResultadosMesasPeriodo(anioselected, periodosturno, 5);
        setTotmesas(response.length);
        setExamenesresultados(response);
      } catch (error) {
        console.error('Error al obtener resultados de mesas:', error);
      }
    };
    if (anioselected && periodosturno) {
      fetchResultados();
    }
  }, [anioselected, periodosturno]);

  useEffect(() => {
    if (examenesresultados.length === 0) return;

    const totalGeneral = calcularSumasPorCriterios(examenesresultados, {});
    setTotalexamenes(totalGeneral.aprobados + totalGeneral.reprobados + totalGeneral.ausentes);
    setTotalaprobados(totalGeneral.aprobados);
    setTotaldesaprobados(totalGeneral.reprobados);
    setTotalausentes(totalGeneral.ausentes);

    // Sumas por sede
    const totalUbicacion1 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 1 });
    setAprobadosMza(totalUbicacion1.aprobados); setDesaprobadosMza(totalUbicacion1.reprobados); setAusentesMza(totalUbicacion1.ausentes);
    const totalUbicacion2 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 2 });
    setAprobadosSR(totalUbicacion2.aprobados); setDesaprobadosSR(totalUbicacion2.reprobados); setAusentesSR(totalUbicacion2.ausentes);
    const totalUbicacion3 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 3 });
    setAprobadosGA(totalUbicacion3.aprobados); setDesaprobadosGA(totalUbicacion3.reprobados); setAusentesGA(totalUbicacion3.ausentes);
    const totalUbicacion4 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 4 });
    setAprobadosEste(totalUbicacion4.aprobados); setDesaprobadosEste(totalUbicacion4.reprobados); setAusentesEste(totalUbicacion4.ausentes);

    //suma por propuestas
    const totalCPN = calcularSumasPorCriterios(examenesresultados, { propuesta: "CPN" });
    setAprobadosCPN(totalCPN.aprobados); setDesaprobadosCPN(totalCPN.reprobados); setAusentesCPN(totalCPN.ausentes);
    const totalCP = calcularSumasPorCriterios(examenesresultados, { propuesta: "CP" });
    setAprobadosCP(totalCP.aprobados); setDesaprobadosCP(totalCP.reprobados); setAusentesCP(totalCP.ausentes);
    const totalLA = calcularSumasPorCriterios(examenesresultados, { propuesta: "LA" });
    setAprobadosLA(totalLA.aprobados); setDesaprobadosLA(totalLA.reprobados); setAusentesLA(totalLA.ausentes);
    const totalLE = calcularSumasPorCriterios(examenesresultados, { propuesta: "LE" });
    setAprobadosLE(totalLE.aprobados); setDesaprobadosLE(totalLE.reprobados); setAusentesLE(totalLE.ausentes);
    const totalLLO = calcularSumasPorCriterios(examenesresultados, { propuesta: "LLO" });
    setAprobadosLLO(totalLLO.aprobados); setDesaprobadosLLO(totalLLO.reprobados); setAusentesLLO(totalLLO.ausentes);
    const totalLNRG = calcularSumasPorCriterios(examenesresultados, { propuesta: "LNRG" });
    setAprobadosLNRG(totalLNRG.aprobados); setDesaprobadosLNRG(totalLNRG.reprobados); setAusentesLNRG(totalLNRG.ausentes);

  }, [examenesresultados]);
  
  // Función para calcular y formatear la relación, evitando división por cero
  const calcularRelacion = (aprobados, desaprobados) => {
    const total = aprobados + desaprobados;
    if (total === 0) {
      return "N/A";
    }
    return (aprobados / total).toFixed(2);
  };

  return (
    <Grid container spacing={2} >
      {/* Primera fila: Título (sin cambios) */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant='h4'>Datos de Examenes Ciclo Lectivo</Typography>
        </Paper>
      </Grid>

      {/* Segunda fila: Totales (sin cambios) */}
      <Grid item xs={12} md={2}><Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}><Typography>Mesas Examenes</Typography><Typography variant='h5'>{totmesas}</Typography></Paper></Grid>
      <Grid item xs={12} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}><Typography>Inscripciones.</Typography><Typography variant='h5'>{totalexamenes}</Typography></Paper></Grid>
      <Grid item xs={12} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}><Typography>Aprobados</Typography><Typography variant='h5'>{totalaprobados}</Typography></Paper></Grid>
      <Grid item xs={12} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}><Typography>Desaprobados</Typography><Typography variant='h5'>{totaldesaprobados}</Typography></Paper></Grid>
      <Grid item xs={12} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}><Typography>Ausentes</Typography><Typography variant='h5'>{totalausentes}</Typography></Paper></Grid>
      <Grid item xs={12} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}><Typography>Rel.Aprobados:</Typography> <Typography variant='h5'>{calcularRelacion(totalaprobados, totaldesaprobados)}</Typography></Paper></Grid>

      {/* TERCERA FILA: NUEVO SISTEMA DE TABS */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="Selector de vista de examenes" centered>
              <Tab label="Detalle por Carrera" />
              <Tab label="Detalle por Sede" />
            </Tabs>
          </Box>

          {/* Contenido de la Pestaña 0: Por Carrera */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              {/* --- Contenido de la ANTIGUA TERCERA FILA --- */}
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('CP') }}><Typography  variant='h6'>Contador Público</Typography><Typography variant='h6'>Aprobados: {aprobadosCP}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosCP}</Typography><Typography variant='h6'>Ausentes: {ausentesCP}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosCP, desaprobadosCP)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LA') }}><Typography  variant='h6'>Lic.Administración</Typography><Typography variant='h6'>Aprobados: {aprobadosLA}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosLA}</Typography><Typography variant='h6'>Ausentes: {ausentesLA}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosLA, desaprobadosLA)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LE') }}><Typography variant='h6'>Lic.Economía</Typography><Typography variant='h6'>Aprobados: {aprobadosLE}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosLE}</Typography><Typography variant='h6'>Ausentes: {ausentesLE}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosLE, desaprobadosLE)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LLO') }}><Typography variant='h6'>Lic.Logistística</Typography><Typography variant='h6'>Aprobados: {aprobadosLLO}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosLLO}</Typography><Typography variant='h6'>Ausentes: {ausentesLLO}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosLLO, desaprobadosLLO)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('CPN') }}><Typography variant='h6'>Cont.Público Nac.</Typography><Typography variant='h6'>Aprobados: {aprobadosCPN}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosCPN}</Typography><Typography variant='h6'>Ausentes: {ausentesCPN}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosCPN, desaprobadosCPN)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={2}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LNRG') }}><Typography variant='h6'>Lic.Neg.RG</Typography><Typography variant='h6'>Aprobados: {aprobadosLNRG}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosLNRG}</Typography><Typography variant='h6'>Ausentes: {ausentesLNRG}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosLNRG, desaprobadosLNRG)}</Typography></Paper></Grid>
            </Grid>
          </TabPanel>

          {/* Contenido de la Pestaña 1: Por Sede */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              {/* --- Contenido de la ANTIGUA CUARTA FILA --- */}
              <Grid item xs={12} sm={6} md={3}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('MZA') }}><Typography variant='h6'>Mendoza</Typography><Typography variant='h6'>Aprobados: {aprobadosMza}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosMza}</Typography><Typography variant='h6'>Ausentes: {ausentesMza}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosMza, desaprobadosMza)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={3}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('SR')  }}><Typography variant='h6'>San Rafael</Typography><Typography variant='h6'>Aprobados: {aprobadosSR}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosSR}</Typography><Typography variant='h6'>Ausentes: {ausentesSR}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosSR, desaprobadosSR)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={3}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('GA')  }}><Typography variant='h6'>Gral.Alvear</Typography><Typography variant='h6'>Aprobados: {aprobadosGA}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosGA}</Typography><Typography variant='h6'>Ausentes: {ausentesGA}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosGA, desaprobadosGA)}</Typography></Paper></Grid>
              <Grid item xs={12} sm={6} md={3}><Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorFondoSede('SM')  }}><Typography variant='h6'>San Martin</Typography><Typography variant='h6'>Aprobados: {aprobadosEste}</Typography><Typography variant='h6'>Desaprobados: {desaprobadosEste}</Typography><Typography variant='h6'>Ausentes: {ausentesEste}</Typography><Typography variant='h6'>Relación AP: {calcularRelacion(aprobadosEste, desaprobadosEste)}</Typography></Paper></Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ExamenesTab;