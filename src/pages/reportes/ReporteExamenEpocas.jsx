import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { traeResultadosMesasPeriodo, traerEpocasExamen, traerResultadoTurno } from "../../services/servicesExamenes";

import ExamenesAnalysis from "../../components/examenes/ExamenesAnalisys";

// Componente auxiliar para el panel de las pestañas (Tabs)
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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ReporteExamenEpocas = () => {
  const ubicaciones = [
    { value: '1', label: 'MZA' },
    { value: '2', label: 'SR' },
    { value: '3', label: 'GA' },
    { value: '4', label: 'ESTE' },
    { value: '5', label: 'FCE' }
  ];

  const periodosMap = {
    'I': 'Junio-Agosto',
    'M': 'Noviembre-Diciembre',
    'F': 'Febrero-Marzo',
    'L': 'Año Lectivo (Total)',
  };

  const currentYear = new Date().getFullYear();
  const [yearInicio, setYearInicio] = useState("");
  const [yearFinal, setYearFinal] = useState("");
  const [periodo, setPeriodo] = useState("I"); // Inicia con un valor por defecto
  const [ubicacion, setUbicacion] = useState('1'); // Ubicación por defecto
  const [datosComparativa, setDatosComparativa] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Función refactorizada para obtener datos de un año y período específicos
  const fetchDataForPeriodAndYear = async (year, periodToFetch, selectedUbicacion) => {
    try {
      const epocas = await traerEpocasExamen(year);
      const turnoData = epocas.find(element => element.epoca === periodToFetch);
      
      if (!turnoData) {
        // No es un error fatal, puede que ese año no tuviera ese turno.
        console.warn(`No se encontraron datos para el período ${periodosMap[periodToFetch]} en el año ${year}`);
        return { year, stats: { A: 0, R: 0, U: 0 } }; // Devolver ceros para no romper el cálculo
      }

      const responseMesas = await traeResultadosMesasPeriodo(year, turnoData.periodos, selectedUbicacion || 1);
      if (responseMesas.length === 0) {
        return { year, stats: { A: 0, R: 0, U: 0 } };
      }

      const llamadoMesasString = responseMesas.map(mesa => mesa.llamado_mesa).join(',');
      const resultados = await traerResultadoTurno(llamadoMesasString);
      const resultadosMap = { A: 0, R: 0, U: 0 };
      resultados.forEach(item => {
        resultadosMap[item.resultado] = parseInt(item.total, 10) || 0;
      });
      return { year, stats: resultadosMap };
    } catch (error) {
      console.error(`Error al obtener datos para ${year} período ${periodToFetch}`, error);
      // Devolver un objeto con error para poder manejarlo si es necesario
      return { year, stats: null, error: error.message };
    }
  };

  const handleGenerarReporte = async () => {
    setError("");
    setDatosComparativa(null);

    if (!yearInicio || !yearFinal) {
      setError("Seleccione ambos años: inicio y final.");
      return;
    }
    const inicio = parseInt(yearInicio, 10);
    const final = parseInt(yearFinal, 10);
    if (inicio >= final) {
      setError("El año de inicio debe ser menor que el año final.");
      return;
    }
    const numYears = final - inicio + 1;
    if (numYears < 2 || numYears > 5) {
      setError("La comparación debe incluir entre 2 y 5 años.");
      return;
    }

    setLoading(true);
    const years = Array.from({ length: final - inicio + 1 }, (_, i) => inicio + i);

    if (periodo === 'L') {
      const periodsToFetch = ['I', 'M', 'F'];
      const allData = {};

      for (const p of periodsToFetch) {
        const promises = years.map(y => fetchDataForPeriodAndYear(y, p, ubicacion));
        allData[p] = (await Promise.all(promises)).filter(d => d.stats);
      }

      // Calcular el total para "Año Lectivo"
      allData.L = years.map(year => {
        const totalStats = { A: 0, R: 0, U: 0 };
        for (const p of periodsToFetch) {
          const yearData = allData[p].find(d => d.year === year);
          if (yearData) {
            totalStats.A += yearData.stats.A;
            totalStats.R += yearData.stats.R;
            totalStats.U += yearData.stats.U;
          }
        }
        return { year, stats: totalStats };
      });

      setDatosComparativa(allData);

    } else {
      // Lógica para un solo período
      const promises = years.map(y => fetchDataForPeriodAndYear(y, periodo, ubicacion));
      const datos = (await Promise.all(promises)).filter(d => d.stats);
      setDatosComparativa(datos);
    }
    
    setLoading(false);
  };

  const renderContent = () => {
    if (loading) {
      return <Typography style={{ padding: 20 }}>Generando reporte...</Typography>;
    }
    if (!datosComparativa) {
       return (
          <Box p={3}>
            <Typography variant="h5">El Año inicial debe ser menor que el Año final.</Typography>
            <Typography variant="h6" color="textSecondary">Se pueden comparar de 2 a 5 años.</Typography>
            <Typography variant="h6" color="textSecondary">Seleccione 'Año Lectivo' para ver la comparativa por períodos en pestañas.</Typography>
          </Box>
       );
    }

    if (periodo === 'L' && datosComparativa.L) {
      const tabKeys = ['I', 'M', 'F', 'L'];
      return (
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="periodos tabs">
              {tabKeys.map(key => <Tab label={periodosMap[key]} key={key} />)}
            </Tabs>
          </Box>
          {tabKeys.map((key, index) => (
             <TabPanel value={activeTab} index={index} key={key}>
                <ExamenesAnalysis datosComparativa={datosComparativa[key]} periodo={key} />
            </TabPanel>
          ))}
        </Box>
      );
    }
    
    // Si no es 'L', o si algo falló y la data no es un objeto
    if (Array.isArray(datosComparativa)) {
        return <ExamenesAnalysis datosComparativa={datosComparativa} periodo={periodo} />;
    }

    return null; // No debería llegar aquí
  }


  return (
    <Grid container spacing={2 }style={{marginTop:10, paddingInline:4}} alignItems="center" >
    
      <Grid item xs={12}>
        <Typography variant="h4" style={{padding:12}}>Reporte Comparativo de Resultados de Exámenes</Typography>
      </Grid>
  
      <Grid item xs={12} md={1}>
        <FormControl fullWidth>
          <InputLabel>Año Inicio</InputLabel>
          <Select value={yearInicio} onChange={(e) => setYearInicio(e.target.value)}>
            {[...Array(10)].map((_, i) => {
              const yearOption = currentYear - i;
              return <MenuItem key={i} value={yearOption}>{yearOption}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <FormControl fullWidth>
          <InputLabel>Año Final</InputLabel>
          <Select value={yearFinal} onChange={(e) => setYearFinal(e.target.value)}>
            {[...Array(10)].map((_, i) => {
              const yearOption = currentYear - i;
              return <MenuItem key={i} value={yearOption}>{yearOption}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1}>
        <FormControl fullWidth>
          <InputLabel id="ubicacion-label">Ubicación</InputLabel>
          <Select
            labelId="ubicacion-label"
            value={ubicacion}
            label="Ubicación"
            onChange={(e) => setUbicacion(e.target.value)}
          >
            {ubicaciones.map((ubi, index) => (
              <MenuItem key={index} value={ubi.value}>{ubi.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Período</InputLabel>
          <Select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            <MenuItem value="I">Junio-Agosto</MenuItem>
            <MenuItem value="M">Noviembre-Diciembre</MenuItem>
            <MenuItem value="F">Febrero-Marzo</MenuItem>
            <MenuItem value="L">Año Lectivo (Todos)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleGenerarReporte} disabled={loading}>
          {loading ? 'Cargando...' : 'Generar Reporte'}
        </Button>
      </Grid>
       <Grid item xs={12} md={5}></Grid>
      <Grid item xs={12}>
        {error && <Typography color="error" style={{padding:12}}>{error}</Typography>}
      </Grid>

      <Grid item xs={12}>
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default ReporteExamenEpocas;