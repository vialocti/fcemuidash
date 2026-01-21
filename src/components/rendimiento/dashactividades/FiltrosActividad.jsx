import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Grid, TextField, MenuItem,
    Button, FormControl, InputLabel, Select, Typography, Divider,
    CircularProgress // Corregido: Importación faltante
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Corregido: Importación faltante
import { generarInformeIAChat } from '../../../services/servicesChatGpt';

const sedes = [
    { id: 0, n: 'Todas' },
    { id: 1, n: 'Mendoza' },
    { id: 2, n: 'San Rafael' },
    { id: 3, n: 'Gral Alvear' },
    { id: 4, n: 'Este' }
];

const propuestas = [
    { id: 0, n: 'Todas' },
    { id: 1, n: 'CPN' },
    { id: 2, n: 'LA' },
    { id: 3, n: 'LE' },
    { id: 6, n: 'LNRG' },
    { id: 7, n: 'LLO' },
    { id: 8, n: 'CP' }
];

const periodos = [
    'Todos',
    '1er Cuatrimestre',
    '2do Cuatrimestre',
    '1er Bimestre',
    '2do Bimestre',
    '3er Bimestre',
    '4to Bimestre',
    'Anual'
];

// Corregido: Agregamos data, promedios y filtrosAplicados como Props
export default function FiltrosDashboard({
    onSearch,
    traerActividadesHistoricas,
    data,
    promedios,
    filtrosAplicados
}) {
    const [materias, setMaterias] = useState([]);
    const [cargandoIA, setCargandoIA] = useState(false);
    const [filtros, setFiltros] = useState({
        sede: 0,
        propuesta: 0,
        anioInicio: 2023,
        anioFin: 2023,
        periodo: 'Todos',
        actividad: 'Todas'
    });

    const generarInformeIA = async () => {
        if (!data || data.length === 0) {
            alert("Primero debe realizar una búsqueda para obtener datos.");
            return;
        }

        setCargandoIA(true);

        try {
            //console.log(data, promedios, filtrosAplicados)
            // Llamamos al método del servicio (ajusta el nombre según tu importación)
            const response = await generarInformeIAChat(data, promedios, filtrosAplicados);
            //console.log(response)
            // Crear el link de descarga con el resultado del servicio

            const blob = new Blob([response], { type: 'application/pdf' });

            // DEBUG: Si esto da 0, el servicio no está pasando bien el dato
            //console.log("Tamaño final del Blob:", blob.size);

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Informe_IA.pdf`);

            document.body.appendChild(link);
            link.click();

            // ESPERA: No limpies de inmediato para evitar el error de "texto plano"
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 500); // 250ms es suficiente para que el navegador capture el stream
        } catch (error) {
            console.error("Error al generar informe", error);
            alert("Hubo un error al generar el informe con IA.");
        } finally {
            setCargandoIA(false);
        }
    };

    useEffect(() => {
        const cargarActividades = async () => {
            try {
                const res = await traerActividadesHistoricas(
                    filtros.sede,
                    filtros.propuesta,
                    filtros.periodo,
                    filtros.anioInicio
                );
                if (res && Array.isArray(res)) {
                    const nombresUnicos = [...new Set(res.map(m => m.actividad_nombre))];
                    setMaterias(nombresUnicos.sort());
                } else {
                    setMaterias([]);
                }
            } catch (error) {
                console.error("Error cargando actividades", error);
                setMaterias([]);
            }
        };
        cargarActividades();
    }, [filtros.sede, filtros.propuesta, filtros.periodo, filtros.anioInicio, traerActividadesHistoricas]);

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    return (
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight="600">
                            Análisis de Actividades - Índices Académicos
                        </Typography>
                    </Box>

                    {/* Botón de IA movido a la derecha para mejor equilibrio visual */}
                    <Button
                        variant="contained"

                        onClick={generarInformeIA}
                        startIcon={cargandoIA ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                        sx={{
                            background: cargandoIA ? '#ccc' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}
                    >
                        {cargandoIA ? 'Analizando...' : 'Descargar Informe IA'}
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} md={2}>
                        <TextField select fullWidth label="Sede" name="sede" value={filtros.sede} onChange={handleChange} size="small">
                            {sedes.map(s => <MenuItem key={s.id} value={s.id}>{s.n}</MenuItem>)}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4} md={1}>
                        <TextField select fullWidth label="Propuesta" name="propuesta" value={filtros.propuesta} onChange={handleChange} size="small">
                            {propuestas.map(p => <MenuItem key={p.id} value={p.id}>{p.n}</MenuItem>)}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2}>
                        <TextField select fullWidth label="Periodo" name="periodo" value={filtros.periodo} onChange={handleChange} size="small">
                            {periodos.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={8} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Actividad</InputLabel>
                            <Select name="actividad" value={filtros.actividad} label="Actividad" onChange={handleChange}>
                                <MenuItem value="Todas"><em>-- Todas --</em></MenuItem>
                                {materias.map((nombre, idx) => (
                                    <MenuItem key={idx} value={nombre}>{nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} sm={2} md={1}>
                        <TextField type="number" fullWidth label="Desde" name="anioInicio" value={filtros.anioInicio} onChange={handleChange} size="small" />
                    </Grid>

                    <Grid item xs={6} sm={2} md={1}>
                        <TextField type="number" fullWidth label="Hasta" name="anioFin" value={filtros.anioFin} onChange={handleChange} size="small" />
                    </Grid>

                    <Grid item xs={12} sm={2} md={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<SearchIcon />}
                            onClick={() => onSearch(filtros)}
                            sx={{ height: '40px', fontWeight: 'bold' }}
                        >
                            Consultar Datos
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}