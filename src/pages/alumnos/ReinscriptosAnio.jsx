import React, { useState, useMemo, useEffect } from "react";
import {
  Box, Container, Grid, Paper, Typography, Card, CardActionArea, 
  CardContent, Fade, CircularProgress, Stack, Divider, Avatar, IconButton, Tooltip
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UpdateIcon from '@mui/icons-material/Update';
import RefreshIcon from '@mui/icons-material/Refresh';

// --- SERVICIO ---
import { traerReinscriptosAnioALU } from "../../services/servicesAlumnos";

// --- DICCIONARIOS DE TRADUCCIÓN ---
const MAP_PROPUESTA = {
  1: "CONTADOR PUBLICO NACIONAL",
  6: "Lic. Neg.Regionales (LNRG)",
  9: "Lic. Gestión Neg. (LGTO)",
  2: "Lic. Administración (LA)",
  3: "Lic. Economía (LE)",
  8: "Contador Público (CP)",
  7: "Lic. Logística (LLO)"
};

const MAP_PLAN = {
  5: "CPN98", 6: "LA98", 7: "LE98", 10: "GNR12", 21: "LGTO",
  20: "CP26", 18: "LA26", 19: "LE26", 12: "CP19", 13: "LA19",
  11: "LLO16", 14: "LE19", 17: "LLO25"
};

const NOMBRES_SEDES = {
  0: "Total FCE", 1: "Mendoza", 2: "San Rafael", 3: "Gral. Alvear", 4: "Este"
};

const ReinscriptosAño = () => {
  // Tomamos el año dinámicamente del sistema
  const anioSistema = new Date().getFullYear();
  
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(0);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const res = await traerReinscriptosAnioALU(anioSistema);
      setDatos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setDatos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const infoProcesada = useMemo(() => {
    const estructuraVacia = {
      sedes: { 0: { count: 0 }, 1: { count: 0 }, 2: { count: 0 }, 3: { count: 0 }, 4: { count: 0 } },
      porPlanPropuesta: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {} }
    };

    if (!datos || datos.length === 0) return estructuraVacia;

    const sedes = { ...estructuraVacia.sedes };
    const planesMap = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {} };

    datos.forEach(reg => {
      const ubi = Number(reg.ubicacion);
      const p = reg.propuesta;
      const pl = reg.plan;

      if (ubi >= 0 && ubi <= 4) {
        sedes[ubi].count++;
        if (ubi !== 0) sedes[0].count++;

        const key = `${p}-${pl}`;
        const registrarEnSede = (id) => {
          if (!planesMap[id][key]) {
            planesMap[id][key] = { 
              prop: MAP_PROPUESTA[p] || `Prop. ${p}`, 
              plan: MAP_PLAN[pl] || `Plan ${pl}`, 
              cant: 0 
            };
          }
          planesMap[id][key].cant++;
        };

        registrarEnSede(ubi);
        if (ubi !== 0) registrarEnSede(0);
      }
    });

    return { sedes, porPlanPropuesta: planesMap };
  }, [datos]);

  if (loading && !datos) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', gap: 2 }}>
        <CircularProgress thickness={5} size={60} sx={{ color: '#1e3a8a' }} />
        <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 700 }}>Sincronizando Ciclo {anioSistema}...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* CABECERA DINÁMICA */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', mb: 4, bgcolor: '#ffffff' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#1e3a8a', width: 56, height: 56, boxShadow: '0 4px 12px rgba(30,58,138,0.2)' }}>
              <SchoolIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b', letterSpacing: -0.5 }}>
                Reinscripciones Académicas {anioSistema}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                <UpdateIcon sx={{ fontSize: 16, color: '#10b981' }} /> Datos en tiempo real de la facultad
              </Typography>
            </Box>
          </Box>
          
          <Tooltip title="Actualizar datos">
            <IconButton onClick={cargarDatos} disabled={loading} sx={{ border: '1px solid #e2e8f0' }}>
              {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      <Fade in={true} timeout={800}>
        <Box>
          {/* TOTALES POR UBICACIÓN */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[0, 1, 2, 3, 4].map((id) => (
              <Grid item xs={12} sm={6} md={2.4} key={id}>
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 5, border: '2px solid', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderColor: sedeSeleccionada === id ? '#3b82f6' : '#f1f5f9',
                    bgcolor: sedeSeleccionada === id ? '#f0f7ff' : '#fff',
                    transform: sedeSeleccionada === id ? 'translateY(-4px)' : 'none',
                    boxShadow: sedeSeleccionada === id ? '0 12px 24px -10px rgba(59,130,246,0.3)' : 'none',
                  }}
                >
                  <CardActionArea onClick={() => setSedeSeleccionada(id)} sx={{ p: 1 }}>
                    <CardContent>
                      <Typography variant="overline" sx={{ fontWeight: 800, color: sedeSeleccionada === id ? '#2563eb' : '#94a3b8' }}>
                        {NOMBRES_SEDES[id]}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 900, color: '#1e293b', my: 1, letterSpacing: -1 }}>
                        {infoProcesada.sedes[id]?.count || 0}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1 }}>
                        ESTUDIANTES
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* PANEL DE DETALLE */}
          <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AssignmentIndIcon color="primary" /> 
              Análisis de Planes: {NOMBRES_SEDES[sedeSeleccionada]}
            </Typography>

            <Grid container spacing={3}>
              {Object.values(infoProcesada.porPlanPropuesta[sedeSeleccionada]).length > 0 ? (
                Object.values(infoProcesada.porPlanPropuesta[sedeSeleccionada]).map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: '#fff',
                        transition: '0.2s',
                        '&:hover': { borderColor: '#3b82f6', transform: 'scale(1.02)' }
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                        <Box sx={{ bgcolor: '#eff6ff', px: 1.5, py: 0.5, borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: '#1e3a8a', fontWeight: 900 }}>
                            {item.plan}
                          </Typography>
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b' }}>
                          {item.cant}
                        </Typography>
                      </Stack>
                      
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', minHeight: 45, lineHeight: 1.3 }}>
                        {item.prop}
                      </Typography>
                      
                      <Divider sx={{ my: 2, opacity: 0.6 }} />
                      
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                        REINSCRIPTOS {anioSistema}
                      </Typography>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" color="text.secondary">No hay registros para procesar en esta sede.</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default ReinscriptosAño;