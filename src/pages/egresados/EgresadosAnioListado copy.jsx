import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DownloadIcon from "@mui/icons-material/Download";
import SchoolIcon from "@mui/icons-material/School";
import { getListadoEgreAnioPropuesta } from "../../services/servicesEgresados";

const HOY = new Date();
const ANIO_REAL = HOY.getFullYear();
const MES_HOY = HOY.getMonth();
const DIA_HOY = HOY.getDate();

const fmt = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getFechasCorte = (anioIter, lapso) => {
  const y = parseInt(anioIter);
  if (lapso === "C") {
    return {
      fi: fmt(new Date(y, 0, 1)),
      ff: fmt(new Date(y, MES_HOY, DIA_HOY)),
    };
  }
  if (lapso === "L") {
    const inicioLActual = new Date(ANIO_REAL, 3, 1);
    if (HOY < inicioLActual) {
      const inicio = fmt(new Date(y, 3, 1));
      return { fi: inicio, ff: inicio };
    }
    return {
      fi: fmt(new Date(y, 3, 1)),
      ff: fmt(new Date(y + 1, MES_HOY, DIA_HOY)),
    };
  }
  if (lapso === "E") {
    return {
      fi: fmt(new Date(y - 1, 9, 1)),
      ff: fmt(new Date(y, MES_HOY, DIA_HOY)),
    };
  }
};

const AÑOS_EVOLUCION = [
  ANIO_REAL,
  ANIO_REAL - 1,
  ANIO_REAL - 2,
  ANIO_REAL - 3,
  ANIO_REAL - 4,
];

const exportarCSV = (datos, titulo) => {
  const encabezado = [
    "Legajo",
    "Nombre",
    "Sede",
    "Carrera",
    "Nota",
    "Duración (años)",
    "Fecha Egreso",
  ];
  const filas = datos.map((item) => [
    item.legajo,
    `"${(item.namec || "").replace(/"/g, '""')}"`,
    item.sede,
    item.propuesta,
    parseFloat(item.promedio).toFixed(2),
    parseFloat(item.tiempo).toFixed(1),
    item.fecha_egreso,
  ]);
  const contenido = [encabezado, ...filas].map((f) => f.join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + contenido], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${titulo.replace(/[^a-z0-9áéíóúñ ]/gi, "_")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// ── Subtítulo de sección ──────────────────────────────────────────────────────
const SeccionSubtitulo = ({ titulo, subtitulo }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1a237e" }}>
      {titulo}
    </Typography>
    {subtitulo && (
      <Typography variant="caption" color="text.secondary">
        {subtitulo}
      </Typography>
    )}
  </Box>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
const ModalEgresados = ({ open, onClose, titulo, datos }) => {
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (open) setBusqueda("");
  }, [open]);

  const datosFiltrados = datos.filter(
    (item) =>
      (item.namec || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (item.legajo || "").toString().includes(busqueda),
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1, pr: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {titulo}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {datos.length} egresado{datos.length !== 1 ? "s" : ""}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar por nombre o legajo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                  Legajo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                  Nombre
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                  Sede
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                  Carrera
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}
                  align="center"
                >
                  Nota
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}
                  align="center"
                >
                  Duración
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}
                  align="center"
                >
                  Fecha egreso
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ py: 4, color: "text.secondary" }}
                  >
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              ) : (
                datosFiltrados.map((item, idx) => (
                  <TableRow
                    key={`${item.legajo}-${idx}`}
                    sx={{
                      "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                      "&:hover": { bgcolor: "#f0f4ff" },
                    }}
                  >
                    <TableCell>{item.legajo}</TableCell>
                    <TableCell>{item.namec}</TableCell>
                    <TableCell>{item.sede}</TableCell>
                    <TableCell>{item.propuesta}</TableCell>
                    <TableCell align="center">
                      {parseFloat(item.promedio).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {parseFloat(item.tiempo).toFixed(1)}a
                    </TableCell>
                    <TableCell align="center">{item.fecha_egreso}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Typography variant="body2" color="textSecondary" sx={{ flex: 1 }}>
          {busqueda && `Mostrando ${datosFiltrados.length} de ${datos.length}`}
        </Typography>
        <Button
          onClick={() => exportarCSV(datosFiltrados, titulo)}
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          sx={{ mr: 1 }}
        >
          Exportar CSV
        </Button>
        <Button onClick={onClose} variant="outlined" size="small">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────
const EgresadosAnioListado = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anio, setAnio] = useState(ANIO_REAL);
  const [lapso, setLapso] = useState("C");
  const [datosActuales, setDatosActuales] = useState({ C: [], L: [], E: [] });
  const [historicoComp, setHistoricoComp] = useState([]);
  const [evolucion, setEvolucion] = useState({ C: [], L: [], E: [] });
  const [lapsoEvol, setLapsoEvol] = useState("C");
  const [modal, setModal] = useState({ open: false, titulo: "", datos: [] });

  const abrirModal = (titulo, datos) => setModal({ open: true, titulo, datos });
  const cerrarModal = () => setModal({ open: false, titulo: "", datos: [] });

  const nombresCarreras = {
    3: "Contador Público Nacional",
    4: "Lic. en Administración",
    5: "Lic. en Economía",
    6: "Lic. Neg. regionales",
    7: "Lic. en Logistica",
    9: "Contador Público (P.2019)",
  };

  const getNombreLapso = (t) =>
    t === "C" ? "Calendario" : t === "L" ? "Lectivo" : "Colación";

  const getDescripcionLapso = (t) =>
    t === "C"
      ? "Egresos registrados del 1° de enero al 31 de diciembre"
      : t === "L"
        ? "Egresos registrados del 1° de abril al 31 de marzo del año siguiente"
        : "Egresos registrados del 1° de octubre al 30 de septiembre del año siguiente";

  const calcularMetricas = (data) => {
    if (!data || data.length === 0)
      return { prom: "0.00", dur: "0.0", total: 0 };
    const sumaNotas = data.reduce(
      (s, r) => s + (parseFloat(r.promedio) || 0),
      0,
    );
    const sumaDuracion = data.reduce(
      (s, r) => s + (parseFloat(r.tiempo) || 0),
      0,
    );
    return {
      total: data.length,
      prom: (sumaNotas / data.length).toFixed(2),
      dur: (sumaDuracion / data.length).toFixed(1),
    };
  };

  // ── Fetches ───────────────────────────────────────────────────
  useEffect(() => {
    const fetch3 = async () => {
      const [resC, resL, resE] = await Promise.all([
        getListadoEgreAnioPropuesta(anio, "T", "C", 0, 0),
        getListadoEgreAnioPropuesta(anio, "T", "L", 0, 0),
        getListadoEgreAnioPropuesta(anio, "T", "E", 0, 0),
      ]);
      setDatosActuales({ C: resC || [], L: resL || [], E: resE || [] });
    };
    fetch3();
  }, [anio]);

  useEffect(() => {
    if (tabValue !== 1) return;
    const fetchComparativo = async () => {
      const años = [anio, anio - 1, anio - 2, anio - 3, anio - 4].map(Number);
      const resultados = await Promise.all(
        años.map((a) => getListadoEgreAnioPropuesta(a, "T", lapso, 0, 0)),
      );
      setHistoricoComp(
        años.map((a, i) => ({
          anio: a,
          ...calcularMetricas(resultados[i] || []),
        })),
      );
    };
    fetchComparativo();
  }, [tabValue, anio, lapso]);

  useEffect(() => {
    if (tabValue !== 2) return;
    if (evolucion[lapsoEvol].length > 0) return;
    const fetchEvolucion = async () => {
      const resultados = await Promise.all(
        AÑOS_EVOLUCION.map((a) => {
          const { fi, ff } = getFechasCorte(a, lapsoEvol);
          return getListadoEgreAnioPropuesta(a, "T", lapsoEvol, fi, ff);
        }),
      );
      setEvolucion((prev) => ({
        ...prev,
        [lapsoEvol]: AÑOS_EVOLUCION.map((a, i) => ({
          anio: a,
          ...calcularMetricas(resultados[i] || []),
        })),
      }));
    };
    fetchEvolucion();
  }, [tabValue, lapsoEvol]);

  // ── Agrupamiento por carrera ──────────────────────────────────
  const dataPeriodo = datosActuales[lapso] || [];
  const gruposCarrera = dataPeriodo.reduce((acc, curr) => {
    const id = curr.propuesta;
    if (!acc[id]) acc[id] = [];
    acc[id].push(curr);
    return acc;
  }, {});

  // ── Nota Tab 2 ────────────────────────────────────────────────
  const inicioLActual = new Date(ANIO_REAL, 3, 1);
  const lapsoNoIniciado = lapsoEvol === "L" && HOY < inicioLActual;
  const diasTranscurridos = (() => {
    if (lapsoEvol === "C")
      return Math.round((HOY - new Date(ANIO_REAL, 0, 1)) / 86_400_000);
    if (lapsoEvol === "L")
      return HOY >= inicioLActual
        ? Math.round((HOY - inicioLActual) / 86_400_000)
        : 0;
    if (lapsoEvol === "E")
      return Math.round((HOY - new Date(ANIO_REAL - 1, 9, 1)) / 86_400_000);
  })();
  const notaEvolucion = lapsoNoIniciado
    ? `El ciclo Lectivo ${ANIO_REAL} aún no comenzó (inicia ${inicioLActual.toLocaleDateString("es-AR")}). Todos los valores son 0.`
    : `Comparativa "a la fecha": primeros ${diasTranscurridos} días de cada ciclo ${getNombreLapso(lapsoEvol)}.`;

  // ── Cards evolución ───────────────────────────────────────────
  const CardsEvolucion = ({ datos, anioDestacado }) => (
    <Grid container spacing={2}>
      {datos.map((h, i) => {
        const ant = datos[i + 1];
        const diff =
          ant && ant.total > 0
            ? (((h.total - ant.total) / ant.total) * 100).toFixed(0)
            : null;
        return (
          <Grid item xs={12} sm={2.4} key={h.anio}>
            <Card
              sx={{
                border: h.anio === anioDestacado ? "2px solid #1976d2" : "none",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6">{h.anio}</Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {h.total}
                </Typography>
                {diff !== null && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 1,
                      color: Number(diff) >= 0 ? "green" : "red",
                    }}
                  >
                    {Number(diff) >= 0 ? (
                      <TrendingUpIcon fontSize="small" />
                    ) : (
                      <TrendingDownIcon fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      sx={{ ml: 0.5, fontWeight: "bold" }}
                    >
                      {diff}%
                    </Typography>
                  </Box>
                )}
                <Box sx={{ mt: 2, pt: 1, borderTop: "1px dashed #ddd" }}>
                  <Typography variant="caption" display="block">
                    Nota: {h.prom}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Duración: {h.dur}a
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );

  // ── sx compartido para cards clickeables ─────────────────────
  const sxCardClickeable = (activo) => ({
    transition: "0.3s",
    border: activo ? "2px solid #1976d2" : "1px solid #ddd",
    bgcolor: activo ? "#e3f2fd" : "white",
    transform: activo ? "scale(1.02)" : "none",
    "&:hover": { boxShadow: 3 },
  });

  // ── Render ────────────────────────────────────────────────────
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ── Header principal ── */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          bgcolor: "#fafafa",
        }}
      >
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 26 }} />
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#1a237e", lineHeight: 1.2 }}
            >
              Panel de Egresados
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Estadísticas de egreso por período y carrera — FCE
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Año de Referencia"
              type="number"
              value={anio}
              onChange={(e) => setAnio(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
              <Tab label="Desglose por Carreras" sx={{ fontWeight: "bold" }} />
              <Tab
                label="Comparativo años completos"
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label={`Evolución a la fecha (${ANIO_REAL})`}
                sx={{ fontWeight: "bold" }}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Cards de lapso ── */}
      <SeccionSubtitulo
        titulo="Resultado por Periodo"
        subtitulo="Seleccioná el período para filtrar el desglose por carrera. Hacé clic en 'Ver listado' para consultar el detalle de egresados."
      />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {["C", "L", "E"].map((tipo) => {
          const datos = datosActuales[tipo] || [];
          const m = calcularMetricas(datos);
          const activo = lapso === tipo;
          return (
            <Grid item xs={4} key={tipo}>
              <Card sx={sxCardClickeable(activo)}>
                {/* Área principal: solo cambia el lapso */}
                <CardContent
                  onClick={() => setLapso(tipo)}
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    pb: "8px !important",
                  }}
                >
                  <Typography variant="overline" color="textSecondary">
                    Año {getNombreLapso(tipo)}
                  </Typography>
                  <Typography
                    variant="h3"
                    color={activo ? "primary" : "inherit"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {m.total}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Prom: <b>{m.prom}</b> | Dur: <b>{m.dur}a</b>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 0.5, fontStyle: "italic" }}
                  >
                    {getDescripcionLapso(tipo)}
                  </Typography>
                </CardContent>

                {/* Área separada: abre el modal */}
                <Box
                  onClick={() => {
                    if (datos.length > 0)
                      abrirModal(
                        `Egresados Año ${getNombreLapso(tipo)} ${anio}`,
                        datos,
                      );
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    py: 0.8,
                    borderTop: "1px solid #e0e0e0",
                    color: datos.length > 0 ? "primary.main" : "text.disabled",
                    cursor: datos.length > 0 ? "pointer" : "default",
                    bgcolor: activo ? "#bbdefb" : "#f5f5f5",
                    "&:hover":
                      datos.length > 0
                        ? { bgcolor: activo ? "#90caf9" : "#e3f2fd" }
                        : {},
                    transition: "background-color 0.2s",
                  }}
                >
                  <ListAltIcon sx={{ fontSize: 15 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Ver listado
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ── Tab 0: Desglose por carreras ── */}
      {tabValue === 0 && (
        <>
          <SeccionSubtitulo
            titulo={`Carreras — Año ${getNombreLapso(lapso)} ${anio}`}
            subtitulo={`Egresados discriminados por carrera para el ciclo ${getNombreLapso(lapso).toLowerCase()}. Hacé clic en una carrera para ver el listado completo.`}
          />
          <Grid container spacing={3}>
            {Object.keys(gruposCarrera).map((id) => {
              const datos = gruposCarrera[id];
              const m = calcularMetricas(datos);
              return (
                <Grid item xs={12} sm={6} md={3} key={id}>
                  <Card
                    variant="outlined"
                    onClick={() =>
                      abrirModal(
                        `${nombresCarreras[id] || `Carrera ${id}`} — ${getNombreLapso(lapso)} ${anio}`,
                        datos,
                      )
                    }
                    sx={{
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { boxShadow: 3, borderColor: "#1976d2" },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        ID {id}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          height: 45,
                          lineHeight: 1.1,
                        }}
                      >
                        {nombresCarreras[id] || `Carrera ${id}`}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">Egresados:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {m.total}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">Nota Promedio:</Typography>
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {m.prom}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">Duración Media:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {m.dur} años
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                          mt: 1.5,
                          pt: 1,
                          borderTop: "1px solid #e0e0e0",
                          color: "primary.main",
                        }}
                      >
                        <ListAltIcon sx={{ fontSize: 14 }} />
                        <Typography variant="caption">Ver listado</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}

      {/* ── Tab 1: Comparativo años completos ── */}
      {tabValue === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SeccionSubtitulo
              titulo={`Evolución histórica — Ciclo ${getNombreLapso(lapso)} (años completos)`}
              subtitulo={`Comparativo de los últimos 5 años considerando el total del período ${getNombreLapso(lapso).toLowerCase()} completo. El año ${anio} incluye todos los egresos registrados.`}
            />
            <Box
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "#e8f5e9",
                borderRadius: 2,
                border: "1px solid #a5d6a7",
              }}
            >
              <Typography variant="body2">
                <b>Nota:</b> Totales completos del ciclo {getNombreLapso(lapso)}{" "}
                para cada año. El año {anio} incluye todos los egresos del
                período completo.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CardsEvolucion
              datos={historicoComp}
              anioDestacado={parseInt(anio)}
            />
          </Grid>
        </Grid>
      )}

      {/* ── Tab 2: Evolución a la fecha ── */}
      {tabValue === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SeccionSubtitulo
              titulo={`Comparativa a la fecha — primeros ${diasTranscurridos} días del ciclo ${getNombreLapso(lapsoEvol)}`}
              subtitulo={`Evolución interanual comparando el mismo tramo transcurrido de cada ciclo ${getNombreLapso(lapsoEvol).toLowerCase()}, para los últimos 5 años.`}
            />
            <Tabs
              value={lapsoEvol}
              onChange={(_, v) => setLapsoEvol(v)}
              sx={{ mb: 2, borderBottom: "1px solid #e0e0e0" }}
            >
              <Tab value="C" label="Año Calendario" />
              <Tab value="L" label="Año Lectivo" />
              <Tab value="E" label="Año Colación" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "#fffde7",
                borderRadius: 2,
                border: "1px solid #ffe082",
              }}
            >
              <Typography variant="body2">
                <b>Promedio:</b> {notaEvolucion}
              </Typography>
            </Box>  
          </Grid>
          <Grid item xs={12}>
            <CardsEvolucion
              datos={evolucion[lapsoEvol]}
              anioDestacado={ANIO_REAL}
            />
          </Grid>
        </Grid>
      )}

      {/* ── Modal ── */}
      <ModalEgresados
        open={modal.open}
        onClose={cerrarModal}
        titulo={modal.titulo}
        datos={modal.datos}
      />
    </Container>
  );
};

export default EgresadosAnioListado;
