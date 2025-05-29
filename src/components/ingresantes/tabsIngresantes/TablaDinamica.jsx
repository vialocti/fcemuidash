import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';

const TablaDinamica = ({ sedes, carreras, tabla, totalCarrera, totalSede, totalGeneral }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Tabla Dinámica por Sede y Carrera
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Sede</strong></TableCell>
            {carreras.map((car) => (
              <TableCell key={car} align="right"><strong>{car}</strong></TableCell>
            ))}
            <TableCell align="right"><strong>TOTAL</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sedes.map((sede) => (
            <TableRow key={sede}>
              <TableCell>{sede}</TableCell>
              {carreras.map((car) => (
                <TableCell key={car} align="right">
                  {tabla[sede]?.[car] || ""}
                </TableCell>
              ))}
              <TableCell align="right"><strong>{totalSede[sede] || ""}</strong></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell><strong>TOTAL</strong></TableCell>
            {carreras.map((car) => (
              <TableCell key={car} align="right"><strong>{totalCarrera[car] || ""}</strong></TableCell>
            ))}
            <TableCell align="right"><strong>{totalGeneral}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaDinamica;
