import { Line } from "react-chartjs-2";
import React from 'react'
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

function LineChartMultEgre({ datos, sexo }) {

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
    let totalcpn = []
    let totalla = []
    let totalle = []
    let totallnrg = []
    let totalllo = []
    let totalcp = []



    if (sexo === 'T') {
        datos.map((ele) => {
            anios.push(ele.anio)
            totalcpn.push(ele.cpnf + ele.cpnm)
            totalla.push(ele.lam + ele.laf)
            totalle.push(ele.lem + ele.lef)
            totallnrg.push(ele.lnrgm + ele.lnrgf)
            totalllo.push(ele.llom + ele.llof)
            totalcp.push(ele.cpm + ele.cpf)

        })
    } else if (sexo === 'M') {
        datos.map((ele) => {
            anios.push(ele.anio)
            totalcpn.push(ele.cpnm)
            totalla.push(ele.lam)
            totalle.push(ele.lem)
            totallnrg.push(ele.lnrgm)
            totalllo.push(ele.llom)
            totalcp.push(ele.cpm)

        })
    } else if (sexo === 'F') {
        datos.map((ele) => {
            anios.push(ele.anio)
            totalcpn.push(ele.cpnf)
            totalla.push(ele.laf)
            totalle.push(ele.lef)
            totallnrg.push(ele.lnrgf)
            totalllo.push(ele.llof)
            totalcp.push(ele.cpf)

        })
    }


    const datosset = {
        labels: anios,
        datasets: [{
            label: 'Egresados CPN',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,0,255,1)',
            borderColor: 'blue',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(0,255,222,0.4)',
            pointBorderColor: '#FF0000',
            data: totalcpn

        },
        {
            label: 'Egresados LA',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,255,0,1',
            borderColor: 'green',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totalla

        },
        {
            label: 'Egresados LE',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'red',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totalle

        },
        {
            label: 'Egresados LNRG',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(0,255,255,1)',
            borderColor: 'rgba(0,255,255,1)',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totallnrg

        },
        {
            label: 'Egresados LLO',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,0,255,1)',
            borderColor: 'rgba(255,0,255,1)',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totalllo

        },
        {
            label: 'Egresados CP',
            tension: 0.2,
            fill: false,
            backgroundColor: 'rgba(255,255,0,1)',
            borderColor: 'rgba(255,255,0,1)',
            pointRadius: 5,
            pointBackgrounColor: 'rgba(255,255,0,0.4)',
            pointBorderColor: '#FFFF00',
            data: totalcp

        }
        ]
    };

    const opciones = {
        maintenAspectRatio: true,
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
export default LineChartMultEgre