import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { CSVLink } from "react-csv";
import InfoEncuestaSeleccion from "./infoenscuestas/InfoEncuestaSeleccion";

const InfoMuestraComisiones = ({ resumenM, datosComi, materia, anio, docentes }) => {
  const [detalleComisiones, setDetalleComisiones] = useState([]);
  const [promedioEncuesta, setPromedioEncuesta] = useState(0);
  const [evaluaciones, setEvaluaciones] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
 
  const calcularPromedioCalificacion = (docentes) => {
    if (!Array.isArray(docentes) || docentes.length === 0) return 0;
    const calificaciones = docentes
      .map((d) => parseFloat(d.calificacion))
      .filter((c) => !isNaN(c));
    if (calificaciones.length === 0) return 0;
    const suma = calificaciones.reduce((acc, calif) => acc + calif, 0);
    return (suma / calificaciones.length).toFixed(2);
  };

 
  useEffect(() => {
    if (datosComi) {
      setDetalleComisiones(datosComi);
    }
  }, [datosComi]);

  useEffect(() => {
    if (docentes && docentes.length > 0) {
      setEvaluaciones(docentes);
      console.log(docentes)
      setPromedioEncuesta(calcularPromedioCalificacion(docentes));
    } else {
      setEvaluaciones(null);
      setPromedioEncuesta(0);
    }
  }, [docentes]);

  const handleOpenModal = (docente) => {
    setDocenteSeleccionado(docente);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDocenteSeleccionado(null);
  };

  return (
    <Container maxWidth="false">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Materia: {materia} - {anio}
            </Typography>

            {resumenM.indiceT > 0 && (
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Inscriptos</TableCell>
                      <TableCell>Regulares</TableCell>
                      <TableCell>Libres</TableCell>
                      <TableCell>Libres*</TableCell>
                      <TableCell>Promocionados</TableCell>
                      <TableCell>Aprob.E1</TableCell>
                      <TableCell>Aprob.E2</TableCell>
                      <TableCell>%Regulares</TableCell>
                      <TableCell>%Promoción</TableCell>
                      <TableCell>%Aprob.E1</TableCell>
                      <TableCell>%Aprob.E2</TableCell>
                      <TableCell>Índice Cursada</TableCell>
                      <TableCell>Índice CC</TableCell>
                      <TableCell>Índice CL</TableCell>
                      <TableCell>Prom.Evaluación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{resumenM.totalInsc}</TableCell>
                      <TableCell>{resumenM.totalRegulares}</TableCell>
                      <TableCell>{resumenM.totalReprobados}</TableCell>
                      <TableCell>{resumenM.totalAusentes}</TableCell>
                      <TableCell>{resumenM.totalPromocionados}</TableCell>
                      <TableCell>{resumenM.totalAprobadosE1}</TableCell>
                      <TableCell>{resumenM.totalAprobadosE2}</TableCell>
                      <TableCell>{resumenM.indiceR}</TableCell>
                      <TableCell>{resumenM.indiceP}</TableCell>
                      <TableCell>{resumenM.indiceE1}</TableCell>
                      <TableCell>{resumenM.indiceE2}</TableCell>
                      <TableCell><strong>{resumenM.indiceT}</strong></TableCell>
                      <TableCell><strong>{resumenM.indiceTE1}</strong></TableCell>
                      <TableCell><strong>{resumenM.indiceTE2}</strong></TableCell>
                      <TableCell>
                        <Button size="small" variant="text" onClick={() => handleOpenModal({ docentes })}>
                          <strong>{promedioEncuesta}</strong>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={2}>
          {detalleComisiones.length > 0 ? (
            <Button variant="outlined">
              <CSVLink data={detalleComisiones} separator={";"} filename={`${materia}_Resultado.csv`}>
                Exportar CSV
              </CSVLink>
            </Button>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Detalle Comisiones</Typography>
          <Paper sx={{ p: 2 }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Propuesta</TableCell>
                    <TableCell>Periodo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Tot.Insc.</TableCell>
                    <TableCell>Reg.</TableCell>
                    <TableCell>Libres</TableCell>
                    <TableCell>Libres*</TableCell>
                    <TableCell>Prom.</TableCell>
                    <TableCell>AprobE1</TableCell>
                    <TableCell>AprobE2</TableCell>
                    <TableCell>%Reg.</TableCell>
                    <TableCell>%Prom.</TableCell>
                    <TableCell>%Aprob.E1</TableCell>
                    <TableCell>%Aprob.E2</TableCell>
                    <TableCell>Ind.C</TableCell>
                    <TableCell>Ind.CC</TableCell>
                    <TableCell>Ind.CL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detalleComisiones.map((dato, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{dato.propuesta}</TableCell>
                      <TableCell>{dato.periodo}</TableCell>
                      <TableCell>{dato.nombre}</TableCell>
                      <TableCell>{dato.total}</TableCell>
                      <TableCell>{dato.regular}</TableCell>
                      <TableCell>{dato.reprobado}</TableCell>
                      <TableCell>{dato.ausente}</TableCell>
                      <TableCell>{dato.promocionado}</TableCell>
                      <TableCell>{dato.examenuno}</TableCell>
                      <TableCell>{dato.examendos}</TableCell>
                      <TableCell>{dato.porccentajeR?.toFixed(2)}</TableCell>
                      <TableCell>{dato.porccentajeP?.toFixed(2)}</TableCell>
                      <TableCell>{dato.porcentaje1E?.toFixed(2)}</TableCell>
                      <TableCell>{(dato.examendos / dato.total).toFixed(2)}</TableCell>
                      <TableCell><strong>{(dato.porccentajeR * 0.7 + dato.porccentajeP * 0.3).toFixed(2)}</strong></TableCell>
                      <TableCell><strong>{(dato.porccentajeR * 0.7 + (dato.porcentaje1E + dato.porccentajeP) * 0.3).toFixed(2)}</strong></TableCell>
                      <TableCell><strong>{(dato.porccentajeR * 0.7 + ((dato.examendos / dato.total) + dato.porccentajeP) * 0.3).toFixed(2)}</strong></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, boxShadow: 24, maxHeight: '90vh', overflowY: 'auto' }}>
            {docenteSeleccionado && (
              <InfoEncuestaSeleccion docentes={docenteSeleccionado.docentes} onClose={handleCloseModal} anio={anio} actividad={materia} />
            )}
          </Box>
        </Modal>
      </Grid>
    </Container>
  );
};

export default InfoMuestraComisiones;
