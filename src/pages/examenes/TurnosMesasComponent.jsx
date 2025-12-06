import {
  
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { traeResultadosMesasPeriodo, traerPeriodosExamen, traerResultadoTurno } from '../../services/servicesExamenes';

import ReporteResultadoExamen from '../../components/reportes/ReporteResultadoExamen';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';

// Opciones de año (puedes obtenerlas de otra fuente o pasarlas como prop)
const years = [2019,2020,2021,2022, 2023, 2024,2025,2026,2027,2028,2029,2030,2031];

// Opciones fijas para ubicaciones
const ubicaciones = [
  { value: '1', label: 'MZA' },
  { value: '2', label: 'SR' },
  { value: '3', label: 'GA' },
  { value: '4', label: 'ESTE'}
];

const TurnosMesasComponent = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [selectedTurnoPeriodo, setSelectedTurnoPeriodo] = useState('');
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [mesas, setMesas] = useState([]);
  const [mesallamado, setMesallanada] = useState('');
  const [muestra, setMuestra]=useState(false)
  const [llamados, setLlamados]=useState('')
  const [resultados, setResultados]=useState(0)
  const [datosmesa, setDatosmesa]=useState(null)

  // Cuando cambia el año, se llama a getTurnosMesaAni
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
       
        const response = await  traerPeriodosExamen(selectedYear) 
        //console.log(response)
        setTurnos(response);
        setSelectedTurnoPeriodo(''); // reiniciar turno
        setMesas([]); // reiniciar mesas
      } catch (error) {
        console.error('Error al obtener turnos:', error);
      }
    };
    if (selectedYear) {
      fetchTurnos();
    }
  }, [selectedYear]);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
  
        const response = await traerResultadoTurno(llamados)
        //console.log(response)
        const resultadosMap = {
          A: 0,
          R: 0,
          U: 0,
        };
    
        // Recorrer el array y llenar los totales
        response.forEach(item => {
          resultadosMap[item.resultado] = parseInt(item.total, 10) || 0;
        });
        //console.log(resultadosMap)
    
        setResultados(resultadosMap);
      } catch (error) {
        console.error('Error al obtener turnos:', error);
      }
    };
    if (llamados) {
      fetchResultados();
    }
    //console.log(llamados)
  }, [llamados]);

  

  useEffect(() => {
   
    const fetchMesas = async () => {
   
      try {
       
        console.log(selectedYear,selectedTurnoPeriodo,selectedUbicacion)
        const response = await traeResultadosMesasPeriodo(selectedYear,selectedTurnoPeriodo,selectedUbicacion)
        //console.log(response)
        setDatosmesa(response);
     
        const mesasData = response;

        // Construir el string con los llamado_mesa separados por comas
        const llamadoMesasString = mesasData
          .map(mesa => mesa.llamado_mesa) // Extrae el llamado_mesa
          .join(','); // Une los valores con comas
    
       setLlamados(llamadoMesasString)
      
      } catch (error) {
        console.error('Error al obtener mesas:', error);
      }
    // Construir el string con los llamado_mesa separados por comas
    }

    if (selectedYear && selectedTurnoPeriodo && selectedUbicacion) {
      setResultados(null)
      fetchMesas();
    }
  }, [selectedYear, selectedTurnoPeriodo, selectedUbicacion]);

 
 const turnosAvailable = selectedYear && turnos.length > 0;
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Paper elevation={4} sx={{ p: 3, borderRadius: 2, borderLeft: '5px solid #1976d2' }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        {/* Ícono llamativo y color principal */}
        <CalendarToday color="primary" sx={{ fontSize: 30 }} />
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1976d2' }}>
          Consulta de Resultados de Turno Exámenes 
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={4}>
        
        {/* Selección de Año */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="year-label">Año Lectivo</InputLabel>
            <Select
              labelId="year-label"
              id="yearSelect"
              value={selectedYear}
              label="Año Lectivo"
              onChange={(e) => {
                setSelectedYear(e.target.value);
                // Aquí irían tus setters
              }}
              startAdornment={
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <CalendarToday sx={{ color: 'action.active' }} />
                </Box>
              }
            >
              <MenuItem value="">
                <em>Seleccione un año</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Selección de Turno */}
        <Grid item xs={12} sm={4}>
          <FormControl 
            fullWidth 
            variant="outlined"
            // Desactivar y darle un aspecto visual de "espera" si no hay año o turnos
            disabled={!turnosAvailable}
          >
            <InputLabel id="turno-label">Turno de Examen</InputLabel>
            <Select
              labelId="turno-label"
              id="turnoSelect"
              value={selectedTurnoPeriodo}
              label="Turno de Examen"
              onChange={(e) => {
                setSelectedTurnoPeriodo(e.target.value);
                // Aquí irían tus setters
              }}
              startAdornment={
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <AccessTime sx={{ color: 'action.active' }} />
                </Box>
              }
            >
              <MenuItem value="">
                <em>Seleccione un turno</em>
              </MenuItem>
              {turnos.map((item, index) => (
                <MenuItem key={index} value={item.turno_examen_periodo}>
                  {item.turno_examen_nombre}
                </MenuItem>
              ))}
            </Select>
            {!turnosAvailable && (
              <Box component="span" sx={{ fontSize: '0.75rem', color: 'error.main', mt: 0.5 }}>
                Seleccione un año primero para cargar los turnos.
              </Box>
            )}
          </FormControl>
        </Grid>

        {/* Selección de Ubicación */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="ubicacion-label">Sede / Ubicación</InputLabel>
            <Select
              labelId="ubicacion-label"
              id="ubicacionSelect"
              value={selectedUbicacion}
              label="Sede / Ubicación"
              onChange={(e) => {
                setSelectedUbicacion(e.target.value);
                // Aquí irían tus setters
              }}
              startAdornment={
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <LocationOn sx={{ color: 'action.active' }} />
                </Box>
              }
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

      </Grid>
    </Paper>
        {resultados?
        
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant='h6'>Cantidad de Inscriptos: {(resultados.A + resultados.R + resultados.U) } Estudiantes</Typography>
                
        <br />
        <Grid container spacing={3}>
         <Table>
            <TableHead>
                <TableRow>

                    <TableCell>Aprobados</TableCell>
                    <TableCell>Reprobados</TableCell>
                    <TableCell>Ausentes</TableCell>


                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
               
                <TableCell>{resultados.A}</TableCell>
                    <TableCell>{resultados.R}</TableCell>
                    <TableCell>{resultados.U }</TableCell>

                </TableRow>
            </TableBody>

         </Table>
        </Grid>
        <br/>
        <Typography variant='h6'>%Aprobados(tomando como total a los estudiantes que se presentan a rendir): {((resultados.A/(resultados.A + resultados.R))*100).toFixed(2) } %</Typography>
        <Typography variant='h6'>%Ausentes: {((resultados.U/(resultados.A + resultados.R + resultados.U))*100).toFixed(2) } %</Typography>



      </Paper>:null}

      <br />
      {datosmesa ? <ReporteResultadoExamen datosmesa={datosmesa}  />:null
      }
      
      
    </Container>
  );
};

export default TurnosMesasComponent