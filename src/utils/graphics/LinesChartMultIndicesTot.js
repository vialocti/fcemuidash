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

function LineChartMultIndicesTot({ datos }) {

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

    let anios = []
    let totalinsc = []
    let totalregular = []
    let totallibres = []
    let totallibresA = []
    let totalpromocion = []
    



   
        datos.map((ele) => {
            anios.push(ele.anio_academico)
            totalinsc.push(ele.totalInscriptos )
            totalregular.push(ele.totalRegulares)
            totallibres.push(ele.totalDesaprobados)
            totallibresA.push(ele.totalAusentes)
            totalpromocion.push(ele.totalPromocionados)

        })
     


    const datosset = {
        labels: anios,
        datasets: [{
            label: 'Inscriptos',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,0,255,1)',
            borderColor: 'blue',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(0,255,222,0.4)',
            pointBorderColor: '#FF0000',
            data: totalinsc

        },
        {
            label: 'REgulares',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,255,0,1',
            borderColor: 'green',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totalregular

        },
        {
            label: 'Libres',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'red',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totallibres

        },
        {
            label: 'Libres*',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,255,255,1)',
            borderColor: 'rgba(0,255,255,1)',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totallibresA

        },
        {
            label: 'Promocionados',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,0,255,1)',
            borderColor: 'rgba(255,0,255,1)',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totalpromocion

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
export default LineChartMultIndicesTot