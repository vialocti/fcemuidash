import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, useTheme } from '@mui/material';

// Es crucial registrar todos los elementos de Chart.js y el plugin Datalabels
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // ⬅️ Plugin para mostrar los números en la barra
);

/**
 * Componente de gráfico de barras simple usando react-chartjs-2.
 * Muestra el valor numérico en color negro sobre cada barra.
 * * @param {object} props
 * @param {object} props.data - Objeto con las sedes y sus valores (ej: {mza: 100, sr: 50, ...})
 * @param {string} props.title - Título del gráfico (ej: "Total: 1234").
 * @param {string} props.color - Color principal de la paleta MUI para las barras (ej: 'success').
 */
const BarChartSimple = ({ data, title, color = 'primary' }) => {
  const theme = useTheme();

  // 1. Preparación de datos
  const labels = ['Mza', 'S.R.F.', 'G.A.', 'Este'];
  const values = [data.mza || 0, data.sr || 0, data.ga || 0, data.es || 0];
  
  // Obtener colores del tema MUI
  const mainColor = theme.palette[color].main;
  const hoverColor = theme.palette[color].dark;
  const secondaryTextColor = theme.palette.text.secondary;

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cantidad',
        data: values,
        backgroundColor: mainColor,
        hoverBackgroundColor: hoverColor,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
      title: {
        display: true,
        text: title,
        color: secondaryTextColor,
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      // === CONFIGURACIÓN CLAVE PARA EL COLOR DEL NÚMERO ===
      datalabels: { 
          // 💡 Color del texto que aparece sobre la barra
          color: '#000000', // Establecido a color NEGRO para alto contraste
          anchor: 'end',    // Posiciona el número al final de la barra
          align: 'end',     // Alineación
          offset: 4,        // Separación de la barra
          font: {
            weight: 'bold',
            size: 12
          },
          // Función para mostrar el valor (oculta los ceros)
          formatter: (value) => value > 0 ? value : null 
      },
      // ====================================================
      tooltip: {
        callbacks: {
          title: (tooltipItem) => tooltipItem[0].label,
          label: (tooltipItem) => `Cantidad: ${tooltipItem.formattedValue}`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: secondaryTextColor,
          precision: 0,
        },
        grid: {
          display: false, // Ocultar líneas horizontales para un look más limpio
        }
      },
      x: {
        ticks: {
          color: secondaryTextColor,
        },
        grid: {
          display: false,
        }
      }
    },
  };

  return (
    <Box sx={{ height: 300, p: 2 }}>
      {/* El componente Bar renderiza el gráfico */}
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChartSimple;