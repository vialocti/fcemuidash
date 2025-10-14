import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';

/**
 * Componente auxiliar para renderizar el contenido de cada pestaña.
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ResumeAnio(data) {
  const yearlyTotals = data.reduce((accumulator, current) => {
    const { anio, cero = 0, una = 0, dos = 0, tres = 0, cuatro = 0, cinco = 0, seis = 0, siete = 0, ocho = 0, nueve = 0, nuevemas = 0 } = current;

    if (!accumulator[anio]) {
      accumulator[anio] = {
        anio: anio,
        cero: 0, una: 0, dos: 0, tres: 0, cuatro: 0, cinco: 0, seis: 0, siete: 0, ocho: 0, nueve: 0, nuevemas: 0
      };
    }

    accumulator[anio].cero += cero;
    accumulator[anio].una += una;
    accumulator[anio].dos += dos;
    accumulator[anio].tres += tres;
    accumulator[anio].cuatro += cuatro;
    accumulator[anio].cinco += cinco;
    accumulator[anio].seis += seis;
    accumulator[anio].siete += siete;
    accumulator[anio].ocho += ocho;
    accumulator[anio].nueve += nueve;
    accumulator[anio].nuevemas += nuevemas;

    return accumulator;
  }, {});

  const result = Object.values(yearlyTotals).sort((a, b) => (a.anio > b.anio ? 1 : -1));
  return result;
}

/**
 * Componente que renderiza una tabla de resumen y una sección de pestañas
 * con los detalles por carrera.
 */
const ReporteAprobadas = ({ data }) => {
  const [ingresantesData, setIngresantesData] = useState({ rows: [], totals: {} });
  const [detalleData, setDetalleData] = useState({});
  const [anios, setAnios] = useState([]);
  const [propuestas, setPropuestas] = useState([]);
  const [totales, setTotales] = useState([]);

  // pestaña "Todas" por defecto (índice 0)
  const [selectedTab, setSelectedTab] = useState(0);

  const materiasKeys = ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "nuevemas"];
  const materiasLabels = ["Cero", "Una", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Nueve+"];

  useEffect(() => {
    if (data && data.length > 0) {
      const aniosUnicos = [...new Set(data.map(item => item.anio))].sort();
      const propuestasUnicas = [...new Set(data.map(item => item.propuesta))].sort();
      setAnios(aniosUnicos);
      setPropuestas(propuestasUnicas);

      // --- Tabla de ingresantes ---
      const ingresantesMap = {};
      const totals = {};
      aniosUnicos.forEach(anio => totals[anio] = 0);

      propuestasUnicas.forEach(propuesta => {
        ingresantesMap[propuesta] = { propuesta };
        aniosUnicos.forEach(anio => {
          const entry = data.find(d => d.propuesta === propuesta && d.anio === anio);
          const totali = entry ? (entry.totali || 0) : 0;
          ingresantesMap[propuesta][anio] = totali;
          totals[anio] += totali;
        });
      });
      setIngresantesData({ rows: Object.values(ingresantesMap), totals });

      // --- Tabla de detalle ---
      const detalleMap = {};
      propuestasUnicas.forEach(propuesta => {
        detalleMap[propuesta] = {};
        materiasKeys.forEach(key => {
          detalleMap[propuesta][key] = {};
          aniosUnicos.forEach(anio => {
            const entry = data.find(d => d.propuesta === propuesta && d.anio === anio);
            if (entry) {
              const valor = entry[key] || 0;
              const porcentaje = entry.totali > 0 ? (valor / entry.totali) * 100 : 0;
              detalleMap[propuesta][key][anio] = { valor, porcentaje: Number(porcentaje).toFixed(2) };
            } else {
              detalleMap[propuesta][key][anio] = { valor: 0, porcentaje: '0.00' };
            }
          });
        });
      });
      setDetalleData(detalleMap);
    }

    if (data) {
      const resumen = ResumeAnio(data);
      setTotales(resumen);
    }
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (!data || data.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <Typography>No hay datos para mostrar.</Typography>
      </Box>
    );
  }

  // Construimos lista de tabs: Todas + propuestas
  const tabsLabels = ['Todas', ...propuestas];

  return (
    <Box sx={{ padding: 3 }}>
      {/* --- Tabla de Ingresantes --- */}
      <Typography variant="h5" gutterBottom>
        Tabla Comparativa de Ingresantes
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size='small' sx={{ minWidth: 650 }} aria-label="tabla de ingresantes">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Ingresantes</TableCell>
              {anios.map(anio => (
                <TableCell key={anio} align="center" sx={{ fontWeight: 'bold' }}>{anio}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ingresantesData.rows.map((row) => (
              <TableRow key={row.propuesta}>
                <TableCell component="th" scope="row">{row.propuesta}</TableCell>
                {anios.map(anio => (
                  <TableCell key={anio} align="center">{row[anio]}</TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Ingresantes</TableCell>
              {anios.map(anio => (
                <TableCell key={anio} align="center" sx={{ fontWeight: 'bold' }}>
                  {ingresantesData.totals[anio]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- SECCIÓN DE DETALLE CON PESTAÑAS (TODAS + PROPUESTAS) --- */}
      <Typography variant="h5" gutterBottom>
        Detalle por Cantidad de Materias Aprobadas (Discriminado por Propuestas)
      </Typography>

      <Paper sx={{ width: '100%', mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="pestañas de detalle por propuesta"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabsLabels.map((label, idx) => (
              <Tab
                label={label}
                key={label}
                id={`simple-tab-${idx}`}
                aria-controls={`simple-tabpanel-${idx}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* --- TAB: TODAS (index 0) --- */}
        <TabPanel value={selectedTab} index={0}>
          <TableContainer>
            <Table size='small' aria-label="tabla total general">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Aprobadas</TableCell>
                  {anios.map(anio => (
                    <TableCell key={anio} colSpan={2} align="center" sx={{ fontWeight: 'bold' }}>{anio}</TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell></TableCell>
                  {anios.map(anio => (
                    <React.Fragment key={anio}>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>%</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {materiasKeys
                  .filter(materiaKey => !anios.every(anio => (totales.find(t => t.anio === anio)?.[materiaKey] ?? 0) === 0))
                  .map(materiaKey => (
                    <TableRow key={`total-${materiaKey}`}>
                      <TableCell>{materiasLabels[materiasKeys.indexOf(materiaKey)]}</TableCell>
                      {anios.map(anio => {
                        const entry = totales.find(t => t.anio === anio) || {};
                        const valor = entry[materiaKey] ?? 0;
                        // total por año (suma de todas las claves de materias)
                        const totalAnio = materiasKeys.reduce((acc, k) => acc + (entry[k] ?? 0), 0);
                        const porcentaje = totalAnio > 0 ? ((valor / totalAnio) * 100).toFixed(2) : '0.00';
                        return (
                          <React.Fragment key={`total-${materiaKey}-${anio}`}>
                            <TableCell align="center">{valor}</TableCell>
                            <TableCell align="center">{porcentaje}%</TableCell>
                          </React.Fragment>
                        );
                      })}
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* --- TABS POR PROPUESTA (index 1..N) --- */}
        {propuestas.map((propuesta, index) => (
          <TabPanel value={selectedTab} index={index + 1} key={propuesta}>
            <TableContainer>
              <Table size='small' sx={{ minWidth: 750 }} aria-label={`tabla de detalle para ${propuesta}`}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Materias Aprobadas</TableCell>
                    {anios.map(anio => (
                      <TableCell key={anio} colSpan={2} align="center" sx={{ fontWeight: 'bold' }}>{anio}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow sx={{ backgroundColor: '#fafafa' }}>
                    <TableCell></TableCell>
                    {anios.map(anio => (
                      <React.Fragment key={anio}>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>%</TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materiasKeys
                    .filter(materiaKey => !anios.every(anio => (detalleData[propuesta]?.[materiaKey]?.[anio]?.valor ?? 0) === 0))
                    .map(materiaKey => (
                      <TableRow key={`${propuesta}-${materiaKey}`}>
                        <TableCell>{materiasLabels[materiasKeys.indexOf(materiaKey)]}</TableCell>
                        {anios.map(anio => (
                          <React.Fragment key={`${propuesta}-${materiaKey}-${anio}`}>
                            <TableCell align="center">{detalleData[propuesta]?.[materiaKey]?.[anio]?.valor ?? 'N/A'}</TableCell>
                            <TableCell align="center">{detalleData[propuesta]?.[materiaKey]?.[anio]?.porcentaje ?? 'N/A'}%</TableCell>
                          </React.Fragment>
                        ))}
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>

            {/* separador entre propuestas (solo visual) */}
            <Box sx={{ mt: 2 }}>
              <Divider />
            </Box>
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
};

export default ReporteAprobadas;
