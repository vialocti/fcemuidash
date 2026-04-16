import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import AspirantesTabs from '../../components/ingresantes/AspirantesTabs';
import CompararaAspiIngresoLapso from '../inscriptos/CompararaAspiIngresoLapso';
import IngresantesPageEntreAnios from './IngresantesPageEntreAnios';
import IngresantesTabs from '../../components/ingresantes/IngresantesTabs';
import InscriptosPageEnTableRoweAnios from '../inscriptos/InscritosPageEntreAnios';
import { traerCantidadIncriptosUbicacionTSx } from '../../services/servicesInscriptos';
import { traerCantidadIngresoUbicacionTSx } from '../../services/servicesIngresantes';
import { traerAlumosSinMatricular } from '../../services/servicesAlumnos';
import IngresantesNoMatriculados from './IngresantesNoMatriculados';


// Año inicial inteligente
  const getAnioInicial = () => {
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const fechaLimite = new Date(anioActual, 2, 31); // 31 de marzo
    return hoy > fechaLimite ? anioActual : anioActual - 1;
  };
  
  const IngresantesAspirantes = () => {
    const [anio, setAnio] = useState(getAnioInicial());
    const [seleccion, setSeleccion] = useState('');
    const [totalIngresantes, setTotalIngresantes] = useState(0);
    const [totalAspirantes, setTotalAspirantes] = useState(0);
    const [totalIngresantesN, setTotalIngresantesN] = useState(0);
    const [totalAspirantesN, setTotalAspirantesN] = useState(0);
    const [totalIngresantesC, setTotalIngresantesC] = useState(0);
    const [totalAspirantesC, setTotalAspirantesC] = useState(0);
    const [alumnosNoMatriculados, setAlumnosNoMatriculados]= useState([])


  
    const [cantidadTSx, setCantidadTSx] = useState(null);
    const [cantidadTSxAspi, setCantidadTSxAspi] = useState(null);
    const [cargando, setCargando] = useState(false);
  
    function calcularTotalesPorTipoIngreso(datos, tipo) {
      let totalTipo6 = 0;
      let totalOtros = 0;
    //console.log(datos)
      datos.forEach(item => {
        const cantidad = Number(item.canti);
        if (item.tipo_ingreso === 6) {
          totalTipo6 += cantidad;
        } else {
          totalOtros += cantidad;
        }
      });
    // console.log('Total Tipo 6:', totalTipo6);      
    // console.log('Total Otros:', totalOtros);
      if (tipo === 'I') {
        setTotalIngresantesC(totalTipo6);
        setTotalIngresantesN(totalOtros);
        setTotalIngresantes(totalTipo6 + totalOtros);
      } else {
        setTotalAspirantesC(totalTipo6);
        setTotalAspirantesN(totalOtros);
        setTotalAspirantes(totalTipo6 + totalOtros);
      }
    }
  
    // Cargar datos
    useEffect(() => {
      const getTraerDatos = async () => {
        setCargando(true);
  
        try {
          
          const anioConsulta = anio > 2017 ? anio : 1;
       
          const resultNM = await traerAlumosSinMatricular(anio)
          const datosIngresantes = await traerCantidadIngresoUbicacionTSx(anioConsulta, 1);
          const datosAspirantes = await traerCantidadIncriptosUbicacionTSx(anioConsulta);
  
          setCantidadTSx(datosIngresantes);
          setCantidadTSxAspi(datosAspirantes);
          setAlumnosNoMatriculados(resultNM)
          setSeleccion('ingresantes')
          //console.log(resultNM)
        } catch (error) {
          console.error('Error al cargar datos:', error);
        } finally {
          setCargando(false);
        }
      };
      if(anio > 2018) {
      getTraerDatos();
      }
    }, [anio]);
  
    // Calcular totales cuando los datos estén disponibles
    useEffect(() => {
      if (cantidadTSx) {
        calcularTotalesPorTipoIngreso(cantidadTSx, 'I');
      }
    }, [cantidadTSx]);
  
    useEffect(() => {
      if (cantidadTSxAspi) {
        calcularTotalesPorTipoIngreso(cantidadTSxAspi, 'A');
      }
    }, [cantidadTSxAspi]);
  
    return (
      <Box>
        {/* Barra de título 
        
  */}
        {/* Fila de datos globales */}
        <Container sx={{ mt: 2}}>
          <Paper elevation={2} sx={{ p: 2 }}>
          
            <Typography variant="h6">Panel de Estadísticas Ingresantes / Aspirantes</Typography>
            <Typography variant="h6">Año:{anio}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">
                   <strong>Total de Aspirantes:</strong> {totalAspirantes}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                 <strong>Total de Ingresantes:</strong> {totalIngresantes}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
  
        {/* Spinner de carga */}
        {cargando && (
          <Container sx={{ mt: 2, textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="body2">Cargando datos...</Typography>
          </Container>
        )}
  
        {/* Cuerpo en dos columnas */}
        {!cargando && (
          <Grid container spacing={2} sx={{ p: 3 }}>
            {/* Columna izquierda */}
            <Grid item xs={12} md={2}>
              <Paper elevation={2} sx={{ p: 2, mt:4}}>
                <Typography variant="h6" sx={{ mb: 2 }}>Ingrese Año </Typography>
                <TextField
                  label="Año"
                  variant="outlined"
                  fullWidth
                  value={anio}
                  type="number"
                  onChange={(e) => setAnio(Number(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('ingresantes')}
                >
                  Ingresantes
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('aspirantes')}
                >
                  Aspirantes
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('ingresantesC')}
                >
                  Ingresantes-Periodos
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('aspirantesC')}
                >
                  Aspirantes-Periodos
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  sx={{ mb: 1 }}
                  onClick={() => setSeleccion('comparativa')}
                >
                  Aspirantes/Ingresantes
                </Button>
               
                <Button
                  variant="contained"
                  fullWidth
                  color="warning"
                  onClick={() => setSeleccion('nomatriculados')}
                >
                  Ingr.No Matriculados
                </Button>
              </Paper>
            </Grid>
  
            {/* Columna derecha */}
            <Grid item xs={12} md={10}>
              {seleccion === 'ingresantes' &&    <IngresantesTabs cantidadSede={cantidadTSx}/>}
              {seleccion === 'aspirantes' &&  <AspirantesTabs cantidadSede={cantidadTSxAspi}  />}
              {seleccion === 'aspirantesC' &&  <InscriptosPageEnTableRoweAnios anioFinal={anio}  />}
              {seleccion === 'ingresantesC' &&  <IngresantesPageEntreAnios anioFinal={anio} />}
              {seleccion === 'comparativa' && <CompararaAspiIngresoLapso anioFinal={anio} />}
              {seleccion === 'nomatriculados' && <IngresantesNoMatriculados data={alumnosNoMatriculados} />}

            </Grid>
          </Grid>
        )}
      </Box>
    );
  };
  
  export default IngresantesAspirantes;
  