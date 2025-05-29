import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { CSVLink } from "react-csv";

// Componente que muestra la tabla y permite exportarla a CSV.
// Props:
//   data: Array de objetos con la estructura original.
//   referenceYear: Año de referencia (por defecto 2024).
const MyDataGridExport = ({ data, referenceYear }) => {
  console.log(data);
  // Definimos las claves de los años anteriores que usamos (por ejemplo, "total1" a "total4")
  const prevYearKeys = ["total1", "total2", "total3", "total4"];

  // Generamos columnas dinámicas para cada año anterior, calculando el porcentaje de aceptados.
  const dynamicColumns = useMemo(() => {
    return prevYearKeys.map((key) => {
      const suffix = key.replace("total", ""); // Obtiene "1", "2", etc.
      const year = referenceYear - parseInt(suffix, 10); // Calcula el año correspondiente.
      return {
        field: `perc_${year}`, // Campo virtual para el DataGrid.
        headerName: `% Aceptados ${year}`,
        width: 150,
        sortable: true,
        valueGetter: (params) => {
          const accepted = parseInt(params.row[key], 10) || 0;
          const rejected = parseInt(params.row[`totaR${suffix}`], 10) || 0;
          const sum = accepted + rejected;
          return sum > 0 ? ((accepted / sum) * 100).toFixed(2) + "%" : "N/A";
        },
      };
    });
  }, [referenceYear]);

  // Columnas fijas: materia, inscriptos y campos calculados adicionales.
  const columns = useMemo(() => {
    return [
      { field: "materia", headerName: "Actividad", width: 300, sortable: true },
      {
        field: "totalReference",
        headerName: `Inscriptos ${referenceYear}`,
        width: 180,
        sortable: true,
        valueGetter: (params) => {
          const total = parseInt(params.row.total, 10) || 0;
          const totalRejected = parseInt(params.row.totaR, 10) || 0;
          return total + totalRejected;
        },
      },
      ...dynamicColumns,
      {
        field: "averageAcceptance",
        headerName: "Prom. % Aceptados",
        width: 180,
        sortable: true,
        valueGetter: (params) => {
          const percentages = prevYearKeys.map((key) => {
            const suffix = key.replace("total", "");
            const accepted = parseInt(params.row[key], 10) || 0;
            const rejected = parseInt(params.row[`totaR${suffix}`], 10) || 0;
            const sum = accepted + rejected;
            return sum > 0 ? (accepted / sum) * 100 : 0;
          }).filter((value) => value > 0);

          if (percentages.length === 0) return "N/A";
          const average = percentages.reduce((a, b) => a + b, 0) / percentages.length;
          return average.toFixed(2) + "%";
        },
      },
      {
        field: "forecastAcceptance",
        headerName: "Pronóstico Aceptados",
        width: 200,
        sortable: true,
        valueGetter: (params) => {
          const total = parseInt(params.row.total, 10) || 0;
          const totalRejected = parseInt(params.row.totaR, 10) || 0;
          const totalReference = total + totalRejected;

          const percentages = prevYearKeys.map((key) => {
            const suffix = key.replace("total", "");
            const accepted = parseInt(params.row[key], 10) || 0;
            const rejected = parseInt(params.row[`totaR${suffix}`], 10) || 0;
            const sum = accepted + rejected;
            return sum > 0 ? (accepted / sum) * 100 : 0;
          }).filter((value) => value > 0);

          if (percentages.length === 0) return "N/A";

          const average = percentages.reduce((a, b) => a + b, 0) / percentages.length;
          return Math.round((totalReference * average) / 100);
        },
      },
    ];
  }, [dynamicColumns, referenceYear]);

  // Para exportar, transformamos los datos incluyendo los nuevos cálculos.
  const exportedData = useMemo(() => {
    return data.map((row) => {
      const totalReference = (parseInt(row.total, 10) || 0) + (parseInt(row.totaR, 10) || 0);

      const percentages = prevYearKeys.map((key) => {
        const suffix = key.replace("total", "");
        const accepted = parseInt(row[key], 10) || 0;
        const rejected = parseInt(row[`totaR${suffix}`], 10) || 0;
        const sum = accepted + rejected;
        return sum > 0 ? (accepted / sum) * 100 : 0;
      }).filter((value) => value > 0);

      const average = percentages.length > 0 ? (percentages.reduce((a, b) => a + b, 0) / percentages.length).toFixed(2) + "%" : "N/A";
      const forecast = percentages.length > 0 ? Math.round((totalReference * parseFloat(average)) / 100) : "N/A";

      return {
        materia: row.materia,
        [`Inscriptos ${referenceYear}`]: totalReference,
        ...Object.fromEntries(
          prevYearKeys.map((key, index) => {
            const year = referenceYear - (index + 1);
            return [`% Aceptados ${year}`, percentages[index]?.toFixed(2) + "%" || "N/A"];
          })
        ),
        "Prom. % Aceptados": average,
        "Pronóstico Aceptados": forecast,
      };
    });
  }, [data, referenceYear]);

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      <DataGrid
        rows={data.map((row, index) => ({ id: index, ...row }))}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25, 50, 100]}
        sortingOrder={["asc", "desc"]}
        disableSelectionOnClick
      />
      <Box sx={{ mt: 2 }}>
        <CSVLink
          data={exportedData}
          separator=";"
          filename={`tabla_inscriptos_${referenceYear}.csv`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="primary">
            Exportar Tabla a CSV
          </Button>
        </CSVLink>
      </Box>
    </Box>
  );
};

export default MyDataGridExport;
