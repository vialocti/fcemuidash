import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

function LineChartTotales({ datos, tipo }) {
    let anios = [];
    let valores = [];
    let label = '';
    let backgroundColor = '';
    let borderColor = '';

    datos.forEach((ele) => {
        anios.push(ele.anio_academico);
        if (tipo === 'inscriptos') {
            valores.push(ele.totalInscriptos);
            label = 'Inscriptos';
            backgroundColor = 'rgba(0,0,255,1)';
            borderColor = 'blue';
        } else if (tipo === 'regulares') {
            valores.push((ele.totalRegulares / ele.totalInscriptos) * 100);
            label = 'Regulares (%)';
            backgroundColor = 'rgba(0,255,0,1)';
            borderColor = 'green';
        } else if (tipo === 'libres') {
            valores.push((ele.totalDesaprobados / ele.totalInscriptos) * 100);
            label = 'Libres (%)';
            backgroundColor = 'rgba(255,0,0,1)';
            borderColor = 'red';
        } else if (tipo === 'libresA') {
            valores.push((ele.totalAusentes / ele.totalInscriptos) * 100);
            label = 'Libres* (%)';
            backgroundColor = 'rgba(0,255,255,1)';
            borderColor = 'cyan';
        } else if (tipo === 'promocionados') {
            valores.push((ele.totalPromocionados / ele.totalInscriptos) * 100);
            label = 'Promocionados (%)';
            backgroundColor = 'rgba(255,0,255,1)';
            borderColor = 'magenta';
        }
    });

    const datosset = {
        labels: anios,
        datasets: [{
            label: label,
            tension: 0.4,
            fill: false,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: valores,
            pointRadius: 4
        }]
    };

    const opciones = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return tipo === 'inscriptos' ? value : value + '%';
                    }
                }
            }
        }
    };

    return (
        <Line data={datosset} options={opciones} />
    );
}

export default LineChartTotales;
