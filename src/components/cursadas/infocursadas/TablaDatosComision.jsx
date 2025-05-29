import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';

const TablaDatosComision = ({ datos, comisionN }) => {
    
  const filas = Array.isArray(datos) ? datos : [];

  const exportarCSV = () => {
    const encabezado = ['Legajo', 'Documento', 'Apellido', 'Nombre', 'Cant.RAN', 'Últ.RAN','Promedio', 'Coef.Carrera', 'Recursa', 'Examenes', 'Reg.Vig'];
    const filasCSV = filas.map((al) => [
      al.legajo,
      al.nro_documento,
      al.apellido,
      al.nombres,
      al.perdidasreg ?? 0,
      al.ultimaperdireg ?? '',
      al.promedioca ?? '',
      al.coef_tcarrera ?? '',
      al.recursa > 0 ? 'S' :'',
      al.cantidadexamen ?? '',
      al.regvigente ?? ''
    ]);
   
    const contenido = [encabezado, ...filasCSV].map(e => e.join(';')).join('\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `alumnos_comision_${comisionN}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (filas.length === 0) {
    return <Typography variant="body2" sx={{ p: 2 }}>No hay datos disponibles.</Typography>;
  }

  return (
 

    <Box>
      {/* Encabezado fijo */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Listado Comisión</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={exportarCSV}
          startIcon={<DownloadIcon />}
          sx={{ mt: 2, mb: 1, mr: 2 }}
        >
          Exportar CSV
        </Button>
      </Box>

      {/* Tabla con scroll */}
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table stickyHeader size="small" aria-label="tabla de alumnos">
          <TableHead>
            <TableRow>
              <TableCell><strong>Legajo</strong></TableCell>
              <TableCell><strong>Documento</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell align="center"><strong>Cant.RAN</strong></TableCell>
              <TableCell align="center"><strong>Últ.RAN</strong></TableCell>
              <TableCell align='center'><strong>Promedio</strong></TableCell>
              <TableCell align="center"><strong>Coef.Carrera</strong></TableCell>
              <TableCell align="center"><strong>Recursa</strong></TableCell>
              <TableCell align="center"><strong>Cant.Ex.Rend</strong></TableCell>
              <TableCell align="center"><strong>Reg.Vigente</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filas.map((alumno, index) => (
              <TableRow key={index}>
                <TableCell>{alumno.legajo}</TableCell>
                <TableCell>{alumno.nro_documento}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.nombres}</TableCell>
                <TableCell align="center">{alumno.perdidasreg ?? 0}</TableCell>
                <TableCell align="center">{alumno.ultimaperdireg ?? '—'}</TableCell> 
                <TableCell align="center">{alumno.promedioca ?? '—'}</TableCell>
                <TableCell align="center">{alumno.coef_tcarrera ?? '—'}</TableCell> 
                <TableCell align="center">{alumno.recursa > 0 ? 'S' : 'N'}</TableCell>
                <TableCell align="center">{alumno.cantidadexamen ?? 0}</TableCell>
                <TableCell align="center">{alumno.regvigente ?? 'N'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
  );
};

export default TablaDatosComision;
