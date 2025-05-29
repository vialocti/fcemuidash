import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ReporteResultadoExamen from '../reportes/ReporteResultadoExamen';
import { traeResultadosMesasPeriodo, traerPeriodosExamen, traerResultadoTurno } from '../../services/servicesExamenes';

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

const ubicaciones = [
  { value: '1', label: 'MZA' },
  { value: '2', label: 'SR' },
  { value: '3', label: 'GA' },
  { value: '4', label: 'ESTE' }
];

const TurnosMesasComponentCp = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [selectedTurnos, setSelectedTurnos] = useState([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [resultados, setResultados] = useState(null);
  const [datosmesa, setDatosmesa] = useState(null);
  const [llamados, setLlamados]=useState('')
  const [turnosString, setTurnosString]=useState('')
  const [habilita, setHabilita]=useState(false)
 /////seleccion de año
 
 useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await traerPeriodosExamen(selectedYear);
        setTurnos(response);
        setSelectedTurnos([]);
      } catch (error) {
        console.error('Error al obtener turnos:', error);
      }
    };
    if (selectedYear) {
      fetchTurnos();
    }
    setHabilita(false)
  }, [selectedYear]);


  useEffect(() => {
    const fetchResultados = async () => {
      try {
        //const response = await axios.get(http://200.12.136.75:5000/examenes/resultadoturno/${llamados});
        const response = await traerResultadoTurno(llamados)
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
    console.log(llamados)
  }, [llamados]);


  ///
  useEffect(() => {
    const fetchResultados = async () => {
     
        //const turnosString = selectedTurnos.join(',');
        let turnosString=''
     
        if (selectedTurnos.includes("todos")) {
          // Si "Todos" está seleccionado, incluir todos los turnos
          turnosString = turnos.map((item) => item.turno_examen_periodo).join(",");
        } else {
          // Si no, solo los turnos seleccionados
          turnosString = selectedTurnos.join(",");
        }
    
      setTurnosString(turnosString)

    }
    if (selectedTurnos.length > 0) {
      fetchResultados();
    }
    setHabilita(false)

  }, [selectedTurnos]);

 
 const handleSearch=()=>{
  setHabilita(true)
 }


 //buscar mesas
  useEffect(() => {
    const fetchMesas = async () => {
      try {
        console.log(selectedYear, turnosString,selectedUbicacion)
        const response = await traeResultadosMesasPeriodo(selectedYear, turnosString, selectedUbicacion);
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
    };
    if (selectedYear && turnosString.length > 0 && selectedUbicacion, habilita) {
      fetchMesas();
    }
  }, [selectedYear, turnosString, selectedUbicacion, habilita]);
 
 
  //console.log(selectedTurnos)
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Búsqueda de Mesas de Examen
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="year-label">Año</InputLabel>
              <Select
                labelId="year-label"
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="">
                  <em>Seleccione un año</em>
                </MenuItem>
                {years.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth disabled={!selectedYear || turnos.length === 0}>
              <InputLabel id="turno-label">Turno Examen</InputLabel>
              <Select
                labelId="turno-label"
                id="turnoSelect"
                multiple
                value={selectedTurnos}
                onChange={(e) => setSelectedTurnos(e.target.value)}
              >
                 {/* Opción "Todos" */}
          <MenuItem value="todos">
            
            <ListItemText primary="Todos" />
          </MenuItem>
                {turnos.map((item, index) => (
                  <MenuItem key={index} value={item.turno_examen_periodo}>
                    {item.turno_examen_nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="ubicacion-label">Ubicación</InputLabel>
              <Select
                labelId="ubicacion-label"
                id="ubicacionSelect"
                value={selectedUbicacion}
                onChange={(e) => setSelectedUbicacion(e.target.value)}
              >
                <MenuItem value="">
                  <em>Seleccione una ubicación</em>
                </MenuItem>
                {ubicaciones.map((ubi, index) => (
                  <MenuItem key={index} value={ubi.value}>{ubi.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Botón de búsqueda */}
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={!selectedYear || !selectedUbicacion || selectedTurnos.length === 0}
        >
          Buscar
        </Button>
      </Grid>
        </Grid>
      </Paper>

      {resultados && (
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant='h6'>
            Porcentaje de Aprobados Turno: {((resultados.A / (resultados.A + resultados.R + resultados.U)) * 100).toFixed(2)}%
          </Typography>
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
                <TableCell>{resultados.U}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
     
    </Container>
  );
};

export default TurnosMesasComponentCp;