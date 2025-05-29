import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Paleta de colores sobrios
const COLORS = ["#607D8B", "#90CAF9", "#F48FB1"];

// Datos para el gráfico de pastel
const pieData = {
  labels: ["Egresados", "Activos", "Aspirantes"],
  datasets: [
    {
      data: [400, 600, 300],
      backgroundColor: COLORS,
      hoverBackgroundColor: COLORS.map(color => `${color}B3`), // Más traslúcido al pasar el mouse
    },
  ],
};

// Datos para el gráfico de barras
const barData = {
  labels: ["2021", "2022", "2023"],
  datasets: [
    {
      label: "Egresados",
      data: [200, 300, 400],
      backgroundColor: "#607D8B", // Azul grisáceo
    },
    {
      label: "Activos",
      data: [400, 500, 600],
      backgroundColor: "#90CAF9", // Azul claro
    },
    {
      label: "Aspirantes",
      data: [250, 200, 300],
      backgroundColor: "#F48FB1", // Rosa tenue
    },
  ],
};

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Dashboard de Estudiantes
      </Typography>
      <Grid container spacing={3}>
        
        {/* Gráfico Circular */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, textAlign: "center", bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" color="secondary">Distribución de Estudiantes</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>

        {/* Gráfico de Barras */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, textAlign: "center", bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" color="secondary">Evolución de Estudiantes</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Dashboard;
