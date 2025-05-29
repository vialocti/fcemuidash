import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";
import React from "react";

const TableComponent = ({ data }) => {
  // Extraer todas las claves disponibles en los objetos
  const allKeys = new Set();
  data.forEach((item) => Object.keys(item).forEach((key) => allKeys.add(key)));

  // Ordenar claves colocando primero "nombreact" y luego los años en orden
  const sortedKeys = Array.from(allKeys).sort((a, b) => {
    if (a === "nombreact") return -1;
    if (b === "nombreact") return 1;
    return a.localeCompare(b);
  });

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {sortedKeys.map((key) => (
              <TableCell key={key} className="border px-4 py-2 text-center">
                {key.includes("aprobadas") && `Aprobadas ${key.slice(-4)}`}
                {key.includes("libres") && `Libres ${key.slice(-4)}`}
                {key.includes("regulares") && `Regulares ${key.slice(-4)}`}
                {key === "nombreact" && "Materia"}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {sortedKeys.map((key) => (
                <TableCell key={key}>
                  {row[key] ?? "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent


      
