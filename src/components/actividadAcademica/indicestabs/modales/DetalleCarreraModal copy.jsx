import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

// Estilos para la caja del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Ajusta el ancho
  maxHeight: '90vh', // Altura máxima
  overflowY: 'auto', // Scroll si es necesario
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DetalleCarreraModal = ({ open, handleClose, data, title }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="detalle-carrera-modal-title"
      aria-describedby="detalle-carrera-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="detalle-carrera-modal-title" variant="h5" component="h2" fontWeight="bold">
                {title}
            </Typography>
            <IconButton onClick={handleClose} aria-label="cerrar">
                <CloseIcon />
            </IconButton>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de detalle de carrera">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                <TableCell>Actividad</TableCell>
                <TableCell align="center">Carrera</TableCell>
                <TableCell align="center">Período</TableCell>
                <TableCell align="center">Sede</TableCell>
                <TableCell align="center">Inscriptos</TableCell>
                <TableCell align="center">Regular</TableCell>
                <TableCell align="center">Promocionados</TableCell>
                <TableCell align="center">Reprobados</TableCell>
                <TableCell align="center">Ausentes</TableCell>
                <TableCell align="center">Índice Cursada</TableCell>
                <TableCell align="center">Índice E1</TableCell>
                <TableCell align="center">Índice E2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.actividad_nombre}
                  </TableCell>
                   <TableCell align="center">{row.carrera}</TableCell>
                  <TableCell align="center">{row.periodo}</TableCell>
                  <TableCell align="center">{row.sede}</TableCell>
                  <TableCell align="center">{row.total_inscriptos}</TableCell>
                  <TableCell align="center">{row.regular}</TableCell>
                  <TableCell align="center">{row.promocionados}</TableCell>
                  <TableCell align="center">{row.reprobados}</TableCell>
                  <TableCell align="center">{row.ausentes}</TableCell>
                  <TableCell align="center">
                    {parseFloat(row.indice_cursada).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {row.indice_e1 !== null ? parseFloat(row.indice_e1).toFixed(2) : 'N/A'}
                  </TableCell>
                  <TableCell align="center">
                    {row.indice_e2 !== null ? parseFloat(row.indice_e2).toFixed(2) : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default DetalleCarreraModal;