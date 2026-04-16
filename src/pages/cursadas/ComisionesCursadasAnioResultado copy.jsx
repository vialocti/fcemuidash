import {
  Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, 
  Typography, CircularProgress, Backdrop, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Modal, IconButton, Divider, Alert
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { traerDetalleComisiones, traerEvaluacionActividad, traerMateriasComiAnio } from "../../services/servicesCursadas";

// Componentes internos
import InfoMuestraComisiones from "../../components/cursadas/InfoMuestraComisiones";
import HelpBusquedaResultadoA from "../../components/ayudas/HelpBusquedaResultadoA";

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';

const ComisionesCursadasAnioResultado = () => {
  const [anioI, setAnioI] = useState(2025);
  const [sede, setSede] = useState(1);
  const [materias, setMaterias] = useState([]);
  const [materia, setMateria] = useState("");
  const [recursado, setRecursado] = useState('N');
  
  const [loading, setLoading] = useState(false);
  const [habilitado, setHabilitado] = useState(false);
  const [datoscomianio, setDatoscomianio] = useState([]);
  const [datoscomianioA, setDatoscomianioA] = useState([]);
  const [resumenMateriaAnio, setResumenMateriaAnio] = useState(null);
  const [resumenMateriaAnioA, setResumenMateriaAnioA] = useState(null);
  const [datosEvaluacion, setDatosEvaluacion] = useState(null);
  const [datosEvaluacionA, setDatosEvaluacionA] = useState(null);

  // Estados para alertas de datos faltantes
  const [errorActual, setErrorActual] = useState(false);
  const [avisoAnterior, setAvisoAnterior] = useState(false);

  const [openDetalle, setOpenDetalle] = useState({ open: false, datos: [], anio: null, resumen: null, docentes: null });

  useEffect(() => {
    const cargarMaterias = async () => {
      setLoading(true);
      try {
        const res = await traerMateriasComiAnio(anioI, sede);
        setMaterias(res || []);
        setMateria("");
        setHabilitado(false);
        setErrorActual(false);
        setAvisoAnterior(false);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    if (anioI > 2018) cargarMaterias();
  }, [anioI, sede]);

  const calcularResumenTotal = (detalle) => {
    if (!detalle || !Array.isArray(detalle) || detalle.length === 0) return null;
    const totalInsc = detalle.reduce((acc, v) => acc + parseInt(v.total || 0), 0);
    const reg = detalle.reduce((acc, v) => acc + parseInt(v.regular || 0), 0);
    const pro = detalle.reduce((acc, v) => acc + parseInt(v.promocionado || 0), 0);
    const e1 = detalle.reduce((acc, v) => acc + parseInt(v.examenuno || 0), 0);
    const e2 = detalle.reduce((acc, v) => acc + parseInt(v.examendos || 0), 0);
    const aus = detalle.reduce((acc, v) => acc + parseInt(v.ausente || 0), 0);
    const rep = detalle.reduce((acc, v) => acc + parseInt(v.reprobado || 0), 0);

    return {
      totalInsc, totalRegulares: reg, totalPromocionados: pro,
      totalAprobadosE1: e1, totalAprobadosE2: e2, totalAusentes: aus, totalReprobados: rep,
      porcReg: totalInsc ? ((reg / totalInsc) * 100).toFixed(0) : 0,
      porcPro: totalInsc ? ((pro / totalInsc) * 100).toFixed(0) : 0,
      porcE1: totalInsc ? ((e1 / totalInsc) * 100).toFixed(0) : 0,
      porcE2: totalInsc ? ((e2 / totalInsc) * 100).toFixed(0) : 0,
      indiceT: totalInsc ? (0.7 * (reg / totalInsc) + 0.3 * (pro / totalInsc)).toFixed(2) : "0.00",
      indiceTE1: totalInsc ? (0.7 * (reg / totalInsc) + 0.3 * ((pro + e1) / totalInsc)).toFixed(2) : "0.00",
      indiceTE2: totalInsc ? (0.7 * (reg / totalInsc) + 0.3 * ((pro + e2) / totalInsc)).toFixed(2) : "0.00",
    };
  };

  const onHandleInfo = async () => {
    if (!materia) return;
    setLoading(true);
    setHabilitado(false);
    setErrorActual(false);
    setAvisoAnterior(false);

    try {
      const sedeCod = sede == 1 ? 'M' : sede == 2 ? 'S' : sede == 4 ? 'SM' : 'G';
      const [det, detAnt, evalAct, evalAnt] = await Promise.all([
        traerDetalleComisiones(anioI, materia, sede, recursado, '0'),
        traerDetalleComisiones(anioI - 1, materia, sede, recursado, '0'),
        traerEvaluacionActividad(sedeCod, anioI, materia),
        traerEvaluacionActividad(sedeCod, anioI - 1, materia),
      ]);

      // Control 1: No hay datos en el año actual
      if (!det || det.length === 0) {
        setErrorActual(true);
        setLoading(false);
        return;
      }

      // Control 2: No hay datos en el año anterior
      if (!detAnt || detAnt.length === 0) {
        setAvisoAnterior(true);
      }

      setDatoscomianio(det || []);
      setDatoscomianioA(detAnt || []);
      setDatosEvaluacion(evalAct);
      setDatosEvaluacionA(evalAnt);
      setResumenMateriaAnio(calcularResumenTotal(det));
      setResumenMateriaAnioA(calcularResumenTotal(detAnt));
      setHabilitado(true);
    } catch (error) { 
        console.error(error); 
    } finally { 
        setLoading(false); 
    }
  };

  const RenderVariacion = ({ act, ant }) => {
    const vAct = parseFloat(act) || 0;
    const vAnt = parseFloat(ant) || 0;
    // Si no hay año anterior, no calculamos variación
    if (!vAnt || vAnt === 0) return "-";
    
    const diff = (((vAct - vAnt) / vAnt) * 100).toFixed(1);
    const color = diff > 0 ? 'success.main' : diff < 0 ? 'error.main' : 'text.secondary';
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', color }}>
        {diff > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
        <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 0.5 }}>{diff}%</Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Backdrop sx={{ color: '#fff', zIndex: 1301 }} open={loading}><CircularProgress color="inherit" /></Backdrop>

      {/* FILTROS */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={2}><InputLabel sx={{ fontWeight: 'bold', mb: 1 }}>Año</InputLabel><TextField fullWidth size="small" type="number" value={anioI} onChange={(e) => setAnioI(e.target.value)} /></Grid>
          <Grid item xs={12} md={2}><InputLabel sx={{ fontWeight: 'bold', mb: 1 }}>Sede</InputLabel><Select fullWidth size="small" value={sede} onChange={(e) => setSede(e.target.value)}><MenuItem value={1}>Mendoza</MenuItem><MenuItem value={2}>San Rafael</MenuItem><MenuItem value={4}>Este</MenuItem></Select></Grid>
          <Grid item xs={12} md={6}><InputLabel sx={{ fontWeight: 'bold', mb: 1 }}>Materia</InputLabel><Select fullWidth size="small" value={materia} onChange={(e) => setMateria(e.target.value)} displayEmpty><MenuItem value="" disabled>Seleccione una materia...</MenuItem>{materias.map((m, i) => <MenuItem key={i} value={m.nombre}>{m.nombre}</MenuItem>)}</Select></Grid>
          <Grid item xs={12} md={2}><Button fullWidth variant="contained" startIcon={<SearchIcon />} onClick={onHandleInfo} disabled={!materia || loading}>Analizar</Button></Grid>
        </Grid>
      </Paper>

      {/* ALERTAS DE CONTROL */}
      {errorActual && (
        <Alert severity="error" sx={{ mb: 2 }}>
          No existen datos de cursada para la actividad <strong>{materia}</strong> en el año <strong>{anioI}</strong>.
        </Alert>
      )}

      {avisoAnterior && habilitado && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Atención: No se encontraron registros de la actividad para el ciclo lectivo anterior (<strong>{anioI - 1}</strong>). La comparación interanual no estará disponible.
        </Alert>
      )}

      {habilitado && resumenMateriaAnio && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: '800', color: '#1a237e' }}>Análisis Interanual: {materia}</Typography>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <BarChartIcon sx={{ mr: 1, color: '#1976d2' }} /> Resumen Consolidado de Alumnos
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CICLO</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>INSC.</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>REGULARES</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>LIBRES</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>LIBRES*</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>PROM.</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>APROB. E1</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>APROB. E2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Solo renderizamos el año anterior si existe resumenMateriaAnioA */}
                {resumenMateriaAnioA && (
                  <TableRow sx={{ bgcolor: 'inherit' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{anioI - 1}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>{resumenMateriaAnioA.totalInsc}</TableCell>
                    <TableCell align="center">{resumenMateriaAnioA.totalRegulares} <Typography variant="caption" color="text.secondary">({resumenMateriaAnioA.porcReg}%)</Typography></TableCell>
                    <TableCell align="center">{resumenMateriaAnioA.totalReprobados}</TableCell>
                    <TableCell align="center">{resumenMateriaAnioA.totalAusentes}</TableCell>
                    <TableCell align="center">{resumenMateriaAnioA.totalPromocionados} <Typography variant="caption" color="text.secondary">({resumenMateriaAnioA.porcPro}%)</Typography></TableCell>
                    <TableCell align="center">{resumenMateriaAnioA.totalAprobadosE1} <Typography variant="caption">({resumenMateriaAnioA.porcE1}%)</Typography></TableCell>
                    <TableCell align="center">{resumenMateriaAnioA.totalAprobadosE2} <Typography variant="caption">({resumenMateriaAnioA.porcE2}%)</Typography></TableCell>
                  </TableRow>
                )}
                
                {/* Año Actual */}
                <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{anioI}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>{resumenMateriaAnio.totalInsc}</TableCell>
                    <TableCell align="center">{resumenMateriaAnio.totalRegulares} <Typography variant="caption" color="text.secondary">({resumenMateriaAnio.porcReg}%)</Typography></TableCell>
                    <TableCell align="center">{resumenMateriaAnio.totalReprobados}</TableCell>
                    <TableCell align="center">{resumenMateriaAnio.totalAusentes}</TableCell>
                    <TableCell align="center">{resumenMateriaAnio.totalPromocionados} <Typography variant="caption" color="text.secondary">({resumenMateriaAnio.porcPro}%)</Typography></TableCell>
                    <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 500 }}>{resumenMateriaAnio.totalAprobadosE1} <Typography variant="caption">({resumenMateriaAnio.porcE1}%)</Typography></TableCell>
                    <TableCell align="center" sx={{ color: '#1565c0', fontWeight: 500 }}>{resumenMateriaAnio.totalAprobadosE2} <Typography variant="caption">({resumenMateriaAnio.porcE2}%)</Typography></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>Variación de Desempeño e Índices de Gestión</Typography>
          <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#455a64' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>INDICADOR</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>{anioI - 1}</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>{anioI}</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>VARIACIÓN %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { l: "Índice de Cursada (C)", act: resumenMateriaAnio.indiceT, ant: resumenMateriaAnioA?.indiceT },
                  { l: "Índice Ciclo Corto (CC)", act: resumenMateriaAnio.indiceTE1, ant: resumenMateriaAnioA?.indiceTE1 },
                  { l: "Índice Ciclo Largo (CL)", act: resumenMateriaAnio.indiceTE2, ant: resumenMateriaAnioA?.indiceTE2 },
                  { l: "% Tasa de Promoción", act: resumenMateriaAnio.porcPro, ant: resumenMateriaAnioA?.porcPro },
                ].map((row, i) => (
                  <TableRow key={i} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{row.l}</TableCell>
                    <TableCell align="center">{row.ant || "-"}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{row.act}</TableCell>
                    <TableCell align="center"><RenderVariacion act={row.act} ant={row.ant} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3} justifyContent="center">
            {resumenMateriaAnioA && (
              <Grid item><Button variant="outlined" color="secondary" onClick={() => setOpenDetalle({ open: true, datos: datoscomianioA, anio: anioI - 1, resumen: resumenMateriaAnioA, docentes: datosEvaluacionA })} sx={{ borderRadius: 2, px: 4 }}>Detalle Comisiones {anioI - 1}</Button></Grid>
            )}
            <Grid item><Button variant="contained" color="primary" onClick={() => setOpenDetalle({ open: true, datos: datoscomianio, anio: anioI, resumen: resumenMateriaAnio, docentes: datosEvaluacion })} sx={{ borderRadius: 2, px: 4 }}>Detalle Comisiones {anioI}</Button></Grid>
          </Grid>
        </Box>
      )}
      {!habilitado && !loading && !errorActual && <HelpBusquedaResultadoA />}

      <Modal open={openDetalle.open} onClose={() => setOpenDetalle({ ...openDetalle, open: false })}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 2, borderRadius: 2, width: '98vw', maxHeight: '98vh', overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}><IconButton onClick={() => setOpenDetalle({ ...openDetalle, open: false })} color="error"><CloseIcon /></IconButton></Box>
          <InfoMuestraComisiones resumenM={openDetalle.resumen} datosComi={openDetalle.datos} materia={materia} anio={openDetalle.anio} docentes={openDetalle.docentes} />
        </Box>
      </Modal>
    </Container>
  );
};

export default ComisionesCursadasAnioResultado;