import { useEffect, useState } from "react";
import { calcularaniolectivo } from '../../../utils/helpers/calcularanio';
import { traerAprobadasAluAnioHist } from "../../../services/servicesExamenes";
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  CircularProgress, 
  Card, 
  CardContent 
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// --- Funciones de Lógica (sin cambios) ---

const procesarDatos = (registro) => {
  if (!registro) return null;

  const orden = ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const valores = orden.map(k => registro[`ap_${k}`] ?? 0);

  const totalIngresantes = valores.reduce((acc, v) => acc + v, 0);
  const masDeUna = valores.slice(2).reduce((acc, v) => acc + v, 0);

  const menosDeDos = valores[0] + valores[1];

  return {
    totalIngresantes,
    masDeUna,
    masDeTres: valores.slice(4).reduce((acc, v) => acc + v, 0),
    menosDeDos,
    porcMasDeUna: totalIngresantes > 0 ? ((masDeUna / totalIngresantes) * 100).toFixed(1) : 0,
    porcMenosDeDos: totalIngresantes > 0 ? ((menosDeDos / totalIngresantes) * 100).toFixed(1) : 0,
  };
};

const generarResumenGeneral = (listaProcesada) => {
  const totalIngresantes = listaProcesada.reduce((acc, item) => acc + item.totalIngresantes, 0);
  const totalMasDeUna = listaProcesada.reduce((acc, item) => acc + item.masDeUna, 0);
  const totalMasDeTres = listaProcesada.reduce((acc, item) => acc + item.masDeTres, 0);
  const totalMenosDeDos = listaProcesada.reduce((acc, item) => acc + item.menosDeDos, 0);

  const porc = (v) => totalIngresantes > 0 ? ((v / totalIngresantes) * 100).toFixed(1) : 0;

  return {
    totalIngresantes,
    totalMasDeUna,
    totalMasDeTres,
    totalMenosDeDos,
    porcMasDeUna: porc(totalMasDeUna),
    porcMasDeTres: porc(totalMasDeTres),
    porcMenosDeDos: porc(totalMenosDeDos)
  };
};

// --- Función Auxiliar para el Color Condicional ---

/**
 * Retorna el color de fondo basado en la comparación del porcentaje de la carrera 
 * con el porcentaje general.
 * @param {string} porcCarrera - Porcentaje de la carrera (como string 'XX.X').
 * @param {string} porcGeneral - Porcentaje general (como string 'YY.Y').
 * @returns {string} Código de color de MUI (ej: 'success.light' o 'error.light').
 */
const getCardBackgroundColor = (porcCarrera, porcGeneral) => {
    // Convertir a número para la comparación
    const carrera = parseFloat(porcCarrera);
    const general = parseFloat(porcGeneral);

    if (carrera >= general) {
        // Verde claro si es igual o mayor
        return 'success.light'; // O 'success.light' para un verde más estándar de MUI
    } else {
        // Rojo claro si es menor
        return 'error.light';   // O 'error.light' para un rojo más estándar de MUI
    }
};


// --- Componente Principal (con cambios en el renderizado de Cards) ---

const EvolucionIngresantesTab = () => {
  const [anio, setAnio] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [datos, setDatos] = useState({
    dataCP: null,
    dataLA: null,
    dataLE: null,
    dataLLO: null,
    dataCPS: null,
    dataLLOE: null
  });

  useEffect(() => {
    setAnio(calcularaniolectivo());
  }, []);

  useEffect(() => {
    if (!anio) return;

    const cargarDatos = async () => {
      // Carga de datos...
      const r1 = await traerAprobadasAluAnioHist(1, 8, anio, anio);
      const r2 = await traerAprobadasAluAnioHist(1, 2, anio, anio);
      const r3 = await traerAprobadasAluAnioHist(1, 3, anio, anio);
      const r4 = await traerAprobadasAluAnioHist(1, 7, anio, anio);
      const r5 = await traerAprobadasAluAnioHist(2, 8, anio, anio);
      const r6 = await traerAprobadasAluAnioHist(4, 7, anio, anio);

      setDatos({
        dataCP: r1?.[0] || null,
        dataLA: r2?.[0] || null,
        dataLE: r3?.[0] || null,
        dataLLO: r4?.[0] || null,
        dataCPS: r5?.[0] || null,
        dataLLOE: r6?.[0] || null,
      });

      setLoaded(true);
    };

    cargarDatos();
  }, [anio]);

  if (!loaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Cargando datos...</Typography>
      </Box>
    );
  }

  // Preparación de datos
  const lista = [
    { label: "Contador Público (Mendoza)", reg: datos.dataCP },
    { label: "Lic. Administración (Mendoza)", reg: datos.dataLA },
    { label: "Lic. Economía (Mendoza)", reg: datos.dataLE },
    { label: "Lic. Logística (Mendoza)", reg: datos.dataLLO },
    { label: "Contador Público (San Rafael)", reg: datos.dataCPS },
    { label: "Lic. Logística (Este)", reg: datos.dataLLOE }
  ].filter(x => x.reg);

  // NOTA: procesarDatos ahora retorna también el porcentaje individual
  const procesados = lista.map(x => ({
    ...x,
    info: procesarDatos(x.reg)
  })).filter(x => x.info && x.info.totalIngresantes > 0); 

  const resumen = generarResumenGeneral(procesados.map(x => x.info));

  // Valor general de comparación (porcentaje de más de 1 materia aprobada)
  const porcGeneralMasDeUna = resumen.porcMasDeUna;

  // --- Renderizado con MUI ---
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Evolución de Ingresantes
      </Typography>

      <hr/>

      {/* --- RESUMEN GENERAL (sin cambios) --- */}
      <Paper 
        elevation={3} 
        sx={{
          p: 2,
          border: '2px solid #0066aa',
          bgcolor: 'primary.light',
          borderRadius: 2,
          mb: 1
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom color="primary.dark">
          📈 Resumen General
        </Typography>

        <Grid container spacing={2}>
          {/* Total ingresantes */}
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard 
                icon={<GroupIcon color="primary" sx={{ fontSize: 40 }} />}
                title="Total Ingresantes"
                value={resumen.totalIngresantes}
                details=""
            />
          </Grid>
          {/* Más de 1 materia (USADO PARA COMPARACIÓN) */}
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard 
                icon={<CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />}
                title="2 y 3 Materias Aprobadas"
                value={resumen.totalMasDeUna - resumen.totalMasDeTres}
                details={`(${(resumen.porcMasDeUna - resumen.porcMasDeTres).toFixed(2)}%)`}
            />
          </Grid>
          {/* Al menos 4 materias */}
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard 
                icon={<TrendingUpIcon color="info" sx={{ fontSize: 40 }} />}
                title="Al menos 4 materias"
                value={resumen.totalMasDeTres}
                details={`(${resumen.porcMasDeTres}%)`}
            />
          </Grid>
          {/* 0 o 1 materias */}
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCard 
                icon={<TrendingDownIcon color="error" sx={{ fontSize: 40 }} />}
                title="0 o 1 materias"
                value={resumen.totalMenosDeDos}
                details={`(${resumen.porcMenosDeDos}%)`}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* --- CARDS POR CARRERA (CON FORMATO CONDICIONAL) --- */}
      <Typography variant="h5" component="h2" gutterBottom>
        Detalle por Carrera
      </Typography>
      <Grid container spacing={3}>
        {procesados.map((item, idx) => {
            
            // Determinar el color de fondo
            const bgColor = getCardBackgroundColor(
                item.info.porcMasDeUna,
                porcGeneralMasDeUna
            );

            return (
            <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card 
                    variant="outlined" 
                    sx={{ 
                        minHeight: 200, 
                        // Aplicar el color de fondo condicional
                        bgcolor: bgColor, 
                        borderColor: bgColor === 'error.light' ? 'error.main' : 'success.main',
                        borderWidth: 2,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" component="h3" color="text.secondary" gutterBottom>
                            {item.label}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Total ingresantes:</strong> {item.info.totalIngresantes}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {/* Mostrar el porcentaje al lado del valor para mejor contexto */}
                            <strong>2 o mas aprobadas:</strong> {item.info.masDeUna} ({item.info.porcMasDeUna}%)
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ mb: 1, color: bgColor === 'error.light' ? 'error.main' : 'success.main' }}>
                            {/* Mensaje para el usuario */}
                            {item.info.porcMasDeUna < porcGeneralMasDeUna
                                ? `⚠️ Por debajo del general (${porcGeneralMasDeUna}%)`
                                : `✅ En o por encima del general (${porcGeneralMasDeUna}%)`
                            }
                        </Typography>
                        <Typography variant="body2">
                            <strong>Promocionados a 2do:</strong> {item.info.masDeTres}
                        </Typography>
                        <Typography variant="body2">
                            <strong>0 o 1 materias aprobadas:</strong> {item.info.menosDeDos} ({item.info.porcMenosDeDos}%)
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            );
        })}
        {procesados.length === 0 && (
            <Grid item xs={12}>
                <Typography variant="body1" align="center" sx={{ p: 3 }}>
                    No hay datos de ingresantes para el año {anio}.
                </Typography>
            </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default EvolucionIngresantesTab;

// --- Componente Auxiliar SummaryCard (sin cambios) ---

const SummaryCard = ({ icon, title, value, details }) => (
    <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'white' }}>
        <Box sx={{ mr: 2 }}>{icon}</Box>
        <Box>
            <Typography variant="subtitle2" color="text.secondary">
                {title}
            </Typography>
            <Typography variant="h5" component="div" sx={{ lineHeight: 1 }}>
                {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {details}
            </Typography>
        </Box>
    </Paper>
);