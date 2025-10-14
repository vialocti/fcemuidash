import Paper from '@mui/material/Paper';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TablaAnioP = ({ datos, propuestasNombres }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Propuesta</TableCell>
            <TableCell>Total Inscriptos</TableCell>
            <TableCell>Total Regulares</TableCell>
            <TableCell>Total Desaprobados</TableCell>
            <TableCell>Total Ausentes</TableCell>
            <TableCell>Total Promocionados</TableCell>
            <TableCell>Aprobadas CC</TableCell>
            <TableCell>Aprobadas CL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((item) => (
            <TableRow key={item.propuesta}>
              <TableCell>{propuestasNombres[item.propuesta]}</TableCell>
              <TableCell>{item.totalInscriptos}</TableCell>
              <TableCell>{item.totalRegulares}</TableCell>
              <TableCell>{item.totalDesaprobados}</TableCell>
              <TableCell>{item.totalAusentes}</TableCell>
              <TableCell>{item.totalPromocionados}</TableCell>
              <TableCell>{item.totalaprobadascc}</TableCell>
              <TableCell>{item.totalaprobadascl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaAnioP;