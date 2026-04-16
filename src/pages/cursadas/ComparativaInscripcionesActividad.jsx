import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Fade,
  FormControl
} from "@mui/material";

// Iconos
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EventIcon from '@mui/icons-material/Event';
import TimelineIcon from '@mui/icons-material/Timeline';

// Servicios y Componentes
import { traerComparativaInscripcionesAnio } from "../../services/servicesCursadas";
import InfoMuestraInscriptosAniosSede from "../../components/cursadas/infoMuestraInscriptosAniosSede";
import HelpPanelInscriptos from "../../components/ayudas/HelpPanelInscriptos";

const ComparativaInscripcionesActividad = () => {
  const [anioI, setAnioI] = useState(2024);
  const [sede, setSede] = useState("1");
  const [materias, setMaterias] = useState(null);
  const [loading, setLoading] = useState(false);

  const onHandleChange = (event) => {
    setMaterias(null);
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
    }
  };

  const onHandleChangeSede = (event) => {
    setMaterias(null);
    setSede(event.target.value);
  };

  const onHandleInfo = async () => {
    setLoading(true);
    try {
      const resu = await traerComparativaInscripcionesAnio(anioI, sede);
      setMaterias(resu);
    } catch (error) {
      console.error("Error al obtener comparativa:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* HEADER DEL COMPONENTE */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TimelineIcon sx={{ fontSize: 40, color: '#1e3a8a' }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
            Análisis Comparativo Histórico
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Evolución de inscripciones en actividades (Últimos 5 años)
          </Typography>
        </Box>
      </Box>

      {/* PANEL DE CONTROL (FILTROS) */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 4, 
          border: '1px solid #e5e7eb',
          bgcolor: '#f9fafb'
        }}
      >
        <Grid container spacing={3} alignItems="flex-end">
          
          <Grid item xs={12} md={2}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon fontSize="small" sx={{ color: '#6b7280' }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#4b5563' }}>AÑO BASE</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                name="anioI"
                type="number"
                variant="outlined"
                value={anioI}
                onChange={onHandleChange}
                sx={{ bgcolor: 'white' }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationCityIcon fontSize="small" sx={{ color: '#6b7280' }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#4b5563' }}>SEDE DE ANÁLISIS</Typography>
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={sede}
                  onChange={onHandleChangeSede}
                  sx={{ bgcolor: 'white' }}
                >
                  <MenuItem value={'1'}>Mendoza</MenuItem>
                  <MenuItem value={'2'}>San Rafael</MenuItem>
                  <MenuItem value={'4'}>Este</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              onClick={onHandleInfo}
              disabled={loading}
              sx={{ 
                height: 40, 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                bgcolor: '#1e3a8a',
                '&:hover': { bgcolor: '#1e40af' }
              }}
            >
              {loading ? "Calculando..." : "Comparar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ÁREA DE RESULTADOS */}
      <Box sx={{ minHeight: 400 }}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 12 }}>
            <CircularProgress thickness={5} size={60} sx={{ mb: 2, color: '#1e3a8a' }} />
            <Typography variant="h6" color="text.secondary" fontWeight="600">
              Procesando series históricas...
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Esto implica cruzar datos de los últimos 5 ciclos lectivos
            </Typography>
          </Stack>
        ) : materias ? (
          <Fade in={true} timeout={800}>
            <Box>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                  <HistoryIcon color="primary" />
                  <Typography variant="h6" fontWeight="700">Resultados de la Comparativa</Typography>
                </Stack>
                <InfoMuestraInscriptosAniosSede sede={sede} materias={materias} anio={anioI} />
              </Paper>
            </Box>
          </Fade>
        ) : (
          <Box sx={{ opacity: 0.7 }}>
            <HelpPanelInscriptos />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ComparativaInscripcionesActividad;