import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
  Chip,
  Tooltip,
  Grid,  // Agregado
  Modal  // Agregado
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import InfoEncuestaSeleccion from "./infoenscuestas/InfoEncuestaSeleccion";
import DownloadIcon from '@mui/icons-material/Download';

const InfoMuestraComisiones = ({ resumenM, datosComi, materia, anio, docentes }) => {
  const [detalleComisiones, setDetalleComisiones] = useState([]);
  const [promedioEncuesta, setPromedioEncuesta] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (datosComi) setDetalleComisiones(datosComi);
  }, [datosComi]);

  useEffect(() => {
    if (docentes && docentes.length > 0) {
      const calificaciones = docentes.map((d) => parseFloat(d.calificacion)).filter((c) => !isNaN(c));
      setPromedioEncuesta(calificaciones.length === 0 ? 0 : (calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length).toFixed(2));
    }
  }, [docentes]);

  const getIndiceColor = (valor) => {
    if (valor >= 0.7) return "success";
    if (valor >= 0.4) return "warning";
    return "error";
  };

  const formatCell = (cantidad, total) => {
    const porc = total > 0 ? ((cantidad / total) * 100).toFixed(0) : 0;
    return (
      <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
        {cantidad} <Typography component="span" variant="caption" color="text.secondary">({porc}%)</Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ mb: 6 }}>
      {/* HEADER DE LA MATERIA */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2, bgcolor: '#fdfdfd', borderLeft: '6px solid #1976d2' }}>
        <Grid container alignItems="center">
            <Grid item xs={12} md={8}>
                <Typography variant="h5" fontWeight="800" color="primary" sx={{ ml: 1 }}>
                  {materia} <Typography component="span" variant="h6" color="text.secondary">— Ciclo {anio}</Typography>
                </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1, mt: { xs: 2, md: 0 } }}>
                <Button size="small" variant="contained" color="secondary" onClick={() => setModalOpen(true)} sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                    Encuesta: {promedioEncuesta}
                </Button>
                <Button size="small" variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}>
                    <CSVLink data={detalleComisiones} separator={";"} filename={`${materia}_${anio}.csv`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Exportar
                    </CSVLink>
                </Button>
            </Grid>
        </Grid>
      </Paper>

      {/* TABLA PRINCIPAL */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow sx={{ "& th": { bgcolor: "#1976d2", color: "white", fontSize: '0.72rem', textTransform: 'uppercase' } }}>
              <TableCell>Comisión</TableCell>
              <TableCell align="center">Insc.</TableCell>
              <TableCell align="center">Regulares</TableCell>
              <TableCell align="center">Prom.</TableCell>
              <TableCell align="center">Libres</TableCell>
              <TableCell align="center">Ausentes</TableCell>
              <TableCell align="center">Aprob. E1</TableCell>
              <TableCell align="center">Aprob. E2</TableCell>
              <TableCell align="center">Ind. C</TableCell>
              <TableCell align="center">Ind. CC</TableCell>
              <TableCell align="center">Ind. CL</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {detalleComisiones.map((dato, index) => {
              const indC = (dato.porccentajeR * 0.7 + dato.porccentajeP * 0.3).toFixed(2);
              const indCC = (dato.porccentajeR * 0.7 + (dato.porcentaje1E + dato.porccentajeP) * 0.3).toFixed(2);
              const indCL = (dato.porccentajeR * 0.7 + ((dato.examendos / dato.total) + dato.porccentajeP) * 0.3).toFixed(2);
              
              return (
                <TableRow key={index} hover sx={{ '&:nth-of-type(even)': { bgcolor: '#fcfcfc' } }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#34495e' }}>{dato.nombre}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>{dato.total}</TableCell>
                  <TableCell align="center">{formatCell(dato.regular, dato.total)}</TableCell>
                  <TableCell align="center">{formatCell(dato.promocionado, dato.total)}</TableCell>
                  <TableCell align="center">{formatCell(dato.reprobado, dato.total)}</TableCell>
                  <TableCell align="center">{formatCell(dato.ausente, dato.total)}</TableCell>
                  <TableCell align="center">{formatCell(dato.examenuno, dato.total)}</TableCell>
                  <TableCell align="center">{formatCell(dato.examendos, dato.total)}</TableCell>
                  <TableCell align="center">
                    <Chip label={indC} size="small" variant="outlined" color={getIndiceColor(indC)} sx={{ fontWeight: 'bold', height: 20 }} />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={indCC} size="small" color={getIndiceColor(indCC)} sx={{ fontWeight: 'bold', height: 20 }} />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={indCL} size="small" color={getIndiceColor(indCL)} sx={{ fontWeight: 'bold', height: 20 }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter sx={{ bgcolor: '#eceff1' }}>
            <TableRow sx={{ "& td": { fontWeight: '800', color: '#263238', fontSize: '0.85rem', borderTop: '2px solid #cfd8dc' } }}>
              <TableCell>TOTAL GENERAL</TableCell>
              <TableCell align="center">{resumenM.totalInsc}</TableCell>
              <TableCell align="center">{formatCell(resumenM.totalRegulares, resumenM.totalInsc)}</TableCell>
              <TableCell align="center">{formatCell(resumenM.totalPromocionados, resumenM.totalInsc)}</TableCell>
              <TableCell align="center">{formatCell(resumenM.totalReprobados, resumenM.totalInsc)}</TableCell>
              <TableCell align="center">{formatCell(resumenM.totalAusentes, resumenM.totalInsc)}</TableCell>
              <TableCell align="center">{formatCell(resumenM.totalAprobadosE1, resumenM.totalInsc)}</TableCell>
              <TableCell align="center">{formatCell(resumenM.totalAprobadosE2, resumenM.totalInsc)}</TableCell>
              <TableCell align="center">
                <Chip label={resumenM.indiceT} size="small" color={getIndiceColor(resumenM.indiceT)} sx={{ border: '1px solid #455a64' }} />
              </TableCell>
              <TableCell align="center">
                <Chip label={resumenM.indiceTE1} size="small" color={getIndiceColor(resumenM.indiceTE1)} />
              </TableCell>
              <TableCell align="center">
                <Chip label={resumenM.indiceTE2} size="small" color={getIndiceColor(resumenM.indiceTE2)} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* MODAL DE ENCUESTAS */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 24, 
          width: '85%', maxHeight: '90vh', overflowY: 'auto' 
        }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Detalle de Evaluaciones Docentes</Typography>
            <InfoEncuestaSeleccion docentes={docentes} onClose={() => setModalOpen(false)} anio={anio} actividad={materia} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setModalOpen(false)} variant="contained">Cerrar</Button>
            </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default InfoMuestraComisiones;