import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMultIndicesPACLL({ datos}) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

    let anios = []

    let totalapciclolargo = []
    
    



   
        // eslint-disable-next-line array-callback-return
        datos.map((ele) => {
            anios.push(ele.anio_academico)
            
            totalapciclolargo.push(ele.totalaprobadascl)
            

        })
       
        const datosset = {
            labels: anios,
            datasets: [
                {
                label: 'Aprobadas Ciclo Largo',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgb(33, 209, 121)',
                borderColor: 'blue',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(18, 195, 172, 0.4)',
                pointBorderColor: '#FF0000',
                data: totalapciclolargo

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

export default BarChartMultIndicesPACLL