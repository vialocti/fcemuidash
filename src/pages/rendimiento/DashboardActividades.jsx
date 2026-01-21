import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import ResumenMetricas from '../../components/rendimiento/dashactividades/ResumenMetricas';
import FiltrosActividad from '../../components/rendimiento/dashactividades/FiltrosActividad';
import TablaDinamica from '../../components/rendimiento/dashactividades/TablaDinamica';
import { datosHistoricosResultados, traerActividadesHistoricas } from "../../services/servicesCursadas";
import ComparativaAnual from '../../components/rendimiento/dashactividades/ComparativaAnual';

export default function DashboardActividades() {
    const [data, setData] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [promedios, setPromedios] = useState({});
    const [compara, setCompara] = useState(false);
    const [filtrosActivos, setFiltrosActivos] = useState({});

    const handleSearch = async (filtros) => {
        // Aquí llamarías a tu API: const res = await fetch(...)
        // Simulamos data:
        setFiltrosActivos(filtros);
        const mockData = await datosHistoricosResultados(filtros.sede, filtros.propuesta, filtros.periodo, filtros.actividad, filtros.anioInicio, filtros.anioFin)

        if (filtros.anioInicio !== filtros.anioFin && mockData.length > 1) { setCompara(true); }
        else {
            setCompara(false);
        }
        setData(mockData);

        // Cálculo de promedios para el semáforo
        const avg = {
            relacion_regular: (mockData.reduce((a, b) => a + Number(b.relacion_regular), 0) / mockData.length).toFixed(2),
            relacion_promocion: (mockData.reduce((a, b) => a + Number(b.relacion_promocion), 0) / mockData.length).toFixed(2),
            indice_cursada: (mockData.reduce((a, b) => a + Number(b.indice_cursada), 0) / mockData.length).toFixed(2),
            indice_e1: (mockData.reduce((a, b) => a + Number(b.indice_e1), 0) / mockData.length).toFixed(2),
            indice_e2: (mockData.reduce((a, b) => a + Number(b.indice_e2), 0) / mockData.length).toFixed(2),
        };
        setPromedios(avg);
    };

    // Definición de columnas por Tab (puedes expandir esto según tu lista)
    const colGeneral = [{ id: 'anio_academico', label: 'Año' }, { id: 'sede', label: 'Sede' }, { id: 'propuesta', label: 'Propuesta' }, { id: 'periodo', label: 'Periodo' }, { id: 'nombre', label: 'Comisión' }, { id: 'actividad_nombre', label: 'Actividad' }, { id: 'total_inscriptos', label: 'Insc.' }, { id: 'indice_cursada', label: 'Indice Cursada' }, { id: 'indice_e1', label: 'Indice Corto' }, { id: 'indice_e2', label: 'Indice Largo' }];
    const colPromocion = [...colGeneral.slice(0, 6), { id: 'total_inscriptos', label: 'Insc.' }, { id: 'promocionados', label: 'Prom.' }, { id: 'relacion_promocion', label: '% Prom.' }];
    const colRegular = [...colGeneral.slice(0, 6), { id: 'total_inscriptos', label: 'Insc.' }, { id: 'regulares', label: 'Reg.' }, { id: 'relacion_regular', label: '% Reg.' }];
    const colIndiceCursada = [...colGeneral.slice(0, 6), { id: 'total_inscriptos', label: 'Insc.' }, { id: 'indice_cursada', label: 'Indice Cursada' }];
    const colIndiceCorto = [...colGeneral.slice(0, 6), { id: 'total_inscriptos', label: 'Insc.' }, { id: 'indice_e1', label: 'Indice Corto' }];
    const colIndiceLargo = [...colGeneral.slice(0, 6), { id: 'total_inscriptos', label: 'Insc.' }, { id: 'indice_e2', label: 'Indice Largo' }];

    return (
        <Box sx={{ p: 4 }}>
            <FiltrosActividad

                onSearch={handleSearch}
                traerActividadesHistoricas={traerActividadesHistoricas}
                // PASAMOS LOS DATOS AQUÍ:
                data={data}
                promedios={promedios}
                filtrosAplicados={filtrosActivos} />

            {data.length > 0 && (
                <>
                    <ResumenMetricas data={data} promedios={promedios} />



                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                            <Tab label="Todos los Datos" />
                            <Tab label="Relación Promoción" />
                            <Tab label="Regulares" />
                            <Tab label="Índice Cursada" />
                            <Tab label="Índice Ciclo Corto" />
                            <Tab label="Índice Ciclo Largo" />
                            <Tab label="Comparación Anual" />
                        </Tabs>
                    </Box>

                    <Box sx={{ py: 2 }}>
                        {tabValue === 0 && <TablaDinamica rows={data} columnas={colGeneral} />}
                        {tabValue === 1 && (
                            <TablaDinamica
                                rows={[...data].sort((a, b) => a.relacion_promocion - b.relacion_promocion)}
                                columnas={colPromocion}
                                fieldComparator="relacion_promocion"
                                avgValue={promedios.relacion_promocion}
                            />
                        )}
                        {tabValue === 2 && (
                            <TablaDinamica
                                rows={[...data].sort((a, b) => a.relacion_regular - b.relacion_regular)}
                                columnas={colRegular}
                                fieldComparator="relacion_regular"
                                avgValue={promedios.relacion_regular}
                            />
                        )}
                        {tabValue === 3 && (
                            <TablaDinamica
                                rows={[...data].sort((a, b) => a.indice_cursada - b.indice_cursada)}
                                columnas={colIndiceCursada}
                                fieldComparator="indice_cursada"
                                avgValue={promedios.indice_cursada}
                            />
                        )}
                        {tabValue === 4 && (
                            <TablaDinamica
                                rows={[...data].sort((a, b) => a.indice_e1 - b.indice_e1)}
                                columnas={colIndiceCorto}
                                fieldComparator="indice_e1"
                                avgValue={promedios.indice_e1}
                            />
                        )}
                        {tabValue === 5 && (
                            <TablaDinamica
                                rows={[...data].sort((a, b) => a.indice_e2 - b.indice_e2)}
                                columnas={colIndiceLargo}
                                fieldComparator="indice_e2"
                                avgValue={promedios.indice_e2}
                            />
                        )}
                        {tabValue === 6 && (
                            compara ? (
                                // Si compara es true (hay más de un año)
                                <ComparativaAnual data={data} />
                            ) : (
                                // Si compara es false (un solo año seleccionado)
                                <Box
                                    sx={{
                                        p: 5,
                                        textAlign: 'center',
                                        bgcolor: '#fdfdfd',
                                        borderRadius: 2,
                                        border: '1px dashed #ccc',
                                        mt: 2
                                    }}
                                >
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        📉 Gráficas no disponibles
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Se está trabajando en un año en particular.
                                        Para ver las gráficas de evolución, por favor seleccione un <b>rango de años</b> en los filtros.
                                    </Typography>
                                </Box>
                            )
                        )}
                        {/* Repetir para los demás tabs variando fieldComparator y columnas */}
                    </Box>
                </>
            )}
        </Box>
    );
}