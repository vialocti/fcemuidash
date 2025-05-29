import { format } from "date-fns";
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
  console.log(data);
  if (!data || data.length === 0) return <p>No hay datos disponibles</p>;

  const columns = Object.keys(data[0]);

  // Lista blanca de columnas que sí pueden contener fechas
  const dateFields = ["fecha_nacimiento", "fecha_registro", "fecha"];

  // Función más estricta para determinar si un valor es una fecha válida en formato yyyy-mm-dd
  const isDate = (value) => {
    if (typeof value !== "string") return false;

    // Solo permitir exactamente el formato yyyy-mm-dd
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) return false;

    const date = new Date(value);

    const [year, month, day] = value.split("-");
    return (
      !isNaN(date.getTime()) &&
      date.getUTCFullYear() === parseInt(year, 10) &&
      date.getUTCMonth() + 1 === parseInt(month, 10) &&
      date.getUTCDate() === parseInt(day, 10)
    );
  };

  // Función para formatear valores (solo si está en la lista blanca)
  const formatValue = (value, fieldName) => {
    if (dateFields.includes(fieldName) && isDate(value)) {
      return format(new Date(value), "dd/MM/yyyy");
    }
    return value;
  };

  // Función para exportar a CSV
  const exportToCSV = () => {
    const separator = ",";
    const csvContent = [
      columns.join(separator),
      ...data.map((row) =>
        columns.map((col) => `"${row[col] || ""}"`).join(separator)
      ),
    ].join("\n");

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

      <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
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
                  <TableCell key={colIndex}>
                    {formatValue(row[column], column)}
                  </TableCell>
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
