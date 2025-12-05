import { Grid, Paper, Typography } from '@mui/material';

import React,{useState} from 'react';
import { agruparYCalcularResumen } from '../../../utils/helpers/calculopromedioindices';
import DetalleCarreraModal from './modales/DetalleCarreraModal';
const PromediosPorPeriodo = ({ data, indcur }) => {
  const promediosPorPeriodo = agruparYCalcularResumen(data, 'periodo');
  //console.log(promediosPorPeriodo)
   // Estado para el modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
  const calcularFondo = (indice) => {
    if (indice >= indcur) {
      return '#33810cff'; // Verde claro
    } else if (indice >= indcur-0.05) {
      return '#e59198ff'; // Rojo claro
    } else {
      return '#a52731ff'; // Rojo claro
    }
  };

  const mostrardatos = (item) => {
    if (!item) return;

    //console.log(data); // El console.log original se mantiene si es necesario
    const datosFiltrados = data.filter(elemento => elemento.periodo === item.nombre);
    // console.log(datosFiltrados); // El console.log original se mantiene si es necesario

    // 1. Guardar los datos filtrados en el estado
    setModalData(datosFiltrados);
    setModalTitle(`Detalle Por Periodo: ${item.nombre}`);
    // 2. Abrir el modal
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData([]);
    setModalTitle('');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Promedios por Período
      </Typography>
      <Grid container spacing={2}>
        {promediosPorPeriodo.map((item, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={`${item.nombre}-${index}`}
            onClick={() => mostrardatos(item)}
            sx={{ cursor: 'wait' }} // Indicar que es clickeable
          >
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: calcularFondo(item.indice_cursada )}}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {item.nombre}
              </Typography>
              <Typography variant="h6">
                <strong>Total Inscriptos:</strong> {item.total_inscriptos}
              </Typography>
              <Typography variant="h6">
                <strong>Índice Cursada:</strong> {item.indice_cursada.toFixed(2)}
              </Typography>
              <Typography variant="h6">
                <strong>Índice E1:</strong> {item.indice_e1.toFixed(2)}
              </Typography>
              <Typography variant="h6">
                <strong>Índice E2:</strong> {item.indice_e2.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
       {/* Componente Modal */}
      <DetalleCarreraModal
        open={modalOpen}
        handleClose={handleCloseModal}
        data={modalData}
        title={modalTitle}
        tipoR={"P"}
      />
    </>
  );
};

export default PromediosPorPeriodo;
