import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { normalDistribution } from '../../utils/normalDistribucion';
import { Box, Button, Container, Modal, Typography } from '@mui/material';


ChartJS.register(...registerables);

const ModalGrafico = ({ open, onClose, datosg }) => {

 // const [dataSample, setDataSample] = useState('');
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [chartData, setChartData] = useState([]);

  const calculateStatistics = () => {
    const sample = datosg.split(',').map(Number).filter(Boolean);
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
    calculateStatistics()

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
   
      <h2>Distribucion Normal</h2>
      <Button onClick={onClose}>Cerrar</Button>
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
        gap={1}
        >
        <Box width={'600px'} height={'400px'} marginTop={1}>     
            {chartData.length > 0 && <Line data={data} />}
        </Box>
     
        <Box width={'600px'} height={'400px'} marginTop={1}>
            <Typography variant='h6'>{mean}</Typography>
            <Typography variant='h6'>{stdDev}</Typography>
            </Box>
      </Box>
      <Box 
        display='flex'
        gap={1}
        >
     <Box width={'600px'} height={'400px'} marginTop={1}>     
      {chartData.length > 0 && <Line data={data} />}
     </Box>
     
     <Box width={'600px'} height={'400px'} marginTop={1}>
        <Typography variant='h6'>{mean}</Typography>
        <Typography variant='h6'>{stdDev}</Typography>
     </Box>
     
         
     </Box>

    
    </Box>
    </Container>
  
        </Modal>
    );
};

export default ModalGrafico;
