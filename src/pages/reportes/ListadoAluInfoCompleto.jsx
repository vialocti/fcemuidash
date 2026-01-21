import { useEffect, useState } from "react";
import {
  TextField, MenuItem, Select, InputLabel, FormControl, Button,
  Container, Grid, Box, Typography, Table, TableHead, TableCell,
  TableBody, TableRow, Card, CardContent, Divider, OutlinedInput,
  TableContainer, Alert, Snackbar, Paper, Tabs, Tab
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import SpeedIcon from '@mui/icons-material/Speed';
import DateRangeIcon from '@mui/icons-material/DateRange';

import ReportesListadoAlumnosInfo from "../../components/reportes/ReportesListadoAlumnosInfo";

const ListadoAluInfoCompleto = () => {
  const [modoBusqueda, setModoBusqueda] = useState(0);

  // Estados comunes
  const [propuesta, setPropuesta] = useState([]);

  // Estados Modo 0 (Año/Materias)
  const [anioI, setAnioI] = useState("2024");
  const [materias, setMaterias] = useState("9");

  // Estados Modo 1 (Rango de Coeficiente)
  const [coefDesde, setCoefDesde] = useState("0.90");
  const [coefHasta, setCoefHasta] = useState("1.00");

  const [parametrosConsulta, setParametrosConsulta] = useState(null);
  const [alerta, setAlerta] = useState({ abierto: false, mensaje: "", tipo: "warning" });

  const opcionesPropuestas = [
    { label: "CONTADOR PUBLICO", value: "8" },
    { label: "LIC.ADMINISTRACION", value: "2" },
    { label: "LIC. ECONOMIA", value: "3" },
    { label: "LIC. LOGISTICA", value: "7" },
  ];

  const handlePropuestaChange = (event) => {
    const { target: { value } } = event;
    setPropuesta(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = () => {
    if (propuesta.length === 0) {
      setAlerta({ abierto: true, mensaje: "Seleccione al menos una Propuesta.", tipo: "warning" });
      return;
    }

    const baseData = {
      propuestas: propuesta.join(","),
      modo: modoBusqueda === 0 ? 'MATERIAS' : 'VELOCIDAD'
    };

    if (modoBusqueda === 0) {
      if (!anioI) return setAlerta({ abierto: true, mensaje: "Ingrese un año válido.", tipo: "warning" });
      setParametrosConsulta({ ...baseData, anio: anioI, matap: materias });
    } else {
      // Validación de Rango
      if (parseFloat(coefDesde) > parseFloat(coefHasta)) {
        return setAlerta({ abierto: true, mensaje: "El valor 'Desde' no puede ser mayor que 'Hasta'.", tipo: "error" });
      }
      setParametrosConsulta({ ...baseData, desde: coefDesde, hasta: coefHasta });
    }
    setAlerta({ abierto: false, mensaje: "", tipo: "success" });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Snackbar
        open={alerta.abierto}
        autoHideDuration={5000}
        onClose={() => setAlerta({ ...alerta, abierto: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alerta.tipo} variant="filled">{alerta.mensaje}</Alert>
      </Snackbar>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <Box sx={{ bgcolor: 'primary.main', p: 1.5, color: 'white' }}>
              <Typography variant="h6" textAlign="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                Rendimiento Académico
              </Typography>
              <Tabs
                value={modoBusqueda}
                onChange={(e, v) => setModoBusqueda(v)}
                centered
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Tab icon={<DateRangeIcon />} label="Año e Ingreso" />
                <Tab icon={<SpeedIcon />} label="Rango Coeficiente" />
              </Tabs>
            </Box>

            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Propuestas</InputLabel>
                    <Select
                      multiple
                      value={propuesta}
                      onChange={handlePropuestaChange}
                      input={<OutlinedInput label="Propuestas" />}
                      renderValue={(selected) => {

                        const labels = {
                          2: 'LA',
                          3: 'LE',
                          7: 'LLO',
                          8: 'CP'
                        };


                        return selected.map(val => labels[val] || val).join(', ');
                      }}
                    >
                      {opcionesPropuestas.map((op) => (
                        <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {modoBusqueda === 0 ? (
                  <>
                    <Grid item xs={6} md={2}>
                      <TextField fullWidth size="small" label="Año" type="number" value={anioI} onChange={(e) => setAnioI(e.target.value)} />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField fullWidth size="small" label="Mín. Aprob." type="number" value={materias} onChange={(e) => setMaterias(e.target.value)} />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={6} md={2}>
                      <TextField
                        fullWidth size="small" label="Desde" type="number"
                        inputProps={{ step: "0.01", min: "0.6" }}
                        value={coefDesde} onChange={(e) => setCoefDesde(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        fullWidth size="small" label="Hasta" type="number"
                        inputProps={{ step: "0.01", max: "10" }}
                        value={coefHasta} onChange={(e) => setCoefHasta(e.target.value)}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} md={2}>
                  <Button fullWidth variant="contained" onClick={handleSubmit} startIcon={<SearchIcon />} sx={{ height: 40 }}>
                    Consultar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card elevation={2} sx={{ borderRadius: 3, borderLeft: '5px solid #ffa000', height: '100%' }}>
            <Box sx={{ p: 1, px: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#fff9c4' }}>
              <InfoIcon sx={{ color: '#ffa000' }} fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Referencia Materias</Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {[{ p: 'CP', v: [9, 19, 28, 38, 46] }, { p: 'LA', v: [9, 18, 28, 37, 46] }, { p: 'LE', v: [9, 18, 26, 34, 42] }, { p: 'LLO-T', v: [8, 15, 26, 36] }, { p: 'LLO', v: [10, 20, 30, 40] }].map((row) => (
                    <TableRow key={row.p}>
                      <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}><b>{row.p}</b></TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}>1º: {row.v[0]}</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}>2º: {row.v[1]}</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}>3º: {row.v[2]}</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}>4º: {row.v[3]}</TableCell>
                      <TableCell sx={{ fontSize: '0.65rem', py: 0.5 }}>5º: {row.v[4]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid item xs={12}>
          {parametrosConsulta ? (
            <ReportesListadoAlumnosInfo filtros={parametrosConsulta} />
          ) : (
            <Paper variant="outlined" sx={{ textAlign: 'center', py: 8, bgcolor: '#fafafa', borderStyle: 'dashed' }}>
              <Typography color="text.secondary">Configure los criterios y consulte.</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListadoAluInfoCompleto;