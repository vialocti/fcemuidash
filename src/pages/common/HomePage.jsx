import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  TableContainer,
  IconButton,
} from "@mui/material";

// Iconos
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BusinessIcon from "@mui/icons-material/Business";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Hooks y Componentes
import { usePageInicial } from "../../hooks/usepageInicial";
import BarChartSimple from "../../utils/graphics/BarCharSimple";

// ── Datos del carrusel ────────────────────────────────────────────────────────
const CAROUSEL_ITEMS = [
  {
    icon: <SchoolIcon fontSize="small" />,
    color: "#2e7d32",
    texto: "Consultá egresados por carrera y período, Muestra Evolucion ultimos 5 años ",
    detalle: "Menu Egresados - Opcion Egresados Año",
    ruta: null,
  },
  {
    icon: <TrendingUpIcon fontSize="small" />,
    color: "#9c27b0",
    texto: "Verificá los reinscriptos del año en curso discrimindos por Carrera",
    detalle: "Panel de Egresados → Reinscriptos, Menu Estudiantes - Opcion Reinscriptos  ",
    ruta: "/alumnos-reinscriptos",
  },
  {
    icon: <HowToRegIcon fontSize="small" />,
    color: "#0288d1",
    texto: "Revisá inscripciones a cursadas por sede",
    detalle: "Dashboard FCE → Cursadas - Inscripciones sede",
    ruta: null,
  },
  {
    icon: <PeopleOutlineIcon fontSize="small" />,
    color: "#ed6c02",
    texto: "Seguí el ingreso de aspirantes para el próximo año",
    detalle: "Dashboard FCE → Ingresantes - panel Aspirantes",
    ruta: null,
  },
  {
    icon: <GroupIcon fontSize="small" />,
    color: "#1976d2",
    texto: "Consultá la distribución de Estudiantes activos por sede, carrera, por plan y año de cursada",
    detalle: "Dashboard FCE → Estudiantes - Opcion Estudiantes Activos",
    ruta: null,
  },
  {
    icon: <LightbulbOutlinedIcon fontSize="small" />,
    color: "#f57c00",
    texto: "Tip: usá el año de referencia para comparar períodos históricos",
    detalle: "Panel de Egresados → Comparativo años completos",
    ruta: null,
  },
  {
    icon: <LightbulbOutlinedIcon fontSize="small" />,
    color: "#f57c00",
    texto: "Tip: Sigue la Evolución de Año Lectivo, Cursadas, inscripciones, Examenes .., examina las diferentes opciones",
    detalle: "Dashboard - FCE → Ciclo Lectivo",
    ruta: null,
  },
  {
    icon: <LightbulbOutlinedIcon fontSize="small" />,
    color: "#f57c00",
    texto: "Tip: pudes ver el resultado de una actividad aprobadas, reprobadas, promovidos y demas datos...",
    detalle: "Dashboard - FCE → Cursadas - Resultado Actividad",
    ruta: null,
  },
];

// ── Carrusel ──────────────────────────────────────────────────────────────────
const CarruselPie = ({ navigate }) => {
  const [idx, setIdx] = useState(0);

  const siguiente = useCallback(() => setIdx((i) => (i + 1) % CAROUSEL_ITEMS.length), []);
  const anterior = useCallback(() => setIdx((i) => (i - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length), []);

  useEffect(() => {
    const timer = setInterval(siguiente, 5000);
    return () => clearInterval(timer);
  }, [siguiente]);

  const item = CAROUSEL_ITEMS[idx];

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: "#fafafa",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        overflow: "hidden",
        minHeight: 48,
      }}
    >
      {/* Flecha izquierda */}
      <IconButton size="small" onClick={anterior} sx={{ flexShrink: 0 }}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      {/* Ícono coloreado */}
      <Box
        sx={{
          color: item.color,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {item.icon}
      </Box>

      {/* Texto */}
   
<Typography
  variant="body2"
  sx={{ fontWeight: 700, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
>
  {item.texto}
</Typography>


<Typography
  variant="caption"
  color="text.secondary"
  sx={{ fontSize: "0.75rem", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
>
  📍 {item.detalle}
</Typography>

      {/* Botón navegar (solo si tiene ruta) */}
      {item.ruta && (
        <IconButton
          size="small"
          onClick={() => navigate(item.ruta)}
          sx={{ flexShrink: 0, color: item.color }}
          title="Ir a la sección"
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      )}

      {/* Flecha derecha */}
      <IconButton size="small" onClick={siguiente} sx={{ flexShrink: 0 }}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>

      {/* Indicadores de puntos */}
      <Stack direction="row" spacing={0.4} sx={{ flexShrink: 0 }}>
        {CAROUSEL_ITEMS.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIdx(i)}
            sx={{
              width: i === idx ? 14 : 6,
              height: 6,
              borderRadius: 3,
              bgcolor: i === idx ? item.color : "#ccc",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

// ── HomePage ──────────────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate();
  const anioActual = new Date().getFullYear();
  const [selectedTab, setSelectedTab] = useState("activos");

  const {
    loading,
    error,
    cantidadSedeEgr,
    cantidadInsc,
    cantidadAlu,
    cantidadProvisorios,
    cantidadInscriptosCursada,
    reinscriptos,
    datosAsistencia,
  } = usePageInicial(anioActual);

  const stats = useMemo(() => {
    const safeGetSede = (arr, sede) =>
      Number(arr?.find((e) => e.sede === sede)?.count || 0);
    const safeGetCod = (arr, cod) =>
      Number(arr?.find((e) => String(e.codinst) === String(cod))?.count || 0);
    const safeGetCursada = (arr, ubi) =>
      arr?.filter((i) => i.ubicacion === ubi).reduce((s, i) => s + Number(i.count), 0) || 0;

    return {
      egresados: {
        mza: safeGetSede(cantidadSedeEgr, "MZA"),
        sr: safeGetSede(cantidadSedeEgr, "SRF"),
        ga: safeGetSede(cantidadSedeEgr, "GALV"),
        es: safeGetSede(cantidadSedeEgr, "ESTE"),
      },
      activos: {
        mza: safeGetSede(cantidadAlu, "MZA"),
        sr: safeGetSede(cantidadAlu, "SRF"),
        ga: safeGetSede(cantidadAlu, "GALV"),
        es: safeGetSede(cantidadAlu, "ESTE"),
      },
      provisorios: {
        mza: safeGetCod(cantidadProvisorios, 185),
        sr: safeGetCod(cantidadProvisorios, 186),
        ga: safeGetCod(cantidadProvisorios, 2714),
        es: safeGetCod(cantidadProvisorios, 2970),
      },
      cursadas: {
        mza: safeGetCursada(cantidadInscriptosCursada, 1),
        sr: safeGetCursada(cantidadInscriptosCursada, 2),
        ga: safeGetCursada(cantidadInscriptosCursada, 3),
        es: safeGetCursada(cantidadInscriptosCursada, 4),
      },
      aspirantes: {
        mza: safeGetSede(cantidadInsc, "MZA"),
        sr: safeGetSede(cantidadInsc, "SRF"),
        ga: safeGetSede(cantidadInsc, "GALV"),
        es: safeGetSede(cantidadInsc, "ESTE"),
      },
      totalRei: reinscriptos?.data?.length || 0,
    };
  }, [cantidadSedeEgr, cantidadInsc, cantidadAlu, cantidadProvisorios, cantidadInscriptosCursada, reinscriptos]);

  const totals = useMemo(() => ({
    activos:
      Object.values(stats.activos).reduce((a, b) => a + b, 0) +
      Object.values(stats.provisorios).reduce((a, b) => a + b, 0),
    egresados: Object.values(stats.egresados).reduce((a, b) => a + b, 0),
    cursadas: Object.values(stats.cursadas).reduce((a, b) => a + b, 0),
    inscriptos: Object.values(stats.aspirantes).reduce((a, b) => a + b, 0),
  }), [stats]);

  const fechasAnio = useMemo(() => {
    const fechaHoy = new Date().toISOString().substring(0, 10);
    const esAntesDeAbril = fechaHoy < `${anioActual}-04-01`;
    return {
      anioI: esAntesDeAbril ? anioActual : anioActual + 1,
      anioCurso: esAntesDeAbril ? anioActual - 1 : anioActual,
    };
  }, [anioActual]);

  const menuItems = [
    { id: "activos", label: "Alumnos Activos", value: totals.activos, icon: <GroupIcon />, color: "#1976d2" },
    { id: "egresados", label: `Egresados ${fechasAnio.anioCurso}`, value: totals.egresados, icon: <SchoolIcon />, color: "#2e7d32" },
    { id: "cursadas", label: `Cursadas ${fechasAnio.anioCurso}`, value: totals.cursadas, icon: <HowToRegIcon />, color: "#0288d1" },
    { id: "ingreso", label: `Aspirantes ${fechasAnio.anioI}`, value: totals.inscriptos, icon: <PeopleOutlineIcon />, color: "#ed6c02" },
    { id: "reinscriptos", label: `Reinscriptos ${anioActual}`, value: stats.totalRei, icon: <TrendingUpIcon />, color: "#9c27b0", isLink: true },
  ];

  if (error)
    return <Container sx={{ mt: 10 }}><Alert severity="error">Error de conexión.</Alert></Container>;

  const tieneDatos = totals.activos > 0 || stats.totalRei > 0;
  if (loading && !tieneDatos)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
        <CircularProgress size={50} />
        <Typography variant="body2" sx={{ mt: 2 }}>Sincronizando...</Typography>
      </Box>
    );

  return (
    <Container maxWidth="xl" sx={{ py: 2, height: "95vh", display: "flex", flexDirection: "column" }}>

      {/* ── Header ── */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <BusinessIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a237e" }}>Dashboard FCE</Typography>
        </Stack>
        {loading && <CircularProgress size={20} />}
      </Box>

      {/* ── Cuerpo principal ── */}
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "hidden" }}>

        {/* Panel izquierdo */}
        <Grid item xs={12} md={4} lg={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Paper variant="outlined" sx={{ borderRadius: 2, flexGrow: 1, overflowY: "auto" }}>
            <List sx={{ p: 0 }}>
              {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItemButton
                    selected={selectedTab === item.id}
                    onClick={() => item.isLink ? navigate("/alumnos-reinscriptos") : setSelectedTab(item.id)}
                    sx={{
                      py: 2,
                      borderLeft: selectedTab === item.id ? `5px solid ${item.color}` : "5px solid transparent",
                      "&.Mui-selected": { bgcolor: `${item.color}08` },
                    }}
                  >
                    <ListItemIcon sx={{ color: item.color, minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.6rem", color: "text.secondary" }}>
                          {item.label.toUpperCase()}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#333" }}>{item.value}</Typography>
                      }
                    />
                    {selectedTab === item.id && <ChevronRightIcon fontSize="small" sx={{ opacity: 0.3 }} />}
                  </ListItemButton>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            {/* ── Asistencia debajo de Reinscriptos ── */}
            <Box sx={{ p: 1.5, borderTop: "1px solid #eee", bgcolor: "#f9f9f9" }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Box sx={{ bgcolor: "#1976d2", p: 0.6, borderRadius: 1, display: "flex" }}>
                  <AccessTimeIcon sx={{ fontSize: 15, color: "white" }} />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                  ASISTENCIA HOY
                </Typography>
              </Stack>
              <Stack spacing={0.8}>
                <Paper variant="outlined" sx={{ px: 1.5, py: 0.8, bgcolor: "#f8fbff" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>DOCENTES</Typography>
                    <Typography variant="caption">
                      📍 {datosAsistencia?.docmarcadosPS || 0} &nbsp;|&nbsp; 💻 {datosAsistencia?.docmarcadosVS || 0}
                    </Typography>
                  </Stack>
                </Paper>
                <Paper variant="outlined" sx={{ px: 1.5, py: 0.8, bgcolor: "#fafafa" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>NO DOCENTES</Typography>
                    <Typography variant="caption">
                      📍 {datosAsistencia?.NdocmarcadosPS || 0} &nbsp;|&nbsp; 🏠 {datosAsistencia?.NdocmarcadosVS || 0}
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>
            </Box>

          </Paper>
        </Grid>

        {/* Panel derecho */}
        <Grid item xs={12} md={8} lg={9} sx={{ height: "100%" }}>
          <Paper variant="outlined" sx={{ p: 3, height: "100%", borderRadius: 2, bgcolor: "#fdfdfd", overflowY: "auto" }}>

            {selectedTab === "activos" && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1976d2" }}>
                  Distribución de Estudiantes
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#f8f9fa" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Sede</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>Matriculados</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>Sin Matricular</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {["Mendoza", "San Rafael", "Gral. Alvear", "Este"].map((sede, idx) => {
                        const keys = ["mza", "sr", "ga", "es"];
                        const a = stats.activos[keys[idx]];
                        const p = stats.provisorios[keys[idx]];
                        return (
                          <TableRow key={sede} hover>
                            <TableCell>{sede}</TableCell>
                            <TableCell align="right">{a}</TableCell>
                            <TableCell align="right">{p}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold", color: "#1976d2" }}>{a + p}</TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow sx={{ bgcolor: "#f0f4ff", borderTop: "2px solid #1976d2" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {Object.values(stats.activos).reduce((a, b) => a + b, 0)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {Object.values(stats.provisorios).reduce((a, b) => a + b, 0)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "1rem" }}>
                          {totals.activos}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: "block", textAlign: "center" }}>
                      MATRICULADOS
                    </Typography>
                    <Box sx={{ height: 250 }}><BarChartSimple data={stats.activos} color="#1976d2" /></Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: "block", textAlign: "center" }}>
                      SIN MATRICULAR
                    </Typography>
                    <Box sx={{ height: 250 }}><BarChartSimple data={stats.provisorios} color="#90caf9" /></Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {["egresados", "cursadas", "ingreso"].includes(selectedTab) && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {menuItems.find((i) => i.id === selectedTab)?.label}
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 500 }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#f8f9fa" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Sede</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>Cant.</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>%</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(
                        selectedTab === "egresados" ? stats.egresados
                          : selectedTab === "cursadas" ? stats.cursadas
                          : stats.aspirantes,
                      ).map(([k, v]) => (
                        <TableRow key={k}>
                          <TableCell>{k.toUpperCase()}</TableCell>
                          <TableCell align="right">{v}</TableCell>
                          <TableCell align="right">
                            {((v / (totals[selectedTab] || totals.inscriptos)) * 100 || 0).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ height: 350 }}>
                  <BarChartSimple
                    data={
                      selectedTab === "egresados" ? stats.egresados
                        : selectedTab === "cursadas" ? stats.cursadas
                        : stats.aspirantes
                    }
                  />
                </Box>
              </Box>
            )}

            {selectedTab === "plan26" && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <AssignmentIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6">Filtro Plan 2026</Typography>
                <Typography variant="body2" color="text.secondary">
                  Alumnos en planes 18, 19 y 20: <b>{stats.plan26}</b>
                </Typography>
              </Box>
            )}

          </Paper>
        </Grid>
      </Grid>

      {/* ── Pie de página: carrusel ── */}
      <Box sx={{ mt: 1.5 }}>
        <CarruselPie navigate={navigate} />
      </Box>

    </Container>
  );
};

export default HomePage;