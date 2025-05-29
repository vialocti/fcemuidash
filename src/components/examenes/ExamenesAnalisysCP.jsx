import React from "react";
import { Card, CardContent, Typography, Container, Grid, Button } from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExamenesAnalysis = ({ datosComparativa, periodo }) => {
  // Función para calcular estadísticas a partir de los resultados
  const calculateStats = (data) => {
    const totalEnrolled = data.A + data.R + data.U;
    const totalPresent = data.A + data.R;
    const totalAusentes = data.U;
    const totalReprobados = data.R;
    const totalAprobados = data.A;
    const passRate = totalPresent > 0 ? ((data.A / totalPresent) * 100).toFixed(2) : 0;
    return { totalEnrolled, totalPresent, passRate, totalAprobados, totalReprobados, totalAusentes };
  };

  // Calcular estadísticas para cada año
  const statsArray = datosComparativa.map(item => ({
    year: item.year,
    stats: calculateStats(item.stats)
  }));

  // Usamos el primer año como referencia para la comparativa
  const reference = statsArray[0];

  // Función para exportar a PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Análisis de Exámenes", 14, 20);

    statsArray.forEach((item, index) => {
      const startY = 30 + index * 60;
      doc.setFontSize(14);
      doc.text(`Año ${item.year}`, 14, startY);
      doc.autoTable({
        startY: startY + 5,
        head: [["Métrica", "Valor"]],
        body: [
          ["Total Inscriptos", item.stats.totalEnrolled],
          ["Total AsistenExamen", item.stats.totalPresent],
          ["Total Ausentes", item.stats.totalAusentes],
          ["Total Aprobados", item.stats.totalAprobados],
          ["Total Reprobados", item.stats.totalReprobados],
          ["Porcentaje Aprobados", item.stats.passRate + "%"],
        ],
        theme: "grid",
      });
    });

    // Comparativa relativa al primer año (si hay más de un año)
    if (statsArray.length > 1) {
      const startY = doc.lastAutoTable.finalY + 10;
      doc.text(`Comparativa (Relativo a ${reference.year})`, 14, startY);
      const compBody = [];
      statsArray.slice(1).forEach(item => {
        const diffEnrolled = item.stats.totalEnrolled - reference.stats.totalEnrolled;
        const diffPresent = item.stats.totalPresent - reference.stats.totalPresent;
        const diffAprobados = item.stats.totalAprobados - reference.stats.totalAprobados;
        const diffReprobados = item.stats.totalReprobados - reference.stats.totalReprobados;
        const diffPassRate = (item.stats.passRate - reference.stats.passRate).toFixed(2);
        const percentDiffEnrolled = reference.stats.totalEnrolled > 0 ? ((diffEnrolled / reference.stats.totalEnrolled) * 100).toFixed(2) : "N/A";
        const percentDiffPresent = reference.stats.totalPresent > 0 ? ((diffPresent / reference.stats.totalPresent) * 100).toFixed(2) : "N/A";
        const percentDiffAprobados = reference.stats.totalPresent > 0 ? ((diffAprobados / reference.stats.totalPresent) * 100).toFixed(2) : "N/A";
        const percentDiffReprobados = reference.stats.totalPresent > 0 ? ((diffReprobados / reference.stats.totalPresent) * 100).toFixed(2) : "N/A";

        compBody.push([
          `${reference.year} vs ${item.year}`,
          `Inscritos: ${diffEnrolled} (${percentDiffEnrolled}%)`,
          `Presentados: ${diffPresent} (${percentDiffPresent}%)`,
          `Aprobados: ${diffAprobados} (${percentDiffAprobados}%)`,
          `Reprobados: ${diffReprobados} (${percentDiffReprobados}%)`,
          `Porc. Aprobados: ${diffPassRate}%`
        ]);
      });
      doc.autoTable({
        startY: startY + 5,
        head: [["Comparativa", "Inscritos", "Presentados", "Aprobados", "Reprobados", "% Aprobados"]],
        body: compBody,
        theme: "grid"
      });
    }
    doc.save("analisis_examenes.pdf");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Análisis de Exámenes Periodo {periodo}
      </Typography>
      <Grid container spacing={3}>
        {statsArray.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.year}</Typography>
                <Typography>Total Inscriptos: {item.stats.totalEnrolled}</Typography>
                <Typography>Total Presentados: {item.stats.totalPresent}</Typography>
                <Typography>Total Aprobados: {item.stats.totalAprobados}</Typography>
                <Typography>Total Reprobados: {item.stats.totalReprobados}</Typography>
                <Typography>Porcentaje Aprobados: {item.stats.passRate}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {statsArray.length > 1 && (
        <Card sx={{ mt: 4, bgcolor: "#e3f2fd" }}>
          <CardContent>
            <Typography variant="h6">Comparativa (Relativo al primer año: {reference.year})</Typography>
            {statsArray.slice(1).map((item, index) => {
              const diffEnrolled = item.stats.totalEnrolled - reference.stats.totalEnrolled;
              const diffPresent = item.stats.totalPresent - reference.stats.totalPresent;
              const diffAprobados = item.stats.totalAprobados - reference.stats.totalAprobados;
              const diffReprobados = item.stats.totalReprobados - reference.stats.totalReprobados;
              const diffPassRate = (item.stats.passRate - reference.stats.passRate).toFixed(2);
              const percentDiffEnrolled = reference.stats.totalEnrolled > 0 ? ((diffEnrolled / reference.stats.totalEnrolled) * 100).toFixed(2) : "N/A";
              const percentDiffPresent = reference.stats.totalPresent > 0 ? ((diffPresent / reference.stats.totalPresent) * 100).toFixed(2) : "N/A";
              const percentDiffAprobados = reference.stats.totalPresent > 0 ? ((diffAprobados / reference.stats.totalPresent) * 100).toFixed(2) : "N/A";
              const percentDiffReprobados = reference.stats.totalPresent > 0 ? ((diffReprobados / reference.stats.totalPresent) * 100).toFixed(2) : "N/A";
              
              return (
                <div key={index}>
                  <Typography variant="subtitle1">
                    Comparación {reference.year} vs {item.year}:
                  </Typography>
                  <Typography>
                    Diferencia de Inscritos: {diffEnrolled} ({percentDiffEnrolled}%)
                  </Typography>
                  <Typography>
                    Diferencia de Presentados: {diffPresent} ({percentDiffPresent}%)
                  </Typography>
                  <Typography>
                    Diferencia en Aprobados: {diffAprobados} ({percentDiffAprobados}%)
                  </Typography>
                  <Typography>
                    Diferencia en Reprobados: {diffReprobados} ({percentDiffReprobados}%)
                  </Typography>
                  <Typography>
                    Diferencia en % Aprobados: {diffPassRate}%
                  </Typography>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={generatePDF}>
        Exportar a PDF
      </Button>
    </Container>
  );
};

export default ExamenesAnalysis;
