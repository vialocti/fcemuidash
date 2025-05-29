import React from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMultIndicesTotICL({ datos}) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

    let anios = []
    let totalIndiceC = []
    let totalIndiceCC = []
    let totalIndiceCL = []
   
    



   
        datos.map((ele) => {
            anios.push(ele.anio_academico)
            totalIndiceC.push(ele.promedioindicecursada )
            totalIndiceCC.push(ele.promedioindicecorto)
            totalIndiceCL.push(ele.promedioindicelargo)
           
        })
       
        const datosset = {
            labels: anios,
            datasets: [{
                label: 'Ind.Cursada',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(0,0,255,1)',
                borderColor: 'blue',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(0,255,222,0.4)',
                pointBorderColor: '#FF0000',
                data: totalIndiceC
    
            },
            {
                label: 'Ind.Ciclo Corto',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(0,255,0,1',
                borderColor: 'green',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(255,255,0,0.4)',
                pointBorderColor: '#FFFF00',
                data: totalIndiceCC
    
            },
            {
                label: 'Ind.Ciclo Largo',
                tension: 0.2,
                fill: false,
                backgroundColor: 'rgba(255,0,0,1)',
                borderColor: 'red',
                pointRadius: 5,
                pointBackgrounColor: 'rgba(255,255,0,0.4)',
                pointBorderColor: '#FFFF00',
                data: totalIndiceCL
    
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

export default BarChartMultIndicesTotICL