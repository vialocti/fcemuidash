import {
  Modal,
  Box,
  Typography,
  Grid,
   Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";

// Estilos para la caja del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Ajusta el ancho
  maxHeight: '90vh', // Altura máxima
  overflowY: 'auto', // Scroll si es necesario
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 const localizedTextsMap = {
    columnMenuUnsort: "No Orden",
    columnMenuSortAsc: "Orden Asc",
    columnMenuSortDesc: "Orden Desc",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuManageColumns: "Admin Columnas"
    
  };

const DetalleCarreraModal = ({ open, handleClose, data, title, tipoR }) => {

  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Verificamos que el modal esté abierto, la data exista, y que haya al menos una fila
    if (open && data && data.length > 0) {
      // Selecciona la primera fila de la data
      setSelectedRow(data[0]);
    } else if (!open) {
      // Opcional: Limpiar la selección cuando el modal se cierra
      setSelectedRow(null);
    }
  }, [open, data]); // Dependencias: Se ejecuta cuando 'open' o 'data' cambian.
  
  let columns = [];
  if (tipoR==="C"){
  columns = [
    {
      field: "actividad_nombre",
      headerName: "Actividad",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "sede",
      headerName: "Sede",
      type: "string",
      width: 70,
      editable: false,
    },{
      field: "periodo",
      type: "string",
      headerName: "Per.Cursada",
      width: 150,
      editable: false,
    },
    {
      field: "indice_cursada",
      headerName: "Ind.Cursada",
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "indice_e1",
      type: "number",
      headerName: "Ind.C.Corto",
      width: 100,
      editable: false,
    },
    {
      field: "indice_e2",
      type: "number",
      headerName: "ind.C.Largo",
      width: 100,
      editable: false,
    },
    
    
  ];

}else if (tipoR==="P"){ 

 columns = [
    {
      field: "actividad_nombre",
      headerName: "Actividad",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "sede",
      headerName: "Sede",
      type: "string",
      width: 70,
      editable: false,
    },{
      field: "carrera",
      type: "string",
      headerName: "Carrera",
      width: 70,
      editable: false,
    },
    {
      field: "indice_cursada",
      headerName: "Ind.Cursada",
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "indice_e1",
      type: "number",
      headerName: "Ind.C.Corto",
      width: 100,
      editable: false,
    },
    {
      field: "indice_e2",
      type: "number",
      headerName: "ind.C.Largo",
      width: 100,
      editable: false,
    },
    
    
  ];


}
  
  // Función para manejar el clic en la fila
  const handleRowClick = (params) => {
   
    setSelectedRow(params.row);
  };

  return (
   <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="detalle-carrera-modal-title"
      aria-describedby="detalle-carrera-modal-description"
    >
      <Box sx={style}>
        {/* Encabezado del Modal (Título y Botón de Cerrar) */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="detalle-carrera-modal-title" variant="h5" component="h2" fontWeight="bold">
                {title}
            </Typography>
            <IconButton onClick={handleClose} aria-label="cerrar">
                <CloseIcon />
            </IconButton>
        </Box>
        
        {/* 2. Contenedor principal con Grid para dividir en 2 columnas */}
        <Grid container spacing={2}>
            {/* Columna Izquierda: DataGrid */}
            <Grid item xs={12} md={8}> {/* Ocupa 7/12 del ancho en pantallas medianas y mayores */}
                <div style={{ height: 600, width: "100%" }}> {/* Ajustamos la altura y el ancho al 100% de la celda */}
                    <DataGrid
                      rows={data}
                      columns={columns}
                      getRowId={(row) => row.nombre + row.sede + row.periodo}
                      localeText={localizedTextsMap}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 15 },
                        },
                      }}
                      pageSizeOptions={[15, 20]}
                      // Desactivamos checkboxSelection si solo queremos un detalle a la derecha
                      // Si lo necesita, puede usar onRowSelectionModelChange en su lugar.
                      // checkboxSelection 
                      
                      // *** Capturar el clic en la fila ***
                      onRowClick={handleRowClick}
                      
                      // Resaltar la fila seleccionada (opcional, necesita un poco más de configuración)
                      // rowSelectionModel={selectedRow ? [selectedRow.id] : []}
                    />
                </div>
            </Grid>
            
            {/* Columna Derecha: Detalle del Registro */}
            <Grid item xs={12} md={4}> {/* Ocupa 5/12 del ancho restante */}
                <Paper elevation={3} sx={{ p: 2, height: 600, overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Detalle del Registro Seleccionado
                    </Typography>
                    
                    {selectedRow ? (
                        <Box>
                            {/* Muestra dinámicamente la información del selectedRow */}
                            <Typography variant="body1">
                                Actividad: {selectedRow.actividad_nombre} ** {selectedRow.nombre} **
                            </Typography>
                            <Typography variant="body1">
                                Sede: {selectedRow.sede}
                            </Typography>
                            {tipoR==="P" && (
                            <Typography variant="body1">
                                Período: {selectedRow.carrera}
                            </Typography>
                            )}
                             {tipoR==="C" && (
                            <Typography variant="body1">
                                Período: {selectedRow.periodo}
                            </Typography>
                            )}

                            <Typography variant="body1">
                                Inscriptos: {selectedRow.total_inscriptos}
                            </Typography>
                            <Typography variant="body1">
                                Regulares: {selectedRow.regular}
                            </Typography>
                            <Typography variant="body1">
                                libres: {selectedRow.reprobados}
                            </Typography>
                            <Typography variant="body1">
                                Libres*: {selectedRow.ausentes}
                            </Typography>
                            <Typography variant="body1">
                                Promocionados: {selectedRow.promocionados}
                            </Typography>


                            <Typography variant="body1">
                                Ind. Cursada: {selectedRow.indice_cursada}
                            </Typography>
                            <Typography variant="body1">
                                Ind. C. Corto: {selectedRow.indice_e1}
                            </Typography>
                            <Typography variant="body1">
                                Ind. C. Largo: {selectedRow.indice_e2}
                            </Typography>

                            {/*
                            <Box mt={3}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Información completa:
                                </Typography>
                                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                                    Esto muestra el objeto JSON completo (útil para debug) 
                                    {JSON.stringify(selectedRow, null, 2)}
                                </pre>
                            </Box>
                            */}

                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Selecciona una fila de la tabla para ver su detalle completo aquí.
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DetalleCarreraModal;