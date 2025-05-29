import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NotDataFound = ({ message, messageone }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 700 }}>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          No se encontraron datos de la Busqueda seleccionada
        </Typography>
        {message && (
          <Typography variant="body1" color="textSecondary">
            {message}
          </Typography>
        )}
        {messageone && (
          <Typography variant="body1" color="textSecondary">
            {messageone}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default NotDataFound;
