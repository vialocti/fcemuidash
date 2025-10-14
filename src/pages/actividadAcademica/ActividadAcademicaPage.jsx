import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

import CursadasTab from '../../components/actividadAcademica/tabsAcademica/CursadasTab';
import EgresadosTab from '../../components/actividadAcademica/tabsAcademica/EgresadosTab';
import ExamenesTab from '../../components/actividadAcademica/tabsAcademica/ExamenesTab';
import IndCursadas from '../../components/actividadAcademica/indicestabs/IndCursadas';
//import InfoGeneralTab from '../../components/actividadAcademica/tabsAcademica/InfoGeneralTab';
//import InfoReinscriptosTab from '../../components/actividadAcademica/tabsAcademica/InfoReinscriptosTab';
import { traerAlumosUbiPro } from '../../services/servicesAlumnos';
import { traerReinscriptosAnio } from '../../services/servicesAcademica';

// Año inicial inteligente
const getAnioInicial = () => {
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const fechaLimite = new Date(anioActual, 2, 31); // 31 de marzo
  return hoy > fechaLimite ? anioActual : anioActual - 1;
};


const traerTotalAlumnos = (data) => {


  return data.reduce((total, item) => total + (parseInt(item.count) || 0), 0);}

const ActividadAcademicaPage = () => {

  const [anio, setAnio] = useState(getAnioInicial());
  const [totalReinscriptos, setTotalReinscriptos] = useState(0)
  const [totalAlumnosActividad, setTotalAlumnosActividad] = useState(0)

  const [reinscriptos, setReinscriptos] = useState([])
  const [alumnosActividad, setAlumnosActividad] = useState([])
  const [seleccion, setSeleccion] = useState('cursadas');

  
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      try {
        
        const data = await traerReinscriptosAnio(anio);
        //console.log("Respuesta de traerReinscriptosAnio:", data);
        setReinscriptos(data.data);

        const data1= await traerAlumosUbiPro();
        //console.warn("Respuesta de traerAlumosUbiPro:", data1);
        setAlumnosActividad(data1);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, [anio]);

  useEffect(() => {
  if(reinscriptos.length > 0 ){
    setTotalReinscriptos(reinscriptos.length)
   
  }   

  if(alumnosActividad.length > 0 ){
    setTotalAlumnosActividad(traerTotalAlumnos(alumnosActividad))
   
  }

}, [reinscriptos, alumnosActividad])

  return (
    <Box>
    {/* Barra de título 
    
*/}
    {/* Fila de datos globales */}
    <Container sx={{ mt: 2}}>
      <Paper elevation={2} sx={{ p: 2 }}>
      
        <Typography variant="h6">Actividad Academica Año Lectivo</Typography>
        <Typography variant="h6">Año:{anio}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">
               <strong>Total de Alumnos Reinscriptos:</strong> {totalReinscriptos}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">
             <strong>Total de Alumnos Actividad:</strong> {totalAlumnosActividad}
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
          
         
            <Button
              variant="contained"
              fullWidth
              color="success"
              sx={{ mb: 1 }}
              onClick={() => setSeleccion('cursadas')}
            >
              Informacion Insc. Cursadas 
            </Button>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mb: 1 }}
              onClick={() => setSeleccion('indice_cursadas')}
            >
              Informacion Indice Cursadas 
            </Button>

            <Button
              variant="contained"
              fullWidth
              color="success"
              sx={{ mb: 1 }}
              onClick={() => setSeleccion('examenes')}
            >
              Informacion Examenes
            </Button>

            <Button
              variant="contained"
              fullWidth
              color="success"
              sx={{ mb: 1 }}
              onClick={() => setSeleccion('egresados')}
            >
              Informacion Egresados
            </Button>

            
          </Paper>
        </Grid>

        {/* Columna derecha */}
        <Grid item xs={12} md={10}>
       
          {seleccion === 'cursadas' &&  <CursadasTab />}
          {seleccion === 'indice_cursadas' && <IndCursadas /> }
          {seleccion === 'examenes' &&  <ExamenesTab  />}
          {seleccion === 'egresados' &&  <EgresadosTab />}
       
        </Grid>
      </Grid>
    )}
  </Box>
  )
}

export default ActividadAcademicaPage