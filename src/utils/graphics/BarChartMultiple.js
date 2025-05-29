import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMultiple({ datos, claustro }) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

    let dias = []
    let horast = []
    let registros = []
    let promediodia = []


    if (datos) {

        datos.map((ele) => {
            dias.push(ele.id)
            horast.push(ele.horast)
            registros.push(ele.registros)
            promediodia.push(ele.promediodia)

        })
    }
    //console.log(datos)

    const data = {
        labels: dias,
        datasets: [
            {
                label: 'Horas por día',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(0,0,255,1)',
                borderColor: 'blue',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(0,255,222,0.4)',
                pointBorderColor: '#FF0000',
                data: horast

            },
            {
                label: 'Registros por día',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(255,0,0,1)',
                borderColor: 'red',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(0,255,222,0.4)',
                pointBorderColor: '#FF0000',
                data: registros

            },
            {
                label: 'Promedio por día',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(0,255,0,1)',
                borderColor: 'green',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(0,255,222,0.4)',
                pointBorderColor: '#FF0000',
                data: promediodia

            },

        ]
    }

    const opciones = {
        maintenAspectRatio: false,
        responsive: true,
    }

    return (
        <Bar data={data} options={opciones} />
    )

}

export default BarChartMultiple