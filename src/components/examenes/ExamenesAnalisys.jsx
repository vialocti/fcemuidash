import React, { useMemo, useRef } from "react";
import {
  Box, Button, Card, Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography,
  Chip, Stack
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const PERIODOS = {
  I: "Junio - Agosto",
  M: "Noviembre - Diciembre",
  F: "Febrero - Marzo",
  L: "Ciclo Lectivo Completo"
};

const ExamenesAnalysis = ({ datosComparativa, periodo, sedeNombre = "No especificada" }) => {
  const chartCantidadesRef = useRef(null);
  const chartTasasRef = useRef(null);

  const statsArray = useMemo(() => {
    if (!Array.isArray(datosComparativa)) return [];
    
    return datosComparativa.map(({ year, stats }) => {
      const totalInscriptos = (stats.A || 0) + (stats.R || 0) + (stats.U || 0);
      const totalPresentes = (stats.A || 0) + (stats.R || 0);
      const totalAusentes = (stats.U || 0);
      
      return {
        year,
        totalInscriptos,
        totalPresentes,
        totalAusentes,
        totalAprobados: stats.A || 0,
        totalReprobados: stats.R || 0,
        tasaAprobados: totalPresentes > 0 ? parseFloat(((stats.A / totalPresentes) * 100).toFixed(1)) : 0,
        tasaPresentismo: totalInscriptos > 0 ? parseFloat(((totalPresentes / totalInscriptos) * 100).toFixed(1)) : 0,
      };
    });
  }, [datosComparativa]);

  const generatePDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const startYear = statsArray[0]?.year;
    const endYear = statsArray[statsArray.length - 1]?.year;
    const periodoNombre = PERIODOS[periodo] || PERIODOS.L;

    // --- ENCABEZADO ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(20, 33, 61);
    doc.text("INFORME COMPARATIVO DE EXÁMENES", 14, 15);

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("SEDE:", 14, 23); 
    doc.setFont("helvetica", "normal");
    doc.text(`${sedeNombre.toUpperCase()}`, 45, 23);
    
    doc.setFont("helvetica", "bold");
    doc.text("CICLO LECTIVO:", 14, 28);
    doc.setFont("helvetica", "normal");
    doc.text(`${startYear} a ${endYear}`, 45, 28);

    doc.setFont("helvetica", "bold");
    doc.text("PERÍODO:", 14, 33);
    doc.setFont("helvetica", "normal");
    doc.text(`${periodoNombre.toUpperCase()}`, 45, 33);

    doc.setDrawColor(41, 128, 185);
    doc.line(14, 38, 196, 38);

    // --- TABLA DE DATOS (ARRIBA EN EL PDF) ---
    const tableRows = [
      ["Total Inscriptos", ...statsArray.map(s => s.totalInscriptos)],
      ["Total Asistentes", ...statsArray.map(s => s.totalPresentes)],
      ["Total Ausentes", ...statsArray.map(s => s.totalAusentes)],
      ["Total Aprobados", ...statsArray.map(s => s.totalAprobados)],
      ["Total Reprobados", ...statsArray.map(s => s.totalReprobados)],
      ["% Presentismo", ...statsArray.map(s => `${s.tasaPresentismo}%`)],
      ["% Aprobación", ...statsArray.map(s => `${s.tasaAprobados}%`)],
    ];

    doc.autoTable({
      startY: 40,
      head: [["Variables", ...statsArray.map(s => s.year)]],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold', fillColor: [245, 245, 245], cellWidth: 45 } }
    });

    let currentY = doc.lastAutoTable.finalY + 10;

    // --- GRÁFICO 1 EN PDF: CANTIDADES ---
    if (chartCantidadesRef.current) {
      const canvas1 = await html2canvas(chartCantidadesRef.current, { scale: 2 });
      doc.setFont("helvetica", "bold");
      doc.text("EVOLUCIÓN DE CANTIDADES", 14, currentY);
      doc.addImage(canvas1.toDataURL("image/png"), 'PNG', 14, currentY + 3, 180, 75);
      currentY += 85;
    }

    // --- GRÁFICO 2 EN PDF: TASAS ---
    if (chartTasasRef.current) {
      if (currentY > 210) { doc.addPage(); currentY = 20; }
      const canvas2 = await html2canvas(chartTasasRef.current, { scale: 2 });
      doc.setFont("helvetica", "bold");
      doc.text("TASAS DE RENDIMIENTO (%)", 14, currentY);
      doc.addImage(canvas2.toDataURL("image/png"), 'PNG', 14, currentY + 3, 180, 75);
    }

    doc.save(`Reporte_Examenes_${sedeNombre.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Análisis Comparativo de Examenes</Typography>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={generatePDF}>
          Descargar Informe PDF
        </Button>
      </Stack>

      {/* 1. TABLA RESUMEN (ARRIBA) */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>RESUMEN DE DATOS OBTENIDOS</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f0f4f8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>VARIABLE</TableCell>
              {statsArray.map(s => <TableCell key={s.year} align="center" sx={{ fontWeight: 800 }}>{s.year}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {["totalInscriptos", "totalPresentes", "totalAusentes", "totalAprobados", "tasaPresentismo", "tasaAprobados"].map((key) => (
              <TableRow key={key} hover>
                <TableCell sx={{ fontWeight: 600 }}>
                  {key.replace('total', 'Total ').replace('tasa', '% ')}
                </TableCell>
                {statsArray.map(s => (
                  <TableCell key={s.year} align="center">
                    {key.startsWith('tasa') ? (
                      <Chip label={`${s[key]}%`} size="small" variant="outlined" color="primary" sx={{ fontWeight: 'bold' }} />
                    ) : s[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 2. GRÁFICO DE CANTIDADES */}
      <div ref={chartCantidadesRef} style={{ background: '#fff', padding: '10px', marginBottom: '20px' }}>
        <Card variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>EVOLUCIÓN DE MATRÍCULA (CANTIDADES)</Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={statsArray}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line name="Inscriptos" dataKey="totalInscriptos" stroke="#2196f3" strokeWidth={3} />
                <Line name="Ausentes" dataKey="totalAusentes" stroke="#ff9800" strokeWidth={2} strokeDasharray="5 5" />
                <Line name="Presentes" dataKey="totalPresentes" stroke="#673ab7" strokeWidth={2} />
                <Line name="Aprobados" dataKey="totalAprobados" stroke="#4caf50" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </div>

      {/* 3. GRÁFICO DE TASAS */}
      <div ref={chartTasasRef} style={{ background: '#fff', padding: '10px' }}>
        <Card variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>TASAS DE RENDIMIENTO (%)</Typography>
          <Box sx={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={statsArray}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="year" />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line name="% Presentismo" dataKey="tasaPresentismo" stroke="#673ab7" strokeWidth={2} strokeDasharray="5 5" />
                <Line name="% Aprobación" dataKey="tasaAprobados" stroke="#4caf50" strokeWidth={4} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </div>
    </Box>
  );
};

export default ExamenesAnalysis;