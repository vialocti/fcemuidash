import {
  Container,
  Grid,
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

const IngresantesAnioSede = ({ cantidadSede}) => {
  const [tabla, setTabla] = useState({});
  const [totalCarrera, setTotalCarrera] = useState({});
  const [totalSede, setTotalSede] = useState({});
  const [totalGeneral, setTotalGeneral] = useState(0);

  const sedes = ['MZA', 'SRF', 'GALV', 'ESTE'];
  const carreras = ['CP', 'LA', 'LE', 'LLO', 'LNRG'];

  useEffect(() => {
    const tabla = {};
    const totalCarrera = {};
    const totalSede = {};

    cantidadSede.forEach(({ sede, carrera, canti }) => {
      const cantidad = parseInt(canti, 10);
      if (!tabla[sede]) tabla[sede] = {};
      if (!tabla[sede][carrera]) tabla[sede][carrera] = 0;
      tabla[sede][carrera] += cantidad;

      // Total por carrera
      if (!totalCarrera[carrera]) totalCarrera[carrera] = 0;
      totalCarrera[carrera] += cantidad;

      // Total por sede
      if (!totalSede[sede]) totalSede[sede] = 0;
      totalSede[sede] += cantidad;
    });

    setTabla(tabla);
    setTotalCarrera(totalCarrera);
    setTotalSede(totalSede);

    // Total general
    setTotalGeneral(Object.values(totalCarrera).reduce((a, b) => a + b, 0));
  }, [cantidadSede]);

  if (!cantidadSede || cantidadSede.length === 0) {
    return (
      <Typography variant="h6" sx={{ m: 2 }}>
        No hay datos disponibles.
      </Typography>
    );
  }

  return (
    <Container maxWidth={false} sx={{ width: '90%', px: 10, mt: 3 }}>
    <Grid container spacing={2}>
      {/* Tabla detallada */}
      <Grid item xs={12} md={4}>
        <TableContainer component={Paper}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Tabla de Inscripciones
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Carrera</TableCell>
                <TableCell>Sede</TableCell>
                <TableCell>Tipo Ingreso</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell align="right">Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cantidadSede.map((fila, index) => (
                <TableRow key={index}>
                  <TableCell>{fila.carrera}</TableCell>
                  <TableCell>{fila.sede}</TableCell>
                  <TableCell>{fila.tipo_ingreso}</TableCell>
                  <TableCell>{fila.sexo}</TableCell>
                  <TableCell align="right">{fila.canti}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <strong>Total</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>{totalGeneral}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Tabla dinámica */}
      <Grid item xs={12} md={8}>
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
                  <TableCell key={car} align="right">
                    <strong>{totalCarrera[car] || ""}</strong>
                  </TableCell>
                ))}
                <TableCell align="right"><strong>{totalGeneral}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
    </Container>
  );
};

export default IngresantesAnioSede;
