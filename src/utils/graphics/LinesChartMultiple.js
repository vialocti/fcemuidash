import { Line } from "react-chartjs-2";
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

function LineChartMultiple({ datos, claustro }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
    )

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


    const datosset = {
        labels: dias,
        datasets: [{
            label: 'Horas por dia',
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
            label: 'Registros por dia',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,255,0,1',
            borderColor: 'green',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: registros

        },
        {
            label: 'Promedio por día',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'red',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: promediodia

        },

        ]
    };

    const opciones = {
        maintenAspectRatio: true,
        responsive: true,
        scales: {
            y: {
                min: 0,
            },
        },
    };



    return (
        <Line data={datosset} options={opciones} />
    )
}
export default LineChartMultiple