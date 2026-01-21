import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, Box, Chip,
  Tooltip, CircularProgress, Alert
} from '@mui/material';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';

// Importa tus servicios
import { traerdatosListadoInfoAlu, traerListadoPorCoeficiente } from '../../services/servicesUtils';
import { traerHistoriaAcademicaalumnos } from '../../services/servicesRendimiento';
import { ModalHistorial } from '../formModales/ModalHistorial';

const ReportesListadoAlumnosInfo = ({ filtros }) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [legajo, setLegajo] = useState('');
  const [nombre, setNombre] = useState('');
  // Estados para el Modal de Historial
  const [modalAbierto, setModalAbierto] = useState(false);
  const [datosModal, setDatosModal] = useState({ legajo: '', nombre: '', historia: null });
  const [propuestaslbl, setPropuestaslbl] = useState('');


  const codigos = {
    "2": "LA",
    "3": "LE",
    "7": "LLO",
    "8": "CP"
  };

  const codigosSede = {
    "1": "MZA",
    "2": "SRF",
    "3": "GALV",
    "4": "ESTE"
  };

  const generarLabel = (propuestasString) => {
    return propuestasString
      .split(',')                  // Convertimos "2,3,8" en ["2", "3", "8"]
      .map(num => codigos[num.trim()] || num) // Reemplazamos por código
      .join(', ');                 // Unimos de nuevo: "LA, LE, CP"
  };




  useEffect(() => {
    const cargarDatos = async () => {
      if (!filtros) return;
      setPropuestaslbl(generarLabel(filtros.propuestas));
      setCargando(true);
      setError(null);
      try {
        let respuesta;
        if (filtros.modo === 'MATERIAS') {
          // Consulta tradicional por Año y Mínimo de aprobadas
          respuesta = await traerdatosListadoInfoAlu(filtros.anio, filtros.propuestas, filtros.matap);
        } else {
          // Nueva consulta por Rango de Coeficiente (Desde/Hasta)
          // Nota: Asegúrate de tener esta función en tus servicios
          respuesta = await traerListadoPorCoeficiente(filtros.propuestas, filtros.desde, filtros.hasta);
        }
        setDatos(respuesta);
      } catch (err) {
        setError("No se pudo obtener la información del servidor.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [filtros]);

  const verHistorialAlumno = async (fila) => {
    setLegajo(fila.legajo || fila.alumno); // Prioriza el legajo visual
    setNombre(`${fila.apellido}, ${fila.nombres}`);
    setDatosModal(null);
    setModalAbierto(true);

    try {
      const response = await traerHistoriaAcademicaalumnos(fila.alumno);
      setDatosModal(response);
    } catch (error) {
      console.error("Error al traer historial:", error);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  if (cargando) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
      <CircularProgress size={50} />
      <Typography sx={{ mt: 2 }} color="text.secondary">Procesando listado...</Typography>
    </Box>
  );

  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

  if (!datos || datos.length === 0) return (
    <Alert severity="info" sx={{ mt: 2 }}>No se encontraron alumnos con los criterios seleccionados.</Alert>
  );
  // console.log(filtros)
  return (
    <Box sx={{ mt: 2 }}>
      {/* Header de la Tabla con Exportación */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e' }}>
            Reporte de Rendimiento Académico - {propuestaslbl}
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
          Alumnos encontrados: <Chip label={datos.length} color="primary" size="small" />
        </Typography>
        <Button
          variant="outlined"
          color="success"
          startIcon={<FileDownloadIcon />}
          size="small"
        >
          <CSVLink
            data={datos}
            filename={`reporte_${filtros.modo.toLowerCase()}.csv`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Exportar CSV
          </CSVLink>
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, maxHeight: '60vh' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Legajo</TableCell>
              <TableCell sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Alumno</TableCell>
              <TableCell sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Sede</TableCell>
              <TableCell sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Propuesta</TableCell>
              <TableCell sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Plan</TableCell>
              <TableCell sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Año Ingreso Prop.</TableCell>
              <TableCell align="center" sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Aprob.</TableCell>
              <TableCell align="center" sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Coef. TC</TableCell>
              <TableCell align="center" sx={{ bgcolor: '#1a237e', color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((fila, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ fontWeight: 'bold' }}>{fila.legajo}</TableCell>
                <TableCell>{`${fila.apellido}, ${fila.nombres}`}</TableCell>
                <TableCell>
                  {codigosSede[fila.ubicacion]}
                </TableCell>
                <TableCell>
                  <Tooltip title={fila.propuesta}>
                    <Typography variant="caption" noWrap sx={{ maxWidth: 150, display: 'block' }}>
                      {codigos[fila.propuesta]}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Chip label={fila.plan} size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="caption" noWrap sx={{ maxWidth: 150, display: 'block' }}>
                    {fila.anio_ingreso_pro}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip label={fila.aprobadas} size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontWeight: 'bold', color: fila.coef_tcarrera >= 1 ? 'blue' : 'orange' }}>
                    {fila.coef_tcarrera}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => verHistorialAlumno(fila)}
                    sx={{ textTransform: 'none', py: 0 }}
                  >
                    Aprobadas
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalHistorial
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        legajo={legajo}
        nombre={nombre}
        historia={datosModal}
      />
    </Box>
  );
};

export default ReportesListadoAlumnosInfo;