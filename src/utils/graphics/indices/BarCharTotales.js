import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels);

function BarChartTotales({ datos, tipo }) {
    let anios = [];
    let valores = [];
    let label = '';
    let backgroundColor = '';

    datos.forEach((ele) => {
        anios.push(ele.anio_academico);
        if (tipo === 'inscriptos') {
            valores.push(ele.totalInscriptos);
            label = 'Inscriptos';
            backgroundColor = 'rgba(0,0,255,0.6)';
        } else if (tipo === 'regulares') {
            valores.push((ele.totalRegulares / ele.totalInscriptos) * 100);
            label = 'Regulares (%)';
            backgroundColor = 'rgba(0,255,0,0.6)';
        } else if (tipo === 'libres') {
            valores.push((ele.totalDesaprobados / ele.totalInscriptos) * 100);
            label = 'Libres (%)';
            backgroundColor = 'rgba(255,0,0,0.6)';
        } else if (tipo === 'libresA') {
            valores.push((ele.totalAusentes / ele.totalInscriptos) * 100);
            label = 'Libres* (%)';
            backgroundColor = 'rgba(0,255,255,0.6)';
        } else if (tipo === 'promocionados') {
            valores.push((ele.totalPromocionados / ele.totalInscriptos) * 100);
            label = 'Promocionados (%)';
            backgroundColor = 'rgba(255,0,255,0.6)';
        }
    });

    const datosset = {
        labels: anios,
        datasets: [{
            label: label,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 1,
            data: valores
        }]
    };

    const opciones = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'start',
                formatter: (value) => {
                    return tipo === 'inscriptos' ? value : value.toFixed(1) + '%';
                },
                font: {
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let value = context.raw;
                        return tipo === 'inscriptos' ? value : value.toFixed(1) + '%';
                    }
                }
            }
        },
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
        <Bar data={datosset} options={opciones} />
    );
}

export default BarChartTotales;
