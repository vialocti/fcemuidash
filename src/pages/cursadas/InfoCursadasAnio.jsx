import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Box,
  Divider,
  Fade,
  Stack,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// --- SERVICIOS ---
import { 
  traerComisionesPerLect, 
  traerComparativaInscripcionesActividad, 
  traerListadoAlumnosComision, 
  traerListadoComisiones 
} from '../../services/servicesCursadas.js';

// --- COMPONENTES ---
import PestañasComisiones from '../../components/cursadas/infocursadas/PestañasComisiones.jsx';
import TablaComparativaInscripciones from '../../components/cursadas/TablaComparativaInscripciones.jsx';

const InfoCursadasAnio = () => {
  // --- ESTADOS DE DATOS ---
  const [comisionesAnio, setComisionesAnio] = useState(null);
  const [sedeComisionesPLM, setSedeComisionesPLM] = useState(null);
  const [comisiones, setComisiones] = useState(null);
  const [datos, setDatos] = useState(null);
  
  // --- ESTADOS DE SELECCIÓN ---
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [sedeSel, setSedeSel] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [pgenerico, setPgenerico] = useState('');
  const [actividad, setActividad] = useState('');
  
  // --- ESTADOS DE UI ---
  const [periodosPorSede, setPeriodosPorSede] = useState([]);
  const [actividadesUnicas, setActividadesUnicas] = useState([]);
  const [procesado, setProcesado] = useState(false);

  // --- CARGA INICIAL (LISTADO COMPLETO DEL AÑO) ---
  useEffect(() => {
    const cargarDatosBase = async () => {
      try {
        const [listado, porSede] = await Promise.all([
          traerListadoComisiones(anio),
          traerComisionesPerLect(anio)
        ]);
 //       console.log(listado)
 //     console.log(porSede)
        setComisionesAnio(listado);
        setSedeComisionesPLM(porSede);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };
    cargarDatosBase();
  }, [anio]);

  // --- HELPERS DE MAPEOS ---
  const traerubicacion = sede => ({ MZA: 1, SRF: 2, ESTE: 4 }[sede] || null);
  
  const traerPgenerico = nombre => ({
    'Anual': 1, '1er Cuatrimestre': 2, '2do Cuatrimestre': 3,
    '1er Bimestre': 10, '2do Bimestre': 11,
    '3er Bimestre': 12, '4to Bimestre': 13
  }[nombre] || null);

  // --- MANEJADORES DE CAMBIO ---
  const manejarSede = (sede) => {
    setSedeSel(sede);
    setPeriodo('');
    setActividad('');
    setActividadesUnicas([]);
    setComisiones(null);
    setDatos(null);
    const filtrados = sedeComisionesPLM
      ?.filter(item => item.sede === sede)
      .map(item => item.nombre);
    setPeriodosPorSede([...new Set(filtrados)]);
  };

  const manejarPeriodo = (nombrePeriodo) => {
    setPeriodo(nombrePeriodo);
    const ubi = traerubicacion(sedeSel);
    const pgen = traerPgenerico(nombrePeriodo);
    setPgenerico(pgen);

    const filtradas = comisionesAnio?.filter(
      item => item.ubicacion === ubi && item.periodo_generico === pgen
    );
    //const unicas = [...new Set(materias.map(item => item.mater))].sort();
   // const unicas = [...new Set(filtradas?.map(item => item.mater))].sort();
   const unicas = [...new Set(filtradas?.map(item => {
    return item.mater
      .trim()                            // Quita espacios al inicio y final
      .normalize("NFD")                  // Descompone caracteres con tilde (e.g., "Í" -> "I" + "´")
      .replace(/[\u0300-\u036f]/g, "")   // Elimina los acentos/diacríticos
      .toUpperCase();                    // Lo pasa todo a mayúsculas para comparar igual
  }))].sort();

    //console.log(unicas)
    setActividadesUnicas(unicas);
    setActividad('');
    setComisiones(null);
  };

  // --- LÓGICA DE BÚSQUEDA ---
  const ejecutarBusqueda = async () => {
    if (!actividad) return;
    
    setProcesado(true);
    setComisiones(null);
    setDatos(null);

    try {
      // Limpiamos el código de actividad (quitamos el nombre largo)
      const codAct = actividad.split(':')[0].trim();
      
      // Ejecución paralela de servicios para rapidez
      const [comparativa, filtradasRaw] = await Promise.all([
        traerComparativaInscripcionesActividad(anio, sedeSel, codAct, pgenerico),
        comisionesAnio?.filter(item => 
          item.mater === codAct && 
          item.ubicacion === traerubicacion(sedeSel) && 
          item.periodo_generico === pgenerico
        )
      ]);

      setDatos(comparativa);

      // Mapeo detallado de cada comisión con sus alumnos
      const resultadosComisiones = await Promise.all(
        filtradasRaw.map(async (item) => {
          const listadoAlumnos = await traerListadoAlumnosComision(item.comision, anio, sedeSel, codAct);
          return {
            comision: item.comision,
            nombre: item.nmat,
            alumnos: listadoAlumnos || [],
            total: Array.isArray(listadoAlumnos) ? listadoAlumnos.length : 0
          };
        })
      );
      setComisiones(resultadosComisiones);
    } catch (err) {
      console.error("Fallo al obtener el reporte:", err);
    } finally {
      setProcesado(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* SECCIÓN DE CABECERA */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AnalyticsIcon sx={{ fontSize: 48, color: '#1e3a8a' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
              Inscripciones a Cursar
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitoreo de comisiones • Ciclo Lectivo {anio}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* PANEL DE FILTROS (Paper Grisáceo) */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, border: '1px solid #f3f4f6', bgcolor: '#f9fafb' }}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sede</InputLabel>
              <Select value={sedeSel} label="Sede" onChange={(e) => manejarSede(e.target.value)}>
                {[...new Set(sedeComisionesPLM?.map(i => i.sede))]
                  .filter(s => s !== 'GALV')
                  .map((s, idx) => <MenuItem key={idx} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small" disabled={!sedeSel}>
              <InputLabel>Periodo</InputLabel>
              <Select value={periodo} label="Periodo" onChange={(e) => manejarPeriodo(e.target.value)}>
                {periodosPorSede?.map((p, idx) => <MenuItem key={idx} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={5}>
            <FormControl fullWidth size="small" disabled={!actividadesUnicas.length}>
              <InputLabel>Actividad / Materia</InputLabel>
              <Select value={actividad} label="Actividad / Materia" onChange={(e) => setActividad(e.target.value)}>
                {actividadesUnicas?.map((a, idx) => <MenuItem key={idx} value={a}>{a}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={ejecutarBusqueda}
              disabled={!actividad || procesado}
              startIcon={!procesado && <SearchIcon />}
              sx={{ 
                height: 40, 
                borderRadius: 2, 
                textTransform: 'none', 
                fontWeight: '800',
                bgcolor: '#1e3a8a',
                '&:hover': { bgcolor: '#1e40af' }
              }}
            >
              {procesado ? <CircularProgress size={20} color="inherit" /> : "Ver Informe"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ÁREA DE RESULTADOS DINÁMICA */}
      <Box>
        {datos && comisiones ? (
          <Fade in={true} timeout={600}>
            <Grid container spacing={4}>
              {/* Tabla Comparativa */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <InfoOutlinedIcon color="primary" />
                    <Typography variant="h6" fontWeight="700">Comparativa con Años Anteriores</Typography>
                  </Stack>
                  <TablaComparativaInscripciones datos={datos} />
                </Paper>
              </Grid>

              {/* Tabs de Comisiones */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                  <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>Detalle de Alumnos por Comisión</Typography>
                  <Divider sx={{ mb: 4 }} />
                  <PestañasComisiones comisiones={comisiones} />
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        ) : procesado ? (
          /* Estado de Carga */
          <Stack alignItems="center" justifyContent="center" sx={{ py: 12 }}>
            <CircularProgress thickness={4} size={60} sx={{ mb: 2, color: '#1e3a8a' }} />
            <Typography variant="h6" color="text.secondary" fontWeight="600">
              Generando reporte consolidado...
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Consultando bases de datos de Guaraní
            </Typography>
          </Stack>
        ) : (
          /* Estado Vacío / Inicial */
          <Box sx={{ py: 12, textAlign: 'center', border: '2px dashed #e5e7eb', borderRadius: 4, bgcolor: '#fcfcfc' }}>
            <HelpOutlineIcon sx={{ fontSize: 48, color: '#d1d5db', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" fontWeight="500">
              Por favor, seleccione una Sede, Periodo y Actividad para visualizar el informe.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default InfoCursadasAnio;