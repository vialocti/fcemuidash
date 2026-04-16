import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Fade,
  Button,
  Stack, Grid
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from "react-csv";

const InfoMuestraInscriptosSede = ({ sede, materias, total }) => {
  const [busqueda, setBusqueda] = useState('');
  const [muestra, setMuestra] = useState([]);

  // Sincronizar y filtrar localmente según el buscador
  useEffect(() => {
    if (materias) {
      const filtrado = materias.filter(m => 
        m.actividad.toUpperCase().includes(busqueda.toUpperCase()) ||
        m.actividad.toUpperCase().includes(busqueda.toUpperCase()) ||
        String(m.comi).includes(busqueda)
      );
      setMuestra(filtrado);
    }
  }, [materias, busqueda]);

  // Cálculo del total dinámico según lo que se muestra
  const totalVisible = muestra.reduce((acc, curr) => acc + Number(curr.tot), 0);

  return (
    <Fade in={true} timeout={600}>
      <Box sx={{ mt: 2 }}>
        {/* PANEL DE CONTROL INTERNO (Título + Buscador + Exportar) */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: '16px 16px 0 0', 
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderBottom: 'none'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
                {sede}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registros: <b>{muestra.length}</b> | Suma Inscriptos: <b>{totalVisible}</b>
              </Typography>
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="flex-end"
              >
                <TextField
                  size="small"
                  placeholder="Filtrar actividad o comisión..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  sx={{ width: { md: '300px' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                {muestra.length > 0 && (
                  <CSVLink 
                    data={muestra} 
                    filename={`Reporte_${sede.replace(/\s+/g, '_')}.csv`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button 
                      variant="outlined" 
                      color="success" 
                      startIcon={<FileDownloadIcon />}
                      sx={{ 
                        height: '40px', 
                        whiteSpace: 'nowrap',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: 2
                      }}
                    >
                      Exportar CSV
                    </Button>
                  </CSVLink>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* TABLA CON SCROLL Y CABECERA FIJA */}
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            borderRadius: '0 0 16px 16px', 
            border: '1px solid #e2e8f0',
            maxHeight: 550 
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#f1f5f9', fontWeight: 800 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MenuBookIcon fontSize="inherit" />
                    <span>ACTIVIDAD</span>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ bgcolor: '#f1f5f9', fontWeight: 800 }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <ConfirmationNumberIcon fontSize="inherit" />
                    <span>COMISIÓN</span>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={{ bgcolor: '#f1f5f9', fontWeight: 800 }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    <PeopleAltIcon fontSize="inherit" />
                    <span>INSCRIPTOS</span>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {muestra.map((dato, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
                      {dato.actividad}
                    </Typography>
                   
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={dato.ncomision} 
                      size="small" 
                      sx={{ fontWeight: 'bold', bgcolor: '#f8fafc' }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 900, 
                        color: Number(dato.tot) > 80 ? '#ef4444' : '#334155' 
                      }}
                    >
                      {dato.tot}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {muestra.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      No hay datos que coincidan con la búsqueda.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  );
};

export default InfoMuestraInscriptosSede;