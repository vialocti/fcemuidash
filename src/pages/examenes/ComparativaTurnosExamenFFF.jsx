import React, { useState } from 'react';
import TurnosMesasComponentCp from '../../components/examenes/TurnosMesasComponentCp';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Container } from '@mui/material';

const ComparativaTurnosExamen = () => {
  const [resultadosUno, setResultadosUno] = useState(null);
  const [resultadosDos, setResultadosDos] = useState(null);

  return (
    <Container maxWidth="lg">
      <TurnosMesasComponentCp onDataFetch={setResultadosUno} />
      <hr />
      <TurnosMesasComponentCp onDataFetch={setResultadosDos} />
      <hr />

      {resultadosUno && resultadosDos && (
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Comparativa de Turnos
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resultado</TableCell>
                <TableCell>Se</TableCell>
                <TableCell>Turno 2</TableCell>
                <TableCell>Diferencia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Aprobados</TableCell>
                <TableCell>{resultadosUno.A}</TableCell>
                <TableCell>{resultadosDos.A}</TableCell>
                <TableCell>{Math.abs(resultadosUno.A - resultadosDos.A)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Reprobados</TableCell>
                <TableCell>{resultadosUno.R}</TableCell>
                <TableCell>{resultadosDos.R}</TableCell>
                <TableCell>{Math.abs(resultadosUno.R - resultadosDos.R)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ausentes</TableCell>
                <TableCell>{resultadosUno.U}</TableCell>
                <TableCell>{resultadosDos.U}</TableCell>
                <TableCell>{Math.abs(resultadosUno.U - resultadosDos.U)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default ComparativaTurnosExamen;
