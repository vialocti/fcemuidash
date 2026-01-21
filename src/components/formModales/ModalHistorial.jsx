import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box, Chip
} from '@mui/material';

export const ModalHistorial = ({ abierto, cerrar, legajo, nombre, historia }) => {

    const formatearFecha = (fechaISO) => {
        return new Date(fechaISO).toLocaleDateString('es-AR');
    };

    return (
        <Dialog
            open={abierto}
            onClose={cerrar}
            maxWidth="lg" // Aumentado a lg para mejor lectura de nombres de actividades
            fullWidth
            scroll="paper" // El scroll se queda dentro del contenido del modal
        >
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', mb: 1 }}>
                <Typography variant="h6" component="div">
                    Historia Académica: <strong>{legajo}</strong> - {nombre}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}> {/* Quitamos padding para que la tabla llegue a los bordes */}
                {historia && historia.length > 0 ? (
                    <TableContainer
                        sx={{
                            maxHeight: '60vh', // Aproximadamente 15-20 filas dependiendo del monitor
                            minHeight: '400px'
                        }}
                    >
                        <Table stickyHeader size="small" aria-label="tabls historia academica">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Año Acad.</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Año Cursada</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Código</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Actividad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Fecha</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Nota</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Tipo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historia.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        hover // Efecto visual al pasar el mouse
                                        sx={{ '&:nth-of-type(odd)': { bgcolor: '#fafafa' } }} // Filas cebra
                                    >
                                        <TableCell>{item.anio_academico}</TableCell>
                                        <TableCell align="center">{item.anio_de_cursada}°</TableCell>
                                        <TableCell>{item.actividad_codigo}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{item.actividad_nombre}</TableCell>
                                        <TableCell>{formatearFecha(item.fecha)}</TableCell>
                                        <TableCell align="center">
                                            <Box sx={{
                                                fontWeight: 'bold',
                                                color: parseInt(item.nota) >= 4 ? 'success.main' : 'error.main',
                                                fontSize: '1.1rem'
                                            }}>
                                                {item.nota}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={item.tipo || 'N/A'}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="textSecondary">Cargando información o sin datos disponibles...</Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Button onClick={cerrar} variant="contained" color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};