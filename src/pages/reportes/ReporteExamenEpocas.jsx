
import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Button, Grid, Typography, Box } from "@mui/material";
import { traerEpocasExamen, traeResultadosMesasPeriodo, traerResultadoTurno } from "../../services/servicesExamenes";
import ExamenesAnalysis from "../../components/examenes/ExamenesAnalisys";

const ReporteExamenEpocas = () => {
  const ubicaciones = [
    { value: '1', label: 'MZA' },
    { value: '2', label: 'SR' },
    { value: '3', label: 'GA' },
    { value: '4', label: 'ESTE' },
    { value: '5', label: 'FCE' }
  ];

  const currentYear = new Date().getFullYear();
  const [yearInicio, setYearInicio] = useState("");
  const [yearFinal, setYearFinal] = useState("");
  const [periodo, setPeriodo] = useState("T");
  const [ubicacion, setUbicacion] = useState('');
  const [datosComparativa, setDatosComparativa] = useState(null);
  const [error, setError] = useState("");

  // Función para obtener datos de un año dado
  const fetchDataForYear = async (year) => {
    try {
      // Obtener epocas del año
      const epocas = await traerEpocasExamen(year);
      let turnoData;
      if (periodo !== 'T') {
        turnoData = epocas.find(element => element.epoca === periodo);
      } else {
        // Si es el año completo, se toma el primer registro
        turnoData = epocas[0];
      }
      if (!turnoData) {
        throw new Error(`No se encontró datos para el período seleccionado en el año ${year}`);
      }
      // Obtener mesas
      const responseMesas = await traeResultadosMesasPeriodo(year, turnoData.periodos, ubicacion || 1);
      // Construir el string con los llamados
      const llamadoMesasString = responseMesas.map(mesa => mesa.llamado_mesa).join(',');
      // Obtener resultados
      const resultados = await traerResultadoTurno(llamadoMesasString);
      const resultadosMap = { A: 0, R: 0, U: 0 };
      resultados.forEach(item => {
        resultadosMap[item.resultado] = parseInt(item.total, 10) || 0;
      });
      return { year, stats: resultadosMap };
    } catch (error) {
      console.error("Error al obtener datos para el año", year, error);
      return { year, stats: null, error: error.message };
    }
  };

  const handleGenerarReporte = async () => {
    setError("");
    // Validar que se hayan seleccionado ambos años
    if (!yearInicio || !yearFinal) {
      setError("Seleccione ambos años: inicio y final.");
      return;
    }
    const inicio = parseInt(yearInicio, 10);
    const final = parseInt(yearFinal, 10);
    if (inicio >= final) {
      setError("El año de inicio debe ser menor que el año final.");
      return;
    }
    const numYears = final - inicio + 1;
    if (numYears < 2 || numYears > 5) {
      setError("La comparación debe incluir entre 2 y 5 años.");
      return;
    }

    // Recorrer el rango de años
    const datos = [];
    for (let y = inicio; y <= final; y++) {
      const dataYear = await fetchDataForYear(y);
      if (dataYear.stats) {
        datos.push(dataYear);
      }
    }
    setDatosComparativa(datos);
  };

  return (
    <Grid container spacing={2 }style={{marginTop:10, paddingInline:4}} alignItems="center" >
      <Grid item xs={12}>
        <Typography variant="h4" style={{padding:12}}>Reporte de Resultados de Exámenes Turnos - Comparativa entre Años</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Año Inicio</InputLabel>
          <Select value={yearInicio} onChange={(e) => setYearInicio(e.target.value)}>
            {[...Array(10)].map((_, i) => {
              const yearOption = currentYear - i;
              return (
                <MenuItem key={i} value={yearOption}>
                  {yearOption}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Año Final</InputLabel>
          <Select value={yearFinal} onChange={(e) => setYearFinal(e.target.value)}>
            <MenuItem value="">
              <em>(Opcional)</em>
            </MenuItem>
            {[...Array(10)].map((_, i) => {
              const yearOption = currentYear - i;
              return (
                <MenuItem key={i} value={yearOption}>
                  {yearOption}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel id="ubicacion-label">Ubicación</InputLabel>
          <Select
            labelId="ubicacion-label"
            id="ubicacionSelect"
            value={ubicacion}
            label="Ubicación"
            onChange={(e) => setUbicacion(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una ubicación</em>
            </MenuItem>
            {ubicaciones.map((ubi, index) => (
              <MenuItem key={index} value={ubi.value}>
                {ubi.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Período</InputLabel>
          <Select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            {/* <MenuItem value="T">Año Completo</MenuItem> */}
            <MenuItem value="I">Junio-Agosto</MenuItem>
            <MenuItem value="M">Noviembre-Diciembre</MenuItem>
            <MenuItem value="F">Febrero-Marzo</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleGenerarReporte}>
          Generar Reporte
        </Button>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Typography color="error">{error}</Typography>
        </Grid>
      )}
      {datosComparativa ? (
        <ExamenesAnalysis datosComparativa={datosComparativa} periodo={periodo} />
      ) : <>
            <hr />
          <Box>

            <Typography variant="h5">El Año inicial debe ser menor que el Año final</Typography>
            <Typography variant="h5">Podemos comparar entre tres periodos definidos </Typography>
          </Box>
      </>}
    </Grid>
  );
};

export default ReporteExamenEpocas;
