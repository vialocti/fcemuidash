import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
  Box
} from '@mui/material';

/**
 * Componente reutilizable para mostrar un diálogo de error
 * @param {object} props - Propiedades del componente
 * @param {boolean} props.open - Indica si el diálogo debe estar abierto.
 * @param {string} props.message - Mensaje detallado del error.
 * @param {string} [props.title='Error al Cargar Datos'] - Título del diálogo.
 * @param {function} props.handleClose - Función para cerrar el diálogo.
 */
const ErrorAlertDialog = ({ open, message, title = '⚠️ Error al Cargar Datos', handleClose }) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ bgcolor: 'error.main', color: 'white' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Alert severity="error" variant="filled">
          <AlertTitle>Fallo en la operación</AlertTitle>
          <Box component="p" sx={{ whiteSpace: 'pre-wrap' }}>
            No fue posible completar la acción solicitada.
            <br/>
            <br/>
            **Detalle del Error:** {message}
          </Box>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorAlertDialog;