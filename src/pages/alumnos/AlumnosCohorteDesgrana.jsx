import React, { useState, useMemo } from "react";
import {
  Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Select,
  Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
  Collapse, IconButton, Chip, Tooltip as MuiTooltip, Tabs, Tab
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from "recharts";

import { traerEvolucionCohorteDetallada } from "../../services/servicesProcesos.js";


const COLORES_CURSADA = {
  1: "#2196F3", 2: "#4CAF50", 3: "#FF9800", 4: "#9C27B0", 5: "#F44336",
};

const nombresCarrera = {
  "1": "Contador Pub.Nacional", "2": "Lic.Administración", "3": "Lic.Economía",
  "6": "Lic.Gestión Neg.Regionales", "7": "Lic.Logística", "8": "Contador Público",
};
const nombresSede = { "1": "Mendoza", "2": "San Rafael", "3": "Gral.Alvear", "4": "Sede Este" };

// ─────────────────────────────────────────────────────────────
// Fila expandible de la tabla principal
// ─────────────────────────────────────────────────────────────
const FilaEvolucion = ({ fila, cohorteInicial }) => {
  const [abierto, setAbierto] = useState(false);

  const suma = fila.activos_total + fila.pasivos_acumulados + fila.egresados_acumulados;
  const sinClasificar = cohorteInicial - suma;
  const cuadra = sinClasificar === 0;
  const pctActivos = ((fila.activos_total / cohorteInicial) * 100).toFixed(1);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setAbierto(!abierto)}>
            {abierto ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell><strong>{fila.anio}</strong></TableCell>
        <TableCell align="right">{fila.activos_total}</TableCell>
        <TableCell align="right">{pctActivos}%</TableCell>
        <TableCell align="right">{fila.pasivos_del_anio}</TableCell>
        <TableCell align="right">{fila.pasivos_acumulados}</TableCell>
        <TableCell align="right">{fila.egresados_anio}</TableCell>
        <TableCell align="right">{fila.egresados_acumulados}</TableCell>
        <TableCell align="right" sx={{ color: sinClasificar !== 0 ? "warning.main" : "inherit" }}>
          {sinClasificar}
        </TableCell>
        <TableCell align="right"><strong>{suma + sinClasificar}</strong></TableCell>
        <TableCell align="center">
          <MuiTooltip title={cuadra ? "Totales cuadran con la cohorte" : `Diferencia: ${sinClasificar}`}>
            {cuadra
              ? <CheckCircleIcon fontSize="small" sx={{ color: "success.main" }} />
              : <WarningAmberIcon fontSize="small" sx={{ color: "warning.main" }} />}
          </MuiTooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={11} sx={{ py: 0, borderBottom: abierto ? 1 : 0 }}>
          <Collapse in={abierto} timeout="auto" unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Distribución por año de cursada — {fila.anio}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    ACTIVOS ({fila.activos_total})
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
                    {Object.entries(fila.activos_por_cursada || {})
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([anioC, cant]) => (
                        <Chip key={anioC} label={`${anioC}° año: ${cant}`} size="small"
                          sx={{ bgcolor: COLORES_CURSADA[anioC], color: "white" }} />
                      ))}
                    {Object.keys(fila.activos_por_cursada || {}).length === 0 && (
                      <Typography variant="caption" color="text.disabled">sin datos</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    PASIVOS DEL AÑO ({fila.pasivos_del_anio}) — año de cursada alcanzado
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.5 }}>
                    {Object.entries(fila.pasivos_por_cursada || {})
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([anioC, cant]) => (
                        <Chip key={anioC} label={`${anioC}° año: ${cant}`} size="small" variant="outlined"
                          sx={{ borderColor: COLORES_CURSADA[anioC], color: COLORES_CURSADA[anioC] }} />
                      ))}
                    {Object.keys(fila.pasivos_por_cursada || {}).length === 0 && (
                      <Typography variant="caption" color="text.disabled">sin datos</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────
const AlumnosCohorteEvolucion = () => {
  const [anioI, setAnioI] = useState(2021);
  const [anioFC, setAnioFC] = useState(2026);
  const [sede, setSede] = useState("1");
  const [carrera, setCarrera] = useState("8");
  const [tipoI] = useState(1);
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [tabTabla, setTabTabla] = useState(0);
  const [tabGrafico, setTabGrafico] = useState(0);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "anioI") setAnioI(value);
    else if (name === "anioFC") setAnioFC(value);
    else if (name === "sede") setSede(value);
    else if (name === "propuesta") setCarrera(value);
  };

  const buscar = async () => {
    if (Number(anioI) <= 2014 || Number(anioFC) < Number(anioI)) return;
    setCargando(true);
    const resp = await traerEvolucionCohorteDetallada(anioI, sede, carrera, anioFC, tipoI);
    setData(resp);
    setCargando(false);
  };

  // Años de cursada presentes en activos
  const aniosCursadaPresentes = useMemo(() => {
    if (!data?.evolucion) return [];
    const set = new Set();
    data.evolucion.forEach((f) => {
      Object.keys(f.activos_por_cursada || {}).forEach((k) => set.add(Number(k)));
    });
    return [...set].sort();
  }, [data]);

  // Años de cursada presentes en pasivos
  const aniosCursadaPasivos = useMemo(() => {
    if (!data?.evolucion) return [];
    const set = new Set();
    data.evolucion.forEach((f) => {
      Object.keys(f.pasivos_por_cursada || {}).forEach((k) => set.add(Number(k)));
    });
    return [...set].sort();
  }, [data]);

  // Datos para gráfico de activos por año de cursada (barras apiladas)
  const datosGraficoActivos = useMemo(() => {
    if (!data?.evolucion) return [];
    return data.evolucion.map((fila) => {
      const base = { anio: fila.anio };
      for (let i = 1; i <= 5; i++) {
        base[`año${i}`] = fila.activos_por_cursada?.[i] || 0;
      }
      return base;
    });
  }, [data]);

  // Datos para gráfico de pasivos por año de cursada (barras apiladas)
  const datosGraficoPasivos = useMemo(() => {
    if (!data?.evolucion) return [];
    return data.evolucion.map((fila) => {
      const base = { anio: fila.anio };
      for (let i = 1; i <= 5; i++) {
        base[`año${i}`] = fila.pasivos_por_cursada?.[i] || 0;
      }
      return base;
    });
  }, [data]);

  // Datos para gráfico de evolución global (líneas)
  const datosEvolucionGlobal = useMemo(() => {
    if (!data?.evolucion) return [];
    return data.evolucion.map((fila) => ({
      anio: fila.anio,
      Activos: fila.activos_total,
      "Pasivos acum.": fila.pasivos_acumulados,
      "Egresados acum.": fila.egresados_acumulados,
    }));
  }, [data]);

  // Tabla pivot activos
  const tablaPivotActivos = useMemo(() => {
    if (!data?.evolucion) return { filas: [], columnas: [] };
    const columnas = aniosCursadaPresentes;
    const filas = data.evolucion.map((fila) => {
      const row = { anio: fila.anio, total: fila.activos_total };
      columnas.forEach((c) => { row[c] = fila.activos_por_cursada?.[c] || 0; });
      return row;
    });
    return { filas, columnas };
  }, [data, aniosCursadaPresentes]);

  // Tabla pivot pasivos
  const tablaPivotPasivos = useMemo(() => {
    if (!data?.evolucion) return { filas: [], columnas: [] };
    const columnas = aniosCursadaPasivos;
    const filas = data.evolucion.map((fila) => {
      const row = { anio: fila.anio, total: fila.pasivos_del_anio };
      columnas.forEach((c) => { row[c] = fila.pasivos_por_cursada?.[c] || 0; });
      return row;
    });
    return { filas, columnas };
  }, [data, aniosCursadaPasivos]);

  // Helper celda coloreada
  const celdaCursada = (valor, anioCursada) => (
    <TableCell
      align="right"
      sx={{
        bgcolor: valor > 0 ? `${COLORES_CURSADA[anioCursada]}15` : "transparent",
        color: valor > 0 ? COLORES_CURSADA[anioCursada] : "text.disabled",
        fontWeight: valor > 0 ? 600 : 400,
      }}
    >
      {valor}
    </TableCell>
  );

  return (
    <Container maxWidth={false} sx={{ width: "95%", py: 2 }}>
      {/* ───────── Filtros ───────── */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: "beige" }}>
        <Typography variant="h6" sx={{ bgcolor: "primary.main", color: "white", p: 1, borderRadius: 1, textAlign: "center", mb: 2 }}>
          Evolución Detallada de Cohorte
        </Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={6} md={1.5}>
            <InputLabel>Año Ingreso</InputLabel>
            <TextField variant="standard" name="anioI" value={anioI} onChange={onHandleChange} fullWidth />
          </Grid>
          <Grid item xs={6} md={1.5}>
            <InputLabel>Año Hasta</InputLabel>
            <TextField variant="standard" name="anioFC" value={anioFC} onChange={onHandleChange} fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputLabel>Sede</InputLabel>
            <Select variant="standard" name="sede" value={sede} onChange={onHandleChange} fullWidth>
              <MenuItem value="1">Mendoza</MenuItem>
              <MenuItem value="2">San Rafael</MenuItem>
              <MenuItem value="3">Gral.Alvear</MenuItem>
              <MenuItem value="4">Este</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel>Propuesta</InputLabel>
            <Select variant="standard" name="propuesta" value={carrera} onChange={onHandleChange} fullWidth>
              <MenuItem value="2">LIC. EN ADMINISTRACIÓN</MenuItem>
              <MenuItem value="3">LIC. EN ECONOMÍA</MenuItem>
              <MenuItem value="7">LIC. EN LOGÍSTICA</MenuItem>
              <MenuItem value="8">CONTADOR PÚBLICO</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" onClick={buscar} disabled={cargando} fullWidth>
              {cargando ? "Cargando..." : "Buscar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {data && (
        <>
          {/* ───────── Resumen cohorte ───────── */}
          <Paper sx={{ p: 2, mb: 2, bgcolor: "beige" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography><strong>Sede:</strong> {nombresSede[sede]}</Typography>
                <Typography><strong>Carrera:</strong> {nombresCarrera[carrera]}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography><strong>Año ingreso:</strong> {data.anio_ingreso}</Typography>
                <Typography><strong>Cohorte inicial:</strong> {data.cohorte_inicial}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                {data.evolucion?.length > 0 && (
                  <>
                    <Typography><strong>Activos últ. año:</strong> {data.evolucion.at(-1).activos_total}</Typography>
                    <Typography><strong>Egresados acum.:</strong> {data.evolucion.at(-1).egresados_acumulados}</Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>

          {/* ───────── Tabs de TABLAS ───────── */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Tabs
              value={tabTabla}
              onChange={(_, v) => setTabTabla(v)}
              sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
            >
              <Tab label="Evolución cohorte" />
              <Tab label="Activos por año cursada" />
              <Tab label="Pasivos por año cursada" />
            </Tabs>

            {/* Tab 0: Evolución cohorte (tabla expandible) */}
            {tabTabla === 0 && (
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Click en la flecha para ver distribución por año de cursada
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell width={40} />
                      <TableCell>Año</TableCell>
                      <TableCell align="right">Activos</TableCell>
                      <TableCell align="right">% s/cohorte</TableCell>
                      <TableCell align="right">Pasivos año</TableCell>
                      <TableCell align="right">Pasivos acum.</TableCell>
                      <TableCell align="right">Egres. año</TableCell>
                      <TableCell align="right">Egres. acum.</TableCell>
                      <TableCell align="right">Sin clasif.</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">OK</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.evolucion.map((fila) => (
                      <FilaEvolucion key={fila.anio} fila={fila} cohorteInicial={data.cohorte_inicial} />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {/* Tab 1: Tabla activos */}
            {tabTabla === 1 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Activos por año calendario × año de cursada
                </Typography>
                {tablaPivotActivos.columnas.length === 0 ? (
                  <Typography color="text.secondary">Sin datos de activos</Typography>
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Año</strong></TableCell>
                        {tablaPivotActivos.columnas.map((c) => (
                          <TableCell key={c} align="right" sx={{ color: COLORES_CURSADA[c], fontWeight: 700 }}>
                            {c}° año
                          </TableCell>
                        ))}
                        <TableCell align="right"><strong>Total</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablaPivotActivos.filas.map((f) => (
                        <TableRow key={f.anio} hover>
                          <TableCell><strong>{f.anio}</strong></TableCell>
                          {tablaPivotActivos.columnas.map((c) => (
                            <React.Fragment key={c}>{celdaCursada(f[c], c)}</React.Fragment>
                          ))}
                          <TableCell align="right"><strong>{f.total}</strong></TableCell>
                        </TableRow>
                      ))}
                    
                    </TableBody>
                  </Table>
                )}
              </Box>
            )}

            {/* Tab 2: Tabla pasivos */}
            {tabTabla === 2 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Pasivos (del año) por año calendario × año de cursada alcanzado
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Muestra en qué año de cursada estaban al momento de abandonar.
                </Typography>
                {tablaPivotPasivos.columnas.length === 0 ? (
                  <Typography color="text.secondary">Sin datos de pasivos</Typography>
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Año</strong></TableCell>
                        {tablaPivotPasivos.columnas.map((c) => (
                          <TableCell key={c} align="right" sx={{ color: COLORES_CURSADA[c], fontWeight: 700 }}>
                            {c}° año
                          </TableCell>
                        ))}
                        <TableCell align="right"><strong>Total</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablaPivotPasivos.filas.map((f) => (
                        <TableRow key={f.anio} hover>
                          <TableCell><strong>{f.anio}</strong></TableCell>
                          {tablaPivotPasivos.columnas.map((c) => (
                            <React.Fragment key={c}>{celdaCursada(f[c], c)}</React.Fragment>
                          ))}
                          <TableCell align="right"><strong>{f.total}</strong></TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ bgcolor: "grey.100" }}>
                        <TableCell><strong>Total</strong></TableCell>
                        {tablaPivotPasivos.columnas.map((c) => {
                          const total = tablaPivotPasivos.filas.reduce((s, f) => s + f[c], 0);
                          return (
                            <TableCell key={c} align="right" sx={{ color: COLORES_CURSADA[c], fontWeight: 700 }}>
                              {total}
                            </TableCell>
                          );
                        })}
                        <TableCell align="right"><strong>
                          {tablaPivotPasivos.filas.reduce((s, f) => s + f.total, 0)}
                        </strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </Box>
            )}
          </Paper>

          {/* ───────── Tabs de GRÁFICOS ───────── */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Tabs
              value={tabGrafico}
              onChange={(_, v) => setTabGrafico(v)}
              sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
            >
              <Tab label="Evolución cohorte" />
              <Tab label="Activos por año cursada" />
              <Tab label="Pasivos por año cursada" />
            </Tabs>

            {/* Gráfico 0: evolución cohorte (líneas) */}
            {tabGrafico === 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Evolución de activos, pasivos acumulados y egresados acumulados
                </Typography>
                <Box sx={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <LineChart data={datosEvolucionGlobal}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="anio" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Activos" stroke="#2196F3" strokeWidth={2} />
                      <Line type="monotone" dataKey="Pasivos acum." stroke="#F44336" strokeWidth={2} />
                      <Line type="monotone" dataKey="Egresados acum." stroke="#4CAF50" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            )}

            {/* Gráfico 1: activos por año cursada (barras apiladas) */}
            {tabGrafico === 1 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Activos distribuidos por año de cursada
                </Typography>
                <Box sx={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart data={datosGraficoActivos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="anio" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {aniosCursadaPresentes.map((n) => (
                        <Bar key={n} dataKey={`año${n}`} stackId="a" fill={COLORES_CURSADA[n]} name={`${n}° año`} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            )}

            {/* Gráfico 2: pasivos por año cursada (barras apiladas) */}
            {tabGrafico === 2 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Pasivos (del año) distribuidos por año de cursada alcanzado
                </Typography>
                <Box sx={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart data={datosGraficoPasivos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="anio" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {aniosCursadaPasivos.map((n) => (
                        <Bar key={n} dataKey={`año${n}`} stackId="a" fill={COLORES_CURSADA[n]} name={`${n}° año`} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            )}
          </Paper>

          {/* ───────── Referencias ───────── */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Interpretación</Typography>
                <Typography variant="body2">
                  <strong>Activos</strong>: reinscriptos ese año calendario.<br />
                  <strong>Pasivos del año</strong>: alumnos cuya última reinscripción fue el año anterior y no volvieron (sin egresar).<br />
                  <strong>Pasivos acum.</strong>: cohorte menos activos menos egresados (deserción total a la fecha).<br />
                  <strong>Sin clasificar</strong>: diferencia entre la cohorte inicial y la suma de las tres categorías. Si es &gt; 0, revisar datos.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Años de cursada</Typography>
                <Typography variant="body2">
                  El año de cursada se calcula según las materias aprobadas al 31 de marzo de cada año, aplicando las reglas del plan de estudios correspondiente. Un alumno puede estar en 2° año calendario pero seguir en 1° de cursada si no aprobó las materias mínimas para promover.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default AlumnosCohorteEvolucion;