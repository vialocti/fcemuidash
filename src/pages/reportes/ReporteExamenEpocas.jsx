import React, { useState } from "react";
import { 
  Box, Button, FormControl, Grid, InputLabel, MenuItem, 
  Select, Tab, Tabs, Typography, Card, CardContent, 
  Divider, CircularProgress, Alert, AlertTitle, Stack 
} from "@mui/material";
import { 
  BarChart as ChartIcon, 
  Search as SearchIcon, 
  InfoOutlined as InfoIcon 
} from "@mui/icons-material";

import { traeResultadosMesasPeriodo, traerEpocasExamen, traerResultadoTurno } from "../../services/servicesExamenes";
import ExamenesAnalysis from "../../components/examenes/ExamenesAnalisys";

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const ReporteExamenEpocas = () => {
  const ubicaciones = [
    { value: '1', label: 'Mendoza (MZA)' },
    { value: '2', label: 'San Rafael (SR)' },
    { value: '3', label: 'General Alvear (GA)' },
    { value: '4', label: 'Este' },
    { value: '5', label: 'FCE' }
  ];

  const periodosMap = {
    'I': 'Junio - Agosto',
    'M': 'Noviembre - Diciembre',
    'F': 'Febrero - Marzo',
    'L': 'Ciclo Lectivo Completo',
  };

  const [yearInicio, setYearInicio] = useState("");
  const [yearFinal, setYearFinal] = useState("");
  const [periodo, setPeriodo] = useState("I");
  const [ubicacion, setUbicacion] = useState('1');
  const [datosComparativa, setDatosComparativa] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: 15 }, (_, i) => currentYear - i);

  // Obtener el nombre de la sede seleccionada para el reporte
  const nombreSede = ubicaciones.find(u => u.value === ubicacion)?.label || "";

  const fetchDataForPeriodAndYear = async (year, periodToFetch, selectedUbicacion) => {
    try {
      const epocas = await traerEpocasExamen(year);
      const turnoData = epocas.find(element => element.epoca === periodToFetch);
      
      if (!turnoData) return { year, stats: { A: 0, R: 0, U: 0 } };

      const responseMesas = await traeResultadosMesasPeriodo(year, turnoData.periodos, selectedUbicacion || 1);
      if (responseMesas.length === 0) return { year, stats: { A: 0, R: 0, U: 0 } };

      const llamadoMesasString = responseMesas.map(mesa => mesa.llamado_mesa).join(',');
      const resultados = await traerResultadoTurno(llamadoMesasString);
      const resultadosMap = { A: 0, R: 0, U: 0 };
      resultados.forEach(item => {
        resultadosMap[item.resultado] = parseInt(item.total, 10) || 0;
      });
      return { year, stats: resultadosMap };
    } catch (err) {
      return { year, stats: null, error: err.message };
    }
  };

  const handleGenerarReporte = async () => {
    setError("");
    if (!yearInicio || !yearFinal) return setError("Por favor, selecciona ambos años para comparar.");
    
    const inicio = parseInt(yearInicio);
    const final = parseInt(yearFinal);
    
    if (inicio >= final) return setError("El año de inicio debe ser anterior al año final.");
    if (final - inicio + 1 > 5) return setError("El rango máximo de comparación es de 5 años.");

    setLoading(true);
    const years = Array.from({ length: final - inicio + 1 }, (_, i) => inicio + i);

    try {
      if (periodo === 'L') {
        const periodsToFetch = ['I', 'M', 'F'];
        const allData = {};
        for (const p of periodsToFetch) {
          const promises = years.map(y => fetchDataForPeriodAndYear(y, p, ubicacion));
          allData[p] = (await Promise.all(promises)).filter(d => d.stats);
        }
        allData.L = years.map(year => {
          const totalStats = { A: 0, R: 0, U: 0 };
          periodsToFetch.forEach(p => {
            const yearData = allData[p].find(d => d.year === year);
            if (yearData) {
              totalStats.A += yearData.stats.A;
              totalStats.R += yearData.stats.R;
              totalStats.U += yearData.stats.U;
            }
          });
          return { year, stats: totalStats };
        });
        setDatosComparativa(allData);
        setActiveTab(3); // Seleccionar por defecto la pestaña "Lectivo Completo"
      } else {
        const promises = years.map(y => fetchDataForPeriodAndYear(y, periodo, ubicacion));
        const datos = (await Promise.all(promises)).filter(d => d.stats);
        setDatosComparativa(datos);
      }
    } catch (e) {
      setError("Ocurrió un error al procesar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (loading) return (
      <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
        <CircularProgress size={60} />
        <Typography color="textSecondary">Procesando estadísticas académicas...</Typography>
      </Stack>
    );

    if (!datosComparativa) return (
      <Alert severity="info" variant="outlined" icon={<InfoIcon fontSize="inherit" />} sx={{ mt: 4 }}>
        <AlertTitle>Sin datos para mostrar</AlertTitle>
        Selecciona un rango de años y el período deseado para generar la comparativa visual.
      </Alert>
    );

    // Caso: Ciclo Lectivo Completo (Tabs)
    if (periodo === 'L' && datosComparativa.L) {
      const tabKeys = ['I', 'M', 'F', 'L'];
      return (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, val) => setActiveTab(val)} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {tabKeys.map(key => <Tab label={periodosMap[key]} key={key} sx={{ fontWeight: 'bold' }} />)}
          </Tabs>
          {tabKeys.map((key, idx) => (
            <TabPanel value={activeTab} index={idx} key={key}>
              <ExamenesAnalysis 
                datosComparativa={datosComparativa[key]} 
                periodo={key} 
                sedeNombre={nombreSede}
              />
            </TabPanel>
          ))}
        </Box>
      );
    }

    // Caso: Periodo simple
    return (
      <Box sx={{ mt: 4 }}>
        <ExamenesAnalysis 
          datosComparativa={datosComparativa} 
          periodo={periodo} 
          sedeNombre={nombreSede}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
        <ChartIcon color="primary" fontSize="large" />
        Análisis Comparativo de Exámenes
      </Typography>
      
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Año Desde</InputLabel>
                <Select value={yearInicio} label="Año Desde" onChange={(e) => setYearInicio(e.target.value)}>
                  {yearsOptions.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Año Hasta</InputLabel>
                <Select value={yearFinal} label="Año Hasta" onChange={(e) => setYearFinal(e.target.value)}>
                  {yearsOptions.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Ubicación / Sede</InputLabel>
                <Select value={ubicacion} label="Ubicación / Sede" onChange={(e) => setUbicacion(e.target.value)}>
                  {ubicaciones.map(u => <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Período Académico</InputLabel>
                <Select value={periodo} label="Período Académico" onChange={(e) => setPeriodo(e.target.value)}>
                  <MenuItem value="I">Junio - Agosto</MenuItem>
                  <MenuItem value="M">Noviembre - Diciembre</MenuItem>
                  <MenuItem value="F">Febrero - Marzo</MenuItem>
                  <MenuItem value="L">Ciclo Lectivo Completo</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                onClick={handleGenerarReporte} 
                disabled={loading}
                sx={{ height: 40, fontWeight: 'bold' }}
              >
                {loading ? 'Buscando...' : 'Consultar'}
              </Button>
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" variant="caption" sx={{ mt: 2, display: 'block', fontWeight: 500 }}>
              * {error}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Divider />

      {renderResults()}
    </Box>
  );
};

export default ReporteExamenEpocas;