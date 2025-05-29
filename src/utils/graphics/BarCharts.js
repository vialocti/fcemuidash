import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarCharts({ datos, etiquetas, anioI, ingre }) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)
    console.log(datos)
    let AI = []
    AI.push(Number(anioI))
    let IT = []
    IT.push(ingre)
    let anios = AI.concat(etiquetas)
    let cantidad = IT.concat(datos)


    const data = {
        labels: anios,
        datasets: [{
            label: 'inscriptos',
            backgroundColor: 'rgba(190,190,255,1)',
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgrounColor: 'rgba(0,255,222,0.4)',
            hoverBorderColor: '#FF0000',
            data: cantidad

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
export default BarCharts