import React, { useState } from 'react';
import TurnosMesasComponentCp from '../../components/examenes/TurnosMesasComponentCp';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Container, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparativaTurnosExamen = () => {
  const [resultadosUno, setResultadosUno] = useState(null);
  const [resultadosDos, setResultadosDos] = useState(null);

  // Prepara datos para el gráfico si ambos resultados están disponibles
  const data = resultadosUno && resultadosDos ? [
    { tipo: 'Aprobados', turno1: resultadosUno.A, turno2: resultadosDos.A },
    { tipo: 'Reprobados', turno1: resultadosUno.R, turno2: resultadosDos.R },
    { tipo: 'Ausentes', turno1: resultadosUno.U, turno2: resultadosDos.U }
  ] : [];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TurnosMesasComponentCp onDataFetch={setResultadosUno} />
        </Grid>
        <Grid item xs={12}>
          <TurnosMesasComponentCp onDataFetch={setResultadosDos} />
        </Grid>

        {resultadosUno && resultadosDos && (
          <>
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Comparativa de Turnos
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Resultado</TableCell>
                      <TableCell>Año 1</TableCell>
                      <TableCell>Año 2</TableCell>
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
            </Grid>

            <Grid item xs={12}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Comparación Gráfica
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <XAxis dataKey="tipo" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="turno1" fill="#1976D2" name="Año 1" />
                      <Bar dataKey="turno2" fill="#D32F2F" name="Año 2" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ComparativaTurnosExamen;
