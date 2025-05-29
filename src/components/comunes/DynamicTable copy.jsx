import { format } from "date-fns"; // Para formatear fechas
import { saveAs } from "file-saver";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";

const DynamicTable = ({ data }) => {
  console.log(data)
  if (!data || data.length === 0) return <p>No hay datos disponibles</p>;

  const columns = Object.keys(data[0]);

  // Función para verificar si un valor es numérico
  const isNumericString = (value) => /^\d+$/.test(value);

  // Función para determinar si un valor es una fecha válida
  const isDate = (value) => {
    return (
      typeof value === "string" &&
      !isNumericString(value) &&
      !isNaN(Date.parse(value))
    );
  };

  // Función para formatear valores (si es fecha, la convierte a formato legible)
  const formatValue = (value) => {
    if (isDate(value)) {
      return format(new Date(value), "dd/MM/yyyy");
    }
    return value;
  };

  // Función para exportar a CSV
  const exportToCSV = () => {
    const separator = ",";
    const csvContent = [
      columns.join(separator), // Encabezados
      ...data.map((row) =>
        columns.map((col) => `"${row[col] || ""}"`).join(separator)
      ), // Filas de datos
    ].join("\n");

    // Crear un blob y descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "exported_data.csv");
  };

  return (
 
    <>
      <Button
        variant="contained"
        color="success"
        onClick={exportToCSV}
        sx={{ mb: 2, float: "right" }}
      >
        Exportar a CSV
      </Button>

      {/* Contenedor de la tabla con scroll */}
      <TableContainer component={Paper} sx={{ maxHeight:530 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{formatValue(row[column])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
  
  );
};

export default DynamicTable;
