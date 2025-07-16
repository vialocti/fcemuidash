import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { traerEvaluacionDocentes } from '../../../services/servicesCursadas';

const InfoEncuestaSeleccion = ({ docentes, onClose, anio, actividad }) => {
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      if (docenteSeleccionado) {
        const data = await traerEvaluacionDocentes(docenteSeleccionado.id);
        setEvaluaciones(data);
      }
    };
    fetchEvaluaciones();
  }, [docenteSeleccionado]);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">
          Docentes Evaluados - {actividad} ({anio})
        </Typography>
        {onClose && (
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cerrar
          </Button>
        )}
      </Box>

      {/* Tabla de docentes con scroll y máximo de 6 filas */}
      <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 3 }}>
        <TableContainer component={Paper}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Legajo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Comisión</TableCell>
                <TableCell>Calificación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docentes.map((doc) => (
                <TableRow
                  key={doc.id}
                  hover
                  onClick={() => setDocenteSeleccionado(doc)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor:
                      docenteSeleccionado?.id === doc.id ? '#e0f7fa' : 'inherit'
                  }}
                >
                  <TableCell>{doc.legajo}</TableCell>
                  <TableCell>{doc.nombre}</TableCell>
                  <TableCell>{doc.comision}</TableCell>
                  <TableCell>{doc.calificacion ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Tabla de evaluaciones */}
      {docenteSeleccionado && evaluaciones.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Evaluaciones de: {docenteSeleccionado.nombre}
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Pregunta</TableCell>
                  <TableCell>Malo</TableCell>
                  <TableCell>Regular</TableCell>
                  <TableCell>Bueno</TableCell>
                  <TableCell>Muy Bueno</TableCell>
                  <TableCell>Excelente</TableCell>
                  <TableCell>NS</TableCell>
                  <TableCell>Calif</TableCell>
                  <TableCell>Calif Gral</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {evaluaciones.map((ev, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{ev.pregunta}</TableCell>
                    <TableCell>{ev.malo}</TableCell>
                    <TableCell>{ev.regular}</TableCell>
                    <TableCell>{ev.bueno}</TableCell>
                    <TableCell>{ev.muybueno}</TableCell>
                    <TableCell>{ev.excelente}</TableCell>
                    <TableCell>{ev.ns}</TableCell>
                    <TableCell>{ev.calif}</TableCell>
                    <TableCell>{ev.calif_gral}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default InfoEncuestaSeleccion;
