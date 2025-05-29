import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { normalDistribution } from '../../utils/normalDistribucion';
import { Box, Button, Container, Modal, Typography } from '@mui/material';


ChartJS.register(...registerables);

const ModalGrafico = ({ open, onClose, datosgT, datosgP }) => {

 // const [dataSample, setDataSample] = useState('');
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [chartData, setChartData] = useState([]);

  const [meanT, setMeanT] = useState(0);
  const [stdDevT, setStdDevT] = useState(1);
  const [chartDataT, setChartDataT] = useState([]);
  

  
  const calculateStatistics = (tp) => {

  

    if (tp==='P'){
    const sample = datosgP.split(',').map(Number).filter(Boolean);
  
    const n = sample.length;

    if (n > 0) {
      const meanValue = sample.reduce((acc, val) => acc + val, 0) / n;
      const variance = sample.reduce((acc, val) => acc + (val - meanValue) ** 2, 0) / n;
      const stdDevValue = Math.sqrt(variance);

      setMean(meanValue);
      setStdDev(stdDevValue);
      setChartData(normalDistribution(meanValue, stdDevValue));
      
    } else {
      alert("Por favor, ingresa una muestra válida.");
    }

    }else if(tp==='T'){

       
    const sample = datosgT.split(',').map(Number).filter(Boolean);
  
    const n = sample.length;

    if (n > 0) {
      const meanValue = sample.reduce((acc, val) => acc + val, 0) / n;
      const variance = sample.reduce((acc, val) => acc + (val - meanValue) ** 2, 0) / n;
      const stdDevValue = Math.sqrt(variance);

      setMeanT(meanValue);
      setStdDevT(stdDevValue);
      setChartDataT(normalDistribution(meanValue, stdDevValue));

     
    } else {
      alert("Por favor, ingresa una muestra válida.");
    }
    }
  };

  const dataT = {
    labels: Array.from({ length: chartDataT.length }, (_, i) => ((i - 50) / 10 + meanT).toFixed(2)), // Rango de -5 a 5 alrededor de la media
    datasets: [
      {
        label: 'Distribución Normal',
        data: chartDataT,
        borderColor: 'rgba(100, 192, 100, 1)',
        backgroundColor: 'rgba(100, 192, 100, 0.9)',
        fill: true,
      },
    ],
  };    



  
 const data = {
    labels: Array.from({ length: chartData.length }, (_, i) => ((i - 50) / 10 + mean).toFixed(2)), // Rango de -5 a 5 alrededor de la media
    datasets: [
      {
        label: 'Distribución Normal',
        data: chartData,
        borderColor: 'rgba(100, 192, 100, 1)',
        backgroundColor: 'rgba(100, 192, 100, 0.9)',
        fill: true,
      },
    ],
  };
    

  useEffect(()=>{
    calculateStatistics('P')
    calculateStatistics('T')

  },[])

  

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            backgroundColor="white"
        >
    <Container maxWidth={'xl'} sx={{bgcolor: '#f0f4c3'}}>
   
      <h2>Distribucion Normal - Promedio Gral y Tiempo de Egreso</h2>
      <Button variant='contained' onClick={onClose}>Cerrar Muestra Graficos</Button>
      <Box
                    sx={{
                        
                        top: '30%',
                        left: '50%',
                        display: 'flex',
                        flexDirection: 'column', // Organizar las filas en columna
          
                    }}
                >
    
      <Box 
        display='flex'
        gap={4}
        >
        <Box width={'600px'} height={'400px'} marginTop={1}>     
        <Typography variant='h6'>Promedio Gral </Typography>     
            {chartData.length > 0 && <Line data={data} />}
        </Box>
     
        <Box width={'600px'} height={'400px'} marginTop={4}>
        <Typography variant='h6'>Valores (promedio y desvioTipo)</Typography>     
            <Typography variant='h6'>Promedio: {mean.toFixed(2)}</Typography>
            <Typography variant='h6'>Desvio Tipo: {stdDev.toFixed(2)}</Typography>
            </Box>
      </Box>
      <Box 
        display='flex'
        gap={4}
        >

     <Box width={'600px'} height={'400px'} marginTop={1}>
        <Typography variant='h6'>Tiempo de Engreso</Typography>     
      {chartDataT.length > 0 && <Line data={dataT} />}
     </Box>
     
     <Box width={'600px'} height={'400px'} marginTop={4}>
     <Typography variant='h6'>Valores (promedio y desvioTipo)</Typography>  
        <Typography variant='h6'>Promedio: {meanT.toFixed(2)}</Typography>
        <Typography variant='h6'>desvio Tipo: {stdDevT.toFixed(2)}</Typography>
     </Box>
     
         
     </Box>

    
    </Box>
    </Container>
  
        </Modal>
    );
};

export default ModalGrafico;
