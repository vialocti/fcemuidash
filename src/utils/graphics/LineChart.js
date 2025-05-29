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

function LineChart({ datos, etiquetas, anioI, ingre }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler,
    )


    let AI = []
    AI.push(Number(anioI))
    let IT = []
    IT.push(ingre)
    let anios = AI.concat(etiquetas)
    let cantidad = IT.concat(datos)

    const data = {
        labels: anios,
        datasets: [{
            label: 'Inscriptos Cohorte',
            tension: 0.5,
            fill: false,
            backgroundColor: 'rgba(190,190,255,1)',
            borderColor: 'blue',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(0,255,222,0.4)',
            pointBorderColor: '#FF0000',
            data: cantidad

        }]
    };

    const opciones = {
        fill: true,
        maintenAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                min: 0,
            },
        }
    };



    return (
        <Line data={data} options={opciones} />
    )
}

export default LineChart