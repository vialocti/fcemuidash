import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import React from 'react';

const TablaResumenComision = ({ comision }) => {
  if (!comision || !Array.isArray(comision.alumnos)) return <p>No hay datos.</p>;

  const alumnos = comision.alumnos;
  const anioActual = new Date().getFullYear();

  const total = alumnos.length;
  const conPerdida = alumnos.filter(a => Number(a.perdidasreg) > 0).length;
  const sinPerdida = alumnos.filter(a => Number(a.perdidasreg) === 0).length;
  const ultimaAnioAnterior = alumnos.filter(
    a => Number(a.ultimaperdireg) === anioActual - 1
  ).length;
  const coefMenorIgual13 = alumnos.filter(
    a => parseFloat(a.coef_tcarrera) <= 1.3
  ).length;
  const coefMayor13 = alumnos.filter(
    a => parseFloat(a.coef_tcarrera) > 1.3 && parseFloat(a.coef_tcarrera) < 100
  ).length;
  const coefSinValor = alumnos.filter(
    a => parseFloat(a.coef_tcarrera) === 0 || parseFloat(a.coef_tcarrera) === 100
  ).length;
  const recursan = alumnos.filter(a => Number(a.recursa) > 0).length;

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
           
          </TableRow>
          <TableRow>
            <TableCell>Total alumnos</TableCell>
            <TableCell>Con RAN</TableCell>
            <TableCell>Sin RAN</TableCell>
            <TableCell>RAN Ult.año</TableCell>
            <TableCell>Coef. ≤ 1.3</TableCell>
            <TableCell>Coef. &gt; 1.3</TableCell>
            <TableCell>Coef. sin valor (0 o 100)</TableCell>
            <TableCell>Recursan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{total}</TableCell>
            <TableCell>{conPerdida}</TableCell>
            <TableCell>{sinPerdida}</TableCell>
            <TableCell>{ultimaAnioAnterior}</TableCell>
            <TableCell>{coefMenorIgual13}</TableCell>
            <TableCell>{coefMayor13}</TableCell>
            <TableCell>{coefSinValor}</TableCell>
            <TableCell>{recursan}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaResumenComision;
