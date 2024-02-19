import React from "react";
import { Line } from "react-chartjs-2";
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

function LinesChartMultI({ datos, tipo }) {

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
    let cantidadC = []
    let cantidadI = []
    let labelPrima = ''
    let labelCC = ''

    datos.map((ele) => {
        anios.push(ele.anio)
        cantidadI.push(ele.totalI)
        cantidadC.push(ele.totalIC)

    })

    if (tipo === 'A') {
        labelPrima = 'Inscriptos'
        labelCC = 'Inscriptos cambio carrera'
    } else if (tipo === 'I') {
        labelPrima = 'Ingresantes'
        labelCC = 'Ingresantes cambio carrera'
    } else if (tipo === 'C') {
        labelPrima = 'Aspirantes'
        labelCC = 'Ingresantes'
    }


    const datosset = {
        labels: anios,
        datasets: [{
            label: labelPrima,
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(190,190,255,1)',
            borderColor: 'blue',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(0,255,222,0.4)',
            pointBorderColor: '#FF0000',
            data: cantidadI

        },
        {
            label: labelCC,
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(190,190,255,1)',
            borderColor: 'orange',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: cantidadC

        }]
    };

    const opciones = {
        maintenAspectRatio: false,
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
export default LinesChartMultI