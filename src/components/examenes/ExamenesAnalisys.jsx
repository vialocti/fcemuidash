import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExamenesAnalysis = ({ datosComparativa, periodo }) => {

   //const [epoca, setEpoca]= useState('')
  // Función para calcular estadísticas a partir de los resultados
  const calculateStats = (data) => {
    const totalEnrolled = data.A + data.R + data.U;
    const totalPresent = data.A + data.R;
    const totalAusentes = data.U;
    const totalReprobados = data.R;
    const totalAprobados = data.A;
    // Porcentaje de aprobados en relación a los que se presentan
    const passRate = totalPresent > 0 ? ((totalAprobados / totalPresent) * 100).toFixed(2) : 0;
    // Porcentaje de reprobados en relación a los que se presentan
    const failedRate = totalPresent > 0 ? ((totalReprobados / totalPresent) * 100).toFixed(2) : 0;
    // Porcentaje de ausentes en relación al total inscriptos
    const absentRate = totalEnrolled > 0 ? ((totalAusentes / totalEnrolled) * 100).toFixed(2) : 0;
    
    const presRate = totalEnrolled > 0 ? ((totalPresent / totalEnrolled) * 100).toFixed(2) : 0;

    return { totalEnrolled, totalPresent, totalAusentes, totalAprobados, totalReprobados,presRate, passRate, failedRate, absentRate };
  };

  // Calcular estadísticas para cada año y crear un arreglo con la información
  const statsArray = datosComparativa.map(item => ({
    year: item.year,
    stats: calculateStats(item.stats)
  }));

  // Definir las variables que se mostrarán en la tabla de evolución
  const variableRows = [
    { label: "Total Inscriptos", key: "totalEnrolled" },
    { label: "% Asistentes", key: "presRate", isPercentage:true },
    { label: "% Ausentes", key: "absentRate", isPercentage: true },
    { label: "% Aprobados", key: "passRate", isPercentage: true },
    { label: "% Reprobados", key: "failedRate", isPercentage: true }
  ];

  // Función para exportar a PDF con datos de cada año y la evolución de variables
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte Resultado Examenes Turno", 14,20)
    doc.setFontSize(14);
    doc.text(periodo==='I'?'Periodo Junio-Agosto':periodo==='M'?' Periodo Noviembre-Diciembre':' Periodo Febrero-Marzo', 14, 30);

    let currentY = 40;

    // Sección: Datos individuales por año
    statsArray.forEach((item) => {
      doc.setFontSize(14);
      doc.text(`Año ${item.year}`, 14, currentY);
      const yearData = [
        ["Total Inscriptos", item.stats.totalEnrolled],
        ["Total Asisten", item.stats.totalPresent],
        ["Total Aprobados", item.stats.totalAprobados],
        ["Total Ausentes", item.stats.totalAusentes],
        ["Total Reprobados", item.stats.totalReprobados]
      ];
      currentY += 5;
      doc.autoTable({
        startY: currentY,
        head: [["Métrica", "Valor"]],
        body: yearData,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] }
      });
      currentY = doc.lastAutoTable.finalY + 10;
    });

    // Sección: Tabla de evolución de variables
    doc.setFontSize(16);
    doc.text("Comparativa Porcentual", 14, currentY);
    currentY += 5;
    const head = [
      ["Variable", ...statsArray.map(item => item.year.toString())]
    ];
    const body = variableRows.map(row => {
      return [
        row.label,
        ...statsArray.map(item =>
          row.isPercentage ? item.stats[row.key] + "%" : item.stats[row.key]
        )
      ];
    });
    currentY += 5;
    doc.autoTable({
      startY: currentY,
      head: head,
      body: body,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save("evolucion_examenes.pdf");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resultado Turno de Examenes - {periodo==='I'?'Junio-Agosto':periodo==='M'?'Noviembre-Diciembre':'Febrero-Marzo'}
      </Typography>
      <Grid container spacing={3}>
        {statsArray.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Año {item.year}</Typography>
                <Typography>Total Inscriptos: {item.stats.totalEnrolled}</Typography>
                <Typography>Total Asisten: {item.stats.totalPresent}</Typography>
                <Typography>Total Ausentes: {item.stats.totalAusentes}</Typography>
                <Typography>Total Aprobados: {item.stats.totalAprobados}</Typography>
                <Typography>total Reprobados: {item.stats.totalReprobados}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ mt: 4 }}>
       Comparativa Porcentual Años
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Variable</TableCell>
              {statsArray.map((item, index) => (
                <TableCell key={index} align="center">
                  {item.year}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {variableRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row.label}</TableCell>
                {statsArray.map((item, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    {row.isPercentage ? item.stats[row.key] + "%" : item.stats[row.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={generatePDF}>
        Exportar a PDF
      </Button>
    </Container>
  );
};

export default ExamenesAnalysis;
