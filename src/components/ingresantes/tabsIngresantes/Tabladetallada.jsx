import React from 'react';
import {
    Box,
    Button,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from 'react-csv';

const headers = [
    { label: 'Sede', key: 'sede' },
    { label: 'Propuesta', key: 'carrera' },
    { label: 'Tipo Ingreso', key: 'tipo_ingreso' },
    { label: 'Sexo', key: 'sexo' },
    { label: 'Cantidad', key: 'canti' },
  ];


const TablaDetallada = ({ cantidadSede, totalGeneral }) => {
  return (
    <TableContainer component={Paper}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Tabla de Detllada, Discriminada por Sede, Propuesta, Tipo Ingreso y Sexo
      </Typography>
      <CSVLink data={cantidadSede} headers={headers} filename="tabla_detallada.csv" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="small" startIcon={<FileDownloadIcon />}>
            Exportar CSV
        </Button>
        </CSVLink>
        </Box>
      <Table>
        <TableHead>
          <TableRow>  
            <TableCell>Sede</TableCell>
            <TableCell>Propuesta</TableCell>
            <TableCell>Tipo Ingreso</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell align="right">Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cantidadSede.map((fila, index) => (
            <TableRow key={index}>  
             <TableCell>{fila.sede}</TableCell>
              <TableCell>{fila.carrera}</TableCell>
              <TableCell>{fila.tipo_ingreso}</TableCell>
              <TableCell>{fila.sexo}</TableCell>
              <TableCell align="right">{fila.canti}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right"><strong>Total</strong></TableCell>
            <TableCell align="right"><strong>{totalGeneral}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaDetallada;
