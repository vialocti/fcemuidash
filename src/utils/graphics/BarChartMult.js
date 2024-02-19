import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMult({ datos }) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

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




    //console.log(datos)

    const data = {
        labels: anios,
        datasets: [
            {
                label: 'Varones',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(0,125,255,1)',
                borderColor: 'blue',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(0,255,222,0.4)',
                pointBorderColor: '#FF0000',
                data: cantidadI

            },
            {
                label: 'Mujeres',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(255,80,80,1)',
                borderColor: 'red',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(255,255,0,0.4)',
                pointBorderColor: '#FFFF00',
                data: cantidadC

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

export default BarChartMult