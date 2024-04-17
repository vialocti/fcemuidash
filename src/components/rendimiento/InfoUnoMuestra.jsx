import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";




const InfoUnoMuestra = ({ infoalu }) => {
  const [porcentaje, setPorcentaje] = useState([]);

  const convertir = (infoalu) => {
    let completo = [];
    for (const alumno of infoalu) {
      completo.push(Number(alumno.completado.trim()));
    }
    return completo;
  };
  

  useEffect(() => {
    const getTratamiento = () => {
      setPorcentaje(convertir(infoalu));
    };
    getTratamiento();
  }, [infoalu]);

  useEffect(() => {
    const calculoVariancia = (media) => {
      let variacumula = 0;

      for (let i = 0; i < porcentaje.length; i++) {
        let rango;

        rango = Math.pow(Math.abs(porcentaje[i] - media), 2);
        variacumula = variacumula + rango;
      }
      //console.log(variacumula);
      return Math.sqrt(variacumula / porcentaje.length);
    };

    if (porcentaje.length > 0) {
      let suma = porcentaje.reduce(
        (valori, acumulador) => (acumulador += valori)
      );
      let media = suma / porcentaje.length;
      //console.log(media);
      //console.log(Math.min(...porcentaje));
      //console.log(Math.max(...porcentaje));
      //console.log(calculoVariancia(media));
    }
  }, [porcentaje]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>IngFCE</TableCell>
                  <TableCell>Aprobadas</TableCell>
                  <TableCell>Aplazos</TableCell>
                  <TableCell>Promedio</TableCell>
                  <TableCell>Carrera</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {infoalu.map((row, index) => (
                  <TableRow
                    key={row.index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.estudiante}
                    </TableCell>
                    <TableCell align="right">{row.anio_ingreso_fac}</TableCell>
                    <TableCell align="right">{row.aprobadas}</TableCell>
                    <TableCell align="right">{row.reprobadas}</TableCell>
                    <TableCell align="right">{row.promedioca}</TableCell>
                    <TableCell align="right">{row.completado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoUnoMuestra;
