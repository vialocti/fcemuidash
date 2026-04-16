import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Alert
} from "@mui/material";

export default function IngresantesNoMatriculados({ data = [] }) {

  const totalStudents = useMemo(() => {
    return data.reduce((acc, item) => acc + Number(item.count || 0), 0);
  }, [data]);

  const bySede = useMemo(() => {
    const map = {};
    data.forEach((item) => {
      map[item.sede] = (map[item.sede] || 0) + Number(item.count);
    });

    return Object.entries(map).map(([sede, total]) => ({
      sede,
      total
    }));
  }, [data]);

  const byPropuesta = useMemo(() => {
    const map = {};
    data.forEach((item) => {
      map[item.propuesta] = (map[item.propuesta] || 0) + Number(item.count);
    });

    return Object.entries(map).map(([propuesta, total]) => ({
      propuesta,
      total
    }));
  }, [data]);

  if (!data.length) {
    return <Alert severity="info">Sin datos</Alert>;
  }

  return (
    <Box sx={{mt:5, ml:4}}>

      {/* TOTAL */}
      <Paper sx={{ p: 1, mb: 1, bgcolor:"blue", color:"white", borderRadius:2 }}>
        <Typography variant="h6">Total de estudiantes No matriculados:  {totalStudents}</Typography>
      
      </Paper>

      {/* TABLAS */}
      <Grid container spacing={3}>

        {/* POR SEDE */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Por Sede
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Sede</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bySede.map((row) => (
                    <TableRow key={row.sede}>
                      <TableCell>{row.sede}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </Grid>

        {/* POR PROPUESTA */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Por Propuesta
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Propuesta</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {byPropuesta.map((row) => (
                    <TableRow key={row.propuesta}>
                      <TableCell>{row.propuesta}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </Grid>

        {/* DETALLE */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Detalle
            </Typography>

            <TableContainer sx={{ maxHeight: 350 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Sede</TableCell>
                    <TableCell>Propuesta</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.sede}</TableCell>
                      <TableCell>{row.propuesta}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}