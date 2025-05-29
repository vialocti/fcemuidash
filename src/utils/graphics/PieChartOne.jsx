import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



function PieChartOne ({datos, labels, label}) {
    ChartJS.register(ArcElement, Tooltip, Legend);

 const data = {
  labels: labels,
  datasets: [
    {
      label: label,
      data: datos,
      backgroundColor: [
         'rgba(236, 156, 173, 0.2)',
        'rgba(4, 50, 80, 0.2)',
        'rgba(18, 80, 4, 0.2)',
      
      ],
      borderColor: [
         '#a10628',
        '#0f598a',
        '#090998'
       
      ],
      borderWidth: 1,
    },
  ],
};

 return(
   <Pie data={data} /> 
 )
}
export default PieChartOne