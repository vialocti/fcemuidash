import { Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { agruparYCalcularResumen } from '../../../utils/helpers/calculopromedioindices';
import DetalleCarreraModal from './modales/DetalleCarreraModal';


const PromediosPorCarrera = ({ data, indcur }) => {
  const promediosPorcarrera = agruparYCalcularResumen(data, 'carrera');
  // console.log(data); // El console.log original se mantiene si es necesario

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const calcularFondo = (indice) => {
    // Asegurarse de que el índice se compare como número
    const indiceNumerico = parseFloat(indice);
    if (indiceNumerico >= indcur) {
      return '#33810cff'; // Verde
    } else if (indiceNumerico >= indcur - 0.05) {
      return '#e59198ff'; // Rojo claro (Se cambió a un color más vibrante para diferenciarse mejor)
    } else {
      return '#a52731ff'; // Rojo oscuro
    }
  };

  const mostrardatos = (item) => {
    if (!item) return;

   // console.log('modal'); // El console.log original se mantiene si es necesario
    const datosFiltrados = data.filter(elemento => elemento.carrera === item.nombre);
    // console.log(datosFiltrados); // El console.log original se mantiene si es necesario

    // 1. Guardar los datos filtrados en el estado
    setModalData(datosFiltrados);
    setModalTitle(`Detalle para Carrera: ${item.nombre}`);
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
        Promedios por Carrera
      </Typography>
      <Grid container spacing={2}>
        {promediosPorcarrera.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4} // Aumentado a md=4 para mejor visualización
            lg={3} // Vuelto a md=2 si prefieres que queden más angostos
            key={`${item.nombre}-${index}`}
            onClick={() => mostrardatos(item)}
            sx={{ cursor: 'wait' }} // Indicar que es clickeable
          >
            <Paper
              elevation={3}
              sx={{
                p: 2, // Aumentado el padding
                textAlign: 'center',
                backgroundColor: calcularFondo(item.indice_cursada),
                color: 'white', // Texto blanco para mejor contraste
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' }
              }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {item.nombre}
              </Typography>
              <Typography variant="body2">
                <strong>Inscriptos:</strong> {item.total_inscriptos}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Índice Cursada: {item.indice_cursada.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Índice E1: {item.indice_e1 ? item.indice_e1.toFixed(2) : item.indice_cursada.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Índice E2: {item.indice_e2 ? item.indice_e1.toFixed(2) : item.indice_e1 ? item.indice_e1.toFixed(2) : item.indice_cursada.toFixed(2)}
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
        tipoR={"C"}
      />
    </>
  );
};

export default PromediosPorCarrera;