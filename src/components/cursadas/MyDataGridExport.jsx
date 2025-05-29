import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { CSVLink } from "react-csv";

const MyDataGridExport = ({ data, referenceYear }) => {
  console.log(data);
  // Claves de los años anteriores (por ejemplo, "total1" a "total4")
  const prevYearKeys = ["total1", "total2", "total3", "total4"];
  // Definir pesos: mayor peso para el año más reciente
  const weights = [4, 3, 2, 1];

  // Función para calcular el promedio ponderado de aceptación para una fila
  const calculateWeightedAcceptance = (row) => {
    let weightedSum = 0;
    let totalWeights = 0;
    prevYearKeys.forEach((key, index) => {
      const suffix = key.replace("total", "");
      const accepted = parseInt(row[key], 10) || 0;
      const rejected = parseInt(row[`totaR${suffix}`], 10) || 0;
      const sum = accepted + rejected;
      if (sum > 0) {
        const percentage = (accepted / sum) * 100;
        weightedSum += percentage * weights[index];
        totalWeights += weights[index];
      }
    });
    return totalWeights > 0 ? weightedSum / totalWeights : 0;
  };

  // Columnas dinámicas para cada año anterior (muestra el % de aceptados de forma individual)
  const dynamicColumns = useMemo(() => {
    return prevYearKeys.map((key) => {
      const suffix = key.replace("total", "");
      const year = referenceYear - parseInt(suffix, 10);
      return {
        field: `perc_${year}`,
        headerName: `% Aceptados ${year}`,
        width: 150,
        sortable: true,
        valueGetter: (params) => {
          const accepted = parseInt(params.row[key], 10) || 0;
          const rejected = parseInt(params.row[`totaR${suffix}`], 10) || 0;
          const sum = accepted + rejected;
          //return sum > 0 ? ((accepted / sum) * 100).toFixed(2) + "%" : "N/A";
          return sum > 0 ? accepted : "N/A";
        },
      };
    });
  }, [referenceYear]);

  // Definición de columnas fijas, incluyendo el promedio ponderado y el pronóstico
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
        field: "weightedAverageAcceptance",
        headerName: "Prom. Ponderado % Aceptados",
        width: 200,
        sortable: true,
        valueGetter: (params) => {
          const weightedAvg = calculateWeightedAcceptance(params.row);
          return weightedAvg > 0 ? weightedAvg.toFixed(2) + "%" : "N/A";
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
          const weightedAvg = calculateWeightedAcceptance(params.row);
          return weightedAvg > 0 ? Math.round(totalReference * weightedAvg / 100) : "N/A";
        },
      },
    ];
  }, [dynamicColumns, referenceYear]);

  // Transformación de datos para exportar a CSV, usando los mismos cálculos
  const exportedData = useMemo(() => {
    return data.map((row) => {
      const totalReference = (parseInt(row.total, 10) || 0) + (parseInt(row.totaR, 10) || 0);
      const weightedAvg = calculateWeightedAcceptance(row);
      const yearData = {};
      prevYearKeys.forEach((key, index) => {
        const suffix = key.replace("total", "");
        const year = referenceYear - parseInt(suffix, 10);
        const accepted = parseInt(row[key], 10) || 0;
        const rejected = parseInt(row[`totaR${suffix}`], 10) || 0;
        const sum = accepted + rejected;
        //yearData[`% Aceptados ${year}`] = sum > 0 ? ((accepted / sum) * 100).toFixed(2) + "%" : "N/A";
        yearData[`Aceptados ${year}`] = accepted > 0 ? accepted  : "N/A";
      });
      return {
        materia: row.materia,
        [`Inscriptos ${referenceYear}`]: totalReference,
        ...yearData,
        "Prom. Ponderado % Aceptados": weightedAvg > 0 ? weightedAvg.toFixed(2) + "%" : "N/A",
        "Pronóstico Aceptados": weightedAvg > 0 ? Math.round(totalReference * weightedAvg / 100) : "N/A",
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
