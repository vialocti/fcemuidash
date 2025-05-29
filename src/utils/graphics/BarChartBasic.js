import React from 'react';
import {
    Bar
} from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartBasic({ datos, etiquetas, label }) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)
    console.log(datos)





    const data = {
        labels: etiquetas,
        datasets: [{
            label: label,

            backgroundColor: ['rgba(150,150,255,1)',
                'rgba(255,150,255,1)',
                'rgba(150,255,255,1)',
                'rgba(255,155,155,1)',
                'rgba(150,15,155,1)',
                'rgba(15,150,155,1)'
            ],

            borderColor: 'black',
            borderWidth: 1,
            hoverBackgrounColor: 'rgba(0,255,222,0.4)',
            hoverBorderColor: '#FF0000',
            data: datos

        }]
    };

    const opciones = {
        maintenAspectRatio: false,
        responsive: true,
    }




    return (
        <Bar data={data} options={opciones} />
    )

}

export default BarChartBasic