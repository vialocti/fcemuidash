import React, { useState, useMemo } from "react";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Paper, Stack, Fade, CircularProgress, Card, CardActionArea, CardContent,
  IconButton, Tooltip
} from "@mui/material";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { traerInscriptosactividadSede } from "../../services/servicesCursadas";
import InfoMuestraInscriptosSede from "../../components/cursadas/infoMuestraInscriptosSede";

const NOMBRE_SEDES = {
  0: "Facultad (Total)",
  1: "Mendoza",
  2: "San Rafael",
  3: "Gral. Alvear",
  4: "Este"
};

const ComisionesInscripcionesActividad = () => {
  const [anioI, setAnioI] = useState(2025);
  const [materias, setMaterias] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [sedeSeleccionada, setSedeSeleccionada] = useState(0);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("TODOS");
  const [verDetalle, setVerDetalle] = useState(false);

  const onHandleInfo = async () => {
    setLoading(true);
    try {
      const resu = await traerInscriptosactividadSede(anioI);
      setMaterias(resu);
      setSedeSeleccionada(0); 
      setPeriodoSeleccionado("TODOS");
      setVerDetalle(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const dataProcesada = useMemo(() => {
    if (!materias) return { totalGral: 0, totalComisGral: 0, sedes: {}, vistaActual: [], periodosVista: {} };

    const sedesObj = {};
    let totalGral = 0;

    // 1. Agrupamiento por sedes
    materias.forEach(item => {
      const idSede = item.ubicacion;
      const cant = Number(item.tot) || 0;
      const nombrePeriodo = item.periodo || "Sin Periodo";
      totalGral += cant;

      if (!sedesObj[idSede]) {
        sedesObj[idSede] = { totalAlumnos: 0, totalComis: 0, periodos: {}, items: [] };
      }

      sedesObj[idSede].totalAlumnos += cant;
      sedesObj[idSede].totalComis += 1;
      sedesObj[idSede].items.push(item);

      // Agrupamiento interno por periodos
      if (!sedesObj[idSede].periodos[nombrePeriodo]) {
        sedesObj[idSede].periodos[nombrePeriodo] = { totalAlumnos: 0, totalComis: 0 };
      }
      sedesObj[idSede].periodos[nombrePeriodo].totalAlumnos += cant;
      sedesObj[idSede].periodos[nombrePeriodo].totalComis += 1;
    });

    // 2. Determinar qué periodos mostrar en las cards
    const periodosVista = sedeSeleccionada === 0 
      ? materias.reduce((acc, curr) => {
          const p = curr.periodo || "Sin Periodo";
          if (!acc[p]) acc[p] = { totalAlumnos: 0, totalComis: 0 };
          acc[p].totalAlumnos += Number(curr.tot) || 0;
          acc[p].totalComis += 1;
          return acc;
        }, {})
      : (sedesObj[sedeSeleccionada]?.periodos || {});

    // 3. Filtrado para el componente hijo
    let vistaActual = sedeSeleccionada === 0 ? materias : (sedesObj[sedeSeleccionada]?.items || []);
    if (periodoSeleccionado !== "TODOS") {
      vistaActual = vistaActual.filter(m => m.periodo === periodoSeleccionado);
    }

    const totalFiltrado = vistaActual.reduce((acc, curr) => acc + (Number(curr.tot) || 0), 0);

    return { 
      totalGral, 
      totalComisGral: materias.length, 
      sedes: sedesObj, 
      vistaActual, 
      periodosVista, 
      totalFiltrado 
    };
  }, [materias, sedeSeleccionada, periodoSeleccionado]);

  const manejarSeleccionPeriodo = (periodo) => {
    setPeriodoSeleccionado(periodo);
    setVerDetalle(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {!verDetalle && (
        <Fade in={!verDetalle}>
          <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <AnalyticsIcon sx={{ color: '#1e3a8a', fontSize: 35 }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Inscriptos por Sede y Periodo</Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e5e7eb', mb: 4 }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12} md={2}>
                  <TextField fullWidth size="small" type="number" label="Año Lectivo" value={anioI} onChange={(e) => setAnioI(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button 
                    variant="contained" 
                    startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <SearchIcon />}
                    onClick={onHandleInfo}
                    disabled={loading}
                    sx={{ bgcolor: '#1e3a8a', px: 4, borderRadius: 2, height: 40 }}
                  >
                    Consultar
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {materias && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: 'text.secondary' }}>1. SELECCIONE SEDE:</Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {[0, 1, 2, 3, 4].map((id) => (
                    <Grid item xs={12} sm={6} md={2.4} key={id}>
                      <Card 
                        sx={{ 
                          borderRadius: 3, border: '2px solid',
                          borderColor: sedeSeleccionada === id ? '#1e3a8a' : 'transparent',
                          bgcolor: sedeSeleccionada === id ? '#1e3a8a' : '#fff',
                          color: sedeSeleccionada === id ? '#fff' : '#1e3a8a',
                        }}
                      >
                        <CardActionArea onClick={() => { setSedeSeleccionada(id); setPeriodoSeleccionado("TODOS"); }}>
                          <CardContent>
                            <Typography variant="overline" sx={{ fontWeight: 'bold' }}>{NOMBRE_SEDES[id]}</Typography>
                            <Typography variant="h4" fontWeight="800">
                              {id === 0 ? dataProcesada.totalGral : (dataProcesada.sedes[id]?.totalAlumnos || 0)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.9, display: 'block', fontWeight: 600 }}>
                              {id === 0 ? dataProcesada.totalComisGral : (dataProcesada.sedes[id]?.totalComis || 0)} Comisiones
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AssignmentIcon color="primary" /> 2. SELECCIONE UN PERIODO:
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(dataProcesada.periodosVista).map(([nombre, info]) => (
                      <Grid item xs={12} sm={6} md={3} key={nombre}>
                        <Card sx={{ borderRadius: 2, borderLeft: '5px solid #10b981' }}>
                          <CardActionArea onClick={() => manejarSeleccionPeriodo(nombre)}>
                            <CardContent sx={{ py: 1.5 }}>
                              <Typography variant="caption" fontWeight="bold" color="text.secondary">{nombre}</Typography>
                              <Typography variant="h5" fontWeight="800">{info.totalAlumnos}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                {info.totalComis} Comisiones
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: 'primary.main', mt: 1, fontWeight: 'bold' }}>
                                Click para ver detalle →
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      )}

      {verDetalle && (
        <Fade in={verDetalle}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Tooltip title="Volver">
                <IconButton onClick={() => setVerDetalle(false)} sx={{ bgcolor: '#f1f5f9' }}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Box>
                <Typography variant="h6" fontWeight="800">Detalle de Inscripciones</Typography>
                <Typography variant="caption" color="text.secondary">
                  {NOMBRE_SEDES[sedeSeleccionada]} | {periodoSeleccionado}
                </Typography>
              </Box>
            </Stack>

            <InfoMuestraInscriptosSede 
              sede={`${NOMBRE_SEDES[sedeSeleccionada]} - ${periodoSeleccionado}`} 
              materias={dataProcesada.vistaActual} 
              total={dataProcesada.totalFiltrado}
            />
          </Box>
        </Fade>
      )}

      {!materias && !loading && (
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 10 }}>
          Realice una consulta para visualizar los datos.
        </Typography>
      )}
    </Container>
  );
};

export default ComisionesInscripcionesActividad;