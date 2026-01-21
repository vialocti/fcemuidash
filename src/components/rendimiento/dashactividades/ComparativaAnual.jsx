import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Box, Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function ComparativaAnual({ data }) {
    // Estado para controlar qué líneas son visibles
    const [hiddenLines, setHiddenLines] = useState([]);

    const prepararDatosGrafico = () => {
        const agrupar = data.reduce((acc, curr) => {
            const anio = curr.anio_academicoint4 || curr.anio_academico;
            if (!acc[anio]) {
                acc[anio] = { anio, reg: [], prom: [], cursada: [], e1: [], e2: [] };
            }
            acc[anio].reg.push(Number(curr.relacion_regular) || 0);
            acc[anio].prom.push(Number(curr.relacion_promocion) || 0);
            acc[anio].cursada.push(Number(curr.indice_cursada) || 0);
            acc[anio].e1.push(Number(curr.indice_e1) || 0);
            acc[anio].e2.push(Number(curr.indice_e2) || 0);
            return acc;
        }, {});

        return Object.values(agrupar).map(d => ({
            anio: d.anio,
            'Regular': (d.reg.reduce((a, b) => a + b, 0) / d.reg.length).toFixed(2),
            'Promocion': (d.prom.reduce((a, b) => a + b, 0) / d.prom.length).toFixed(2),
            'Cursada': (d.cursada.reduce((a, b) => a + b, 0) / d.cursada.length).toFixed(2),
            'E1': (d.e1.reduce((a, b) => a + b, 0) / d.e1.length).toFixed(2),
            'E2': (d.e2.reduce((a, b) => a + b, 0) / d.e2.length).toFixed(2),
        })).sort((a, b) => a.anio - b.anio);
    };

    const datos = prepararDatosGrafico();

    // Función para ocultar/mostrar líneas al hacer clic en la leyenda
    const toggleLine = (e) => {
        const { dataKey } = e;
        setHiddenLines(prev =>
            prev.includes(dataKey) ? prev.filter(l => l !== dataKey) : [...prev, dataKey]
        );
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Análisis Comparativo Histórico
                </Typography>

                <Grid container spacing={2}>
                    {/* COLUMNA IZQUIERDA: TABLA (30% aprox) */}
                    <Grid item xs={12} md={4}>
                        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Año</TableCell>
                                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Regular</TableCell>
                                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Promocion</TableCell>
                                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Ind.Cursada</TableCell>
                                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Ind.CC</TableCell>
                                        <TableCell align="right" sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Ind.CL</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datos.map((row) => (
                                        <TableRow key={row.anio} hover>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{row.anio}</TableCell>
                                            <TableCell align="right">{row.Regular}</TableCell>
                                            <TableCell align="right">{row.Promocion}</TableCell>
                                            <TableCell align="right">{row.Cursada}</TableCell>
                                            <TableCell align="right">{row.E1}</TableCell>
                                            <TableCell align="right">{row.E2}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                            * Datos promediados por año académico.
                        </Typography>
                    </Grid>

                    {/* COLUMNA DERECHA: GRÁFICO (70% aprox) */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <LineChart data={datos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="anio" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend
                                        onClick={toggleLine}
                                        wrapperStyle={{ cursor: 'pointer', paddingTop: '10px' }}
                                    />

                                    <Line
                                        hide={hiddenLines.includes('Regular')}
                                        type="monotone" dataKey="Regular" stroke="#2e7d32" strokeWidth={3} dot={{ r: 4 }}
                                    />
                                    <Line
                                        hide={hiddenLines.includes('Promocion')}
                                        type="monotone" dataKey="Promocion" stroke="#ed6c02" strokeWidth={3} dot={{ r: 4 }}
                                    />
                                    <Line
                                        hide={hiddenLines.includes('Cursada')}
                                        type="monotone" dataKey="Cursada" stroke="#9c27b0" strokeWidth={2} strokeDasharray="5 5"
                                    />
                                    <Line
                                        hide={hiddenLines.includes('E1')}
                                        type="monotone" dataKey="E1" stroke="#673ab7" strokeWidth={2}
                                    />
                                    <Line
                                        hide={hiddenLines.includes('E2')}
                                        type="monotone" dataKey="E2" stroke="#3f51b5" strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                        <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', color: 'primary.main' }}>
                            💡 Haz clic en los nombres de la leyenda para ocultar/mostrar líneas
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}