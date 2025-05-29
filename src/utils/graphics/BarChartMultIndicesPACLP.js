import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMultIndicesPACLP({ datos}) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

    let anios = []
    let totalpromocion = []
    
    



   
        // eslint-disable-next-line array-callback-return
        datos.map((ele) => {
            anios.push(ele.anio_academico)
           totalpromocion.push(ele.totalPromocionados)

        })
       
        const datosset = {
            labels: anios,
            datasets: [
                {
                label: 'Promocionados',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(0,0,255,1)',
                borderColor: 'blue',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(0,255,222,0.4)',
                pointBorderColor: '#FF0000',
                data: totalpromocion
    
            },
          
          
            ]
        };


        const opciones = {
            maintenAspectRatio: false,
            responsive: true,
        }

    return (
        <Bar data={datosset} options={opciones} />
    )


}

export default BarChartMultIndicesPACLP