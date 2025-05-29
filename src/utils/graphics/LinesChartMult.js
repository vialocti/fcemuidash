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

function LineChartMult({ datos }) {

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

    /*
    datos.map((ele) => {
        anios.push(ele.anio)
        cantidadI.push(ele.totalI)
        cantidadC.push(ele.totalIC)

    })
   */
    console.log(datos)
    datos.map((ele) => {
        anios.push(ele.anio)
        cantidadI.push(ele.cantim)
        cantidadC.push(ele.cantif)

    })

    const datosset = {
        labels: anios,
        datasets: [{
            label: 'Varones',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,150,255,1)',
            borderColor: 'green',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(0,255,222,0.4)',
            pointBorderColor: '#000000',
            data: cantidadI

        },
        {
            label: 'Mujeres',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,150,0,1)',
            borderColor: 'magenta',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#000000',
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
export default LineChartMult