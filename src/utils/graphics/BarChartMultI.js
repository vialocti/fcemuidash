import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'


function BarChartMultI({ datos, tipo }) {

    //console.log(datos, etiquetas)
    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

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



    const data = {
        labels: anios,
        datasets: [{
            label: labelPrima,
            backgroundColor: 'rgba(0,190,255,1)',
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgrounColor: 'rgba(0,255,222,0.4)',
            hoverBorderColor: '#FF0000',
            data: cantidadI

        },

        {
            label: labelCC,
            backgroundColor: 'rgba(190,190,255,1)',
            borderColor: 'red',
            borderWidth: 1,
            hoverBackgrounColor: 'rgba(0,255,222,0.4)',
            hoverBorderColor: '#FF0000',
            data: cantidadC

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

export default BarChartMultI