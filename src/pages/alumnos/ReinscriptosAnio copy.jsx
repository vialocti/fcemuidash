import React, { useState, useMemo } from "react";
import {
  Box, Container, Grid, Paper, TextField, Button, Typography,
  Card, CardActionArea, CardContent, Fade, CircularProgress,
  Stack, Divider, Avatar
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
  5: "CPN98",
  6: "LA98",
  7: "LE98",
  10: "GNR12",  
  21: "LGTO",
  20: "CP26",
  18: "LA26",
  19: "LE26",
  12: "CP19",
  13: "LA19",
  11: "LLO16",
  14: "LE19",
  17: "LLO25"
};

const NOMBRES_SEDES = {
  0: "Total FCE",
  1: "Mendoza",
  2: "San Rafael",
  3: "Gral. Alvear",
  4: "Este"
};

const ReinscriptosAño = () => {
  const [anio, setAnio] = useState(2026);
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(0);

  const handleConsultar = async () => {
    setLoading(true);
    setDatos(null); 
    try {
      const res = await traerReinscriptosAnioALU(anio);
      setDatos(Array.isArray(res.data) ? res.data : []);
      setSedeSeleccionada(0);
    } catch (error) {
      console.error("Error:", error);
      setDatos([]); 
    } finally {
      setLoading(false);
    }
  };

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
      const nombrePlan = MAP_PLAN[pl] || "";

      // --- FILTRO DE CONSISTENCIA HISTÓRICA ---
      // Si el año consultado es menor a 2026, ignoramos planes que contengan "26" en su nombre
      if (Number(anio) < 2026 && nombrePlan.includes("26")) {
        return; 
      }
      
      // Si el año consultado es menor a 2025, ignoramos planes que contengan "25"
      if (Number(anio) < 2025 && nombrePlan.includes("25")) {
        return;
      }

      if (ubi >= 0 && ubi <= 4) {
        sedes[ubi].count++;
        if (ubi !== 0) sedes[0].count++; // Evitamos duplicar si la ubi ya viene como 0

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
  }, [datos, anio]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', mb: 4, bgcolor: '#ffffff' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#1e3a8a', width: 56, height: 56 }}>
              <SchoolIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b' }}>Reinscripciones</Typography>
              <Typography variant="body2" color="text.secondary">Reporte Histórico Consistente</Typography>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={2}>
            <TextField
              label="Año Académico"
              type="number"
              size="small"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              sx={{ width: 140 }}
            />
            <Button
              variant="contained"
              disableElevation
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              onClick={handleConsultar}
              disabled={loading}
              sx={{ bgcolor: '#1e3a8a', borderRadius: 3, px: 4, fontWeight: 'bold' }}
            >
              Consultar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
           <CircularProgress thickness={5} size={60} sx={{ color: '#1e3a8a' }} />
        </Box>
      )}

      {datos && !loading && (
        <Fade in={true}>
          <Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[0, 1, 2, 3, 4].map((id) => (
                <Grid item xs={12} sm={6} md={2.4} key={id}>
                  <Card 
                    sx={{ 
                      borderRadius: 5, 
                      border: '2px solid',
                      transition: 'all 0.2s ease',
                      borderColor: sedeSeleccionada === id ? '#3b82f6' : 'transparent',
                      bgcolor: sedeSeleccionada === id ? '#f0f7ff' : '#fff',
                      boxShadow: sedeSeleccionada === id ? '0 10px 20px rgba(59,130,246,0.15)' : 'none',
                    }}
                  >
                    <CardActionArea onClick={() => setSedeSeleccionada(id)} sx={{ p: 1 }}>
                      <CardContent>
                        <Typography variant="overline" sx={{ fontWeight: 800, color: sedeSeleccionada === id ? '#2563eb' : '#64748b' }}>
                          {NOMBRES_SEDES[id]}
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: '#1e293b', my: 1 }}>
                          {infoProcesada.sedes[id]?.count || 0}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          {Number(anio) < 2026 ? `DATOS HISTÓRICOS ${anio}` : 'REINCRIPTOS ACTUALES'}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssignmentIndIcon color="primary" /> 
                Distribución por Plan en {NOMBRES_SEDES[sedeSeleccionada]} ({anio})
              </Typography>

              <Grid container spacing={2}>
                {Object.values(infoProcesada.porPlanPropuesta[sedeSeleccionada]).length > 0 ? (
                  Object.values(infoProcesada.porPlanPropuesta[sedeSeleccionada]).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: 4, 
                          border: '1px solid #e2e8f0',
                          bgcolor: '#fff',
                          '&:hover': { borderColor: '#3b82f6' }
                        }}
                      >
                        <Typography variant="caption" sx={{ color: '#3b82f6', fontWeight: 900 }}>
                           PLAN {item.plan}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', mb: 1, height: 40, overflow: 'hidden' }}>
                          {item.prop}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">Alumnos</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 900 }}>{item.cant}</Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
                      No existen registros consistentes para {anio}.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default ReinscriptosAño;