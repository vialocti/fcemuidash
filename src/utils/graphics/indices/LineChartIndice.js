import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

function LineChartIndice({ datos, tipo }) {
    let anios = [];
    let valores = [];
    let label = '';
    let backgroundColor = '';
    let borderColor = '';

    datos.forEach((ele) => {
        anios.push(ele.anio_academico);
        if (tipo === 'cursada') {
            valores.push(ele.promedioindicecursada);
            label = 'Ind.Cursada';
            backgroundColor = 'rgba(0,0,255,1)';
            borderColor = 'blue';
        } else if (tipo === 'corto') {
            valores.push(ele.promedioindicecorto);
            label = 'Ind.Ciclo Corto';
            backgroundColor = 'rgba(0,255,0,1)';
            borderColor = 'green';
        } else if (tipo === 'largo') {
            valores.push(ele.promedioindicelargo);
            label = 'Ind.Ciclo Largo';
            backgroundColor = 'rgba(255,0,0,1)';
            borderColor = 'red';
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
            data: valores
        }]
    };

    const opciones = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <Line data={datosset} options={opciones} />
    );
}

export default LineChartIndice;
