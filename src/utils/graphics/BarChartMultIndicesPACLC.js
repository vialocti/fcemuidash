import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMultIndicesPACLC({ datos}) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

    let anios = []
   
    let totalapciclocorto = []
   
    
    



   
        // eslint-disable-next-line array-callback-return
        datos.map((ele) => {
            anios.push(ele.anio_academico)
            totalapciclocorto.push(ele.totalaprobadascc)
           
        })
       
        const datosset = {
            labels: anios,
            datasets: [
                {
                label: 'Aprobadas Ciclo Corto',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgb(229, 226, 179)',
                borderColor: 'blue',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(172, 216, 25, 0.4)',
                pointBorderColor: '#FF0000',
                data: totalapciclocorto
    
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

export default BarChartMultIndicesPACLC