import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { calcularaniolectivo } from '../../../utils/helpers/calcularanio';
import { getListadoEgreAnioPropuesta } from '../../../services/servicesEgresados';

// --- Componente auxiliar para gestionar el contenido de cada pestaña ---
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                </Box>
            )}
        </div>
    );
}

const EgresadosTab = () => {
    const [egresadosAnio, setEgresadosAnio] = useState([]);
    const [anio, setAnio] = useState(calcularaniolectivo());
    
    // --- NUEVO: Estado para controlar la pestaña activa (0 = Carrera, 1 = Sede) ---
    const [activeTab, setActiveTab] = useState(0);

    // Estados para los totales generales
    const [totalEgresados, setTotalEgresados] = useState(0);
    const [promedioEgresados, setPromedioEgresados] = useState(0.00);
    const [tiempoPromedio, setTiempoPromedio] = useState(0.00);

    // Estados para carreras
    const [totalCPN, setTotalCPN] = useState(0);
    const [totalCP, setTotalCP] = useState(0);
    const [totalLA, setTotalLA] = useState(0);
    const [totalLE, setTotalLE] = useState(0);
    const [totalLLO, setTotalLLO] = useState(0);
    const [totalLNRG, setTotalLNRG] = useState(0);
    const [promedioCP, setPromedioCP] = useState(0.00);
    const [promedioCPN, setPromedioCPN] = useState(0.00);
    const [promedioLA, setPromedioLA] = useState(0.00);
    const [promedioLE, setPromedioLE] = useState(0.00);
    const [promedioLLO, setPromedioLLO] = useState(0.00);
    const [promedioLNRG, setPromedioLNRG] = useState(0.00);
    const [tiempoPromedioPCP, setTiempoPromedioPCP] = useState(0.00);
    const [tiempoPromedioPCPN, setTiempoPromedioPCPN] = useState(0.00);
    const [tiempoPromedioPLA, setTiempoPromedioPLA] = useState(0.00);
    const [tiempoPromedioPLE, setTiempoPromedioPLE] = useState(0.00);
    const [tiempoPromedioPLLO, setTiempoPromedioPLLO] = useState(0.00);
    const [tiempoPromedioPLNRG, setTiempoPromedioPLNRG] = useState(0.00);

    // --- NUEVO: Estado para datos por sede (un solo objeto) ---
    const [datosPorSede, setDatosPorSede] = useState({});

    // --- La lógica de carga de datos no cambia ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getListadoEgreAnioPropuesta(anio, 'T', 'L', 0, 0);
                setEgresadosAnio(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [anio]);
    
    // --- Lógica de cálculo de datos (ahora más compacta para sedes) ---
    useEffect(() => {
        const calcularDatos = () => {
            if (!egresadosAnio || egresadosAnio.length === 0) {
                // Se resetean los estados de carreras y el nuevo estado de sedes
                setTotalEgresados(0);
                setPromedioEgresados(0);
                setTiempoPromedio(0);
                setTotalCP(0); setPromedioCP(0); setTiempoPromedioPCP(0);
                setTotalCPN(0); setPromedioCPN(0); setTiempoPromedioPCPN(0);
                setTotalLA(0); setPromedioLA(0); setTiempoPromedioPLA(0);
                setTotalLE(0); setPromedioLE(0); setTiempoPromedioPLE(0);
                setTotalLLO(0); setPromedioLLO(0); setTiempoPromedioPLLO(0);
                setTotalLNRG(0); setPromedioLNRG(0); setTiempoPromedioPLNRG(0);
                setDatosPorSede({}); // Reseteamos el nuevo estado de sedes
                return;
            }

            const total = egresadosAnio.length;
            const sumaPromedios = egresadosAnio.reduce((acc, curr) => acc + parseFloat(curr.promedio || 0), 0);
            const sumaTiempos = egresadosAnio.reduce((acc, curr) => acc + parseFloat(curr.tiempo || 0), 0); // OJO: usé 'tiempo'
            
            const datosCarreras = {
                CP: { total: 0, sumaPromedio: 0, sumaTiempoP: 0 },
                CPN: { total: 0, sumaPromedio: 0, sumaTiempoP: 0 },
                LA: { total: 0, sumaPromedio: 0, sumaTiempoP: 0 },
                LE: { total: 0, sumaPromedio: 0, sumaTiempoP: 0 },
                LLO: { total: 0, sumaPromedio: 0, sumaTiempoP: 0 },
                LNRG: { total: 0, sumaPromedio: 0, sumaTiempoP: 0 },
            };

            // --- NUEVO: Acumulador para sedes ---
            const sedesAccumulator = {};

            egresadosAnio.forEach(egresado => {
                const carrera = egresado.propuesta;
                const sede = egresado.sede; // Obtener la sede del egresado
                
                if (datosCarreras[carrera]) {
                    datosCarreras[carrera].total += 1;
                    datosCarreras[carrera].sumaPromedio += parseFloat(egresado.promedio || 0);
                    datosCarreras[carrera].sumaTiempoP += parseFloat(egresado.tiempop || 0);
                }

                if (sede) {
                    if (!sedesAccumulator[sede]) {
                        sedesAccumulator[sede] = { total: 0, sumaPromedio: 0, sumaTiempo: 0, sumaTiempoP: 0 };
                    }
                    sedesAccumulator[sede].total += 1;
                    sedesAccumulator[sede].sumaPromedio += parseFloat(egresado.promedio || 0);
                    sedesAccumulator[sede].sumaTiempo += parseFloat(egresado.tiempo || 0);
                    sedesAccumulator[sede].sumaTiempoP += parseFloat(egresado.tiempop || 0);
                }
            });

            // Seteo de estados generales y por carrera (igual que antes)
            setTotalEgresados(total);
            setPromedioEgresados((total > 0 ? sumaPromedios / total : 0).toFixed(2));
            setTiempoPromedio((total > 0 ? sumaTiempos / total : 0).toFixed(2));
            setTotalCP(datosCarreras.CP.total);
            setPromedioCP((datosCarreras.CP.total > 0 ? datosCarreras.CP.sumaPromedio / datosCarreras.CP.total : 0).toFixed(2));
            setTiempoPromedioPCP((datosCarreras.CP.total > 0 ? datosCarreras.CP.sumaTiempoP / datosCarreras.CP.total : 0).toFixed(2));
            // ... (resto de setStates para las demás carreras)
            setTotalCPN(datosCarreras.CPN.total);
            setPromedioCPN((datosCarreras.CPN.total > 0 ? datosCarreras.CPN.sumaPromedio / datosCarreras.CPN.total : 0).toFixed(2));
            setTiempoPromedioPCPN((datosCarreras.CPN.total > 0 ? datosCarreras.CPN.sumaTiempoP / datosCarreras.CPN.total : 0).toFixed(2));
            setTotalLA(datosCarreras.LA.total);
            setPromedioLA((datosCarreras.LA.total > 0 ? datosCarreras.LA.sumaPromedio / datosCarreras.LA.total : 0).toFixed(2));
            setTiempoPromedioPLA((datosCarreras.LA.total > 0 ? datosCarreras.LA.sumaTiempoP / datosCarreras.LA.total : 0).toFixed(2));
            setTotalLE(datosCarreras.LE.total);
            setPromedioLE((datosCarreras.LE.total > 0 ? datosCarreras.LE.sumaPromedio / datosCarreras.LE.total : 0).toFixed(2));
            setTiempoPromedioPLE((datosCarreras.LE.total > 0 ? datosCarreras.LE.sumaTiempoP / datosCarreras.LE.total : 0).toFixed(2));
            setTotalLLO(datosCarreras.LLO.total);
            setPromedioLLO((datosCarreras.LLO.total > 0 ? datosCarreras.LLO.sumaPromedio / datosCarreras.LLO.total : 0).toFixed(2));
            setTiempoPromedioPLLO((datosCarreras.LLO.total > 0 ? datosCarreras.LLO.sumaTiempoP / datosCarreras.LLO.total : 0).toFixed(2));
            setTotalLNRG(datosCarreras.LNRG.total);
            setPromedioLNRG((datosCarreras.LNRG.total > 0 ? datosCarreras.LNRG.sumaPromedio / datosCarreras.LNRG.total : 0).toFixed(2));
            setTiempoPromedioPLNRG((datosCarreras.LNRG.total > 0 ? datosCarreras.LNRG.sumaTiempoP / datosCarreras.LNRG.total : 0).toFixed(2));

            // --- NUEVO: Seteo de datos por sede usando el objeto acumulador ---
            const finalDatosSede = {};
            for (const sedeName in sedesAccumulator) {
                const sedeData = sedesAccumulator[sedeName];
                const totalSede = sedeData.total;
                finalDatosSede[sedeName] = {
                    total: totalSede,
                    promedio: (totalSede > 0 ? sedeData.sumaPromedio / totalSede : 0).toFixed(2),
                    tiempoPromedio: (totalSede > 0 ? sedeData.sumaTiempo / totalSede : 0).toFixed(2),
                    tiempoPromedioP: (totalSede > 0 ? sedeData.sumaTiempoP / totalSede : 0).toFixed(2),
                };
            }
            setDatosPorSede(finalDatosSede);
        };

        calcularDatos();
    }, [egresadosAnio]);

    // --- NUEVO: Manejador para el cambio de pestaña ---
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const determinarColorDeFondo = (car) => {
        // ... (lógica de color existente)
        if (['CP', 'CPN', 'LA', 'LE', 'LLO', 'LNRG'].includes(car || '')) return 'success.light';
        return 'grey.300';
    };

    return (
        <Grid container spacing={2}>
            {/* Título General */}
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant='h4'>Datos de Egresados</Typography>
                </Paper>
            </Grid>

            {/* Fila de Totales Generales (Visible en ambas pestañas) */}
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography>Egresados Totales</Typography>
                    <Typography variant='h5'>{totalEgresados}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography>Promedio General</Typography>
                    <Typography variant='h5'>{promedioEgresados}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography>Tiempo Promedio (años)</Typography>
                    <Typography variant='h5'>{tiempoPromedio}</Typography>
                </Paper>
            </Grid>

            {/* --- NUEVO: Contenedor de Pestañas --- */}
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Detalle por Carrera" id="tab-0" aria-controls="tabpanel-0" />
                        <Tab label="Detalle por Sede" id="tab-1" aria-controls="tabpanel-1" />
                    </Tabs>
                </Box>

                {/* --- Panel de Contenido para "Análisis por Carrera" --- */}
                <TabPanel value={activeTab} index={0}>
                    <Grid item xs={12} sm={6} md={2}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('CP') }}>
                            <Typography variant='h6'>Contador Público</Typography>
                            <Typography  variant='h6'>Egresados: {totalCP}</Typography>
                            <Typography variant='h6'>Promedio: {promedioCP}</Typography>
                            <Typography variant='h6'>T.Promedio: {tiempoPromedioPCP}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LA') }}>
                            <Typography variant='h6'>Lic. Administración</Typography>
                            <Typography variant='h6'>Egresados: {totalLA}</Typography>
                            <Typography variant='h6'>Promedio: {promedioLA}</Typography>
                            <Typography variant='h6'>T.Promedio: {tiempoPromedioPLA}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LE') }}>
                            <Typography variant='h6'>Lic. Economía</Typography>
                            <Typography variant='h6'>Egresados: {totalLE}</Typography>
                            <Typography variant='h6'>Promedio: {promedioLE}</Typography>
                            <Typography variant='h6'>T.Promedio : {tiempoPromedioPLE}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LLO') }}>
                            <Typography variant='h6'>Lic. Logística</Typography>
                            <Typography variant='h6'>Egresados: {totalLLO}</Typography>
                            <Typography variant='h6'>Promedio: {promedioLLO}</Typography>
                            <Typography variant='h6'>T.Promedio: {tiempoPromedioPLLO}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('CPN') }}>
                            <Typography variant='h6'>Cont.Público Nacional</Typography>
                            <Typography variant='h6'>Egresados: {totalCPN}</Typography>
                            <Typography variant='h6'>Promedio: {promedioCPN}</Typography>
                            <Typography variant='h6'>T.Promedio: {tiempoPromedioPCPN}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: determinarColorDeFondo('LNRG') }}>
                            <Typography variant='h6'>Lic. Neg. RG</Typography>
                            <Typography variant='h6'>Egresados: {totalLNRG}</Typography>
                            <Typography variant='h6'>Promedio: {promedioLNRG}</Typography>
                            <Typography variant='h6'>T.Promedio: {tiempoPromedioPLNRG}</Typography>
                        </Paper>
                    </Grid>
                </TabPanel>

                {/* --- Panel de Contenido para "Análisis por Sede" --- */}
                <TabPanel value={activeTab} index={1}>
                    {/* Iteramos sobre el nuevo estado 'datosPorSede' para generar las tarjetas dinámicamente */}
                    {Object.keys(datosPorSede).sort().map(sedeName => (
                        <Grid item xs={12} sm={6} md={3} key={sedeName}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{sedeName}</Typography>
                                <Typography variant='h6'>Egresados: {datosPorSede[sedeName].total}</Typography>
                                <Typography variant='h6'>Promedio: {datosPorSede[sedeName].promedio}</Typography>
                                <Typography variant='h6'>T.Promedio: {datosPorSede[sedeName].tiempoPromedio}</Typography>
                                <Typography variant='h6'>T.Promedio: {datosPorSede[sedeName].tiempoPromedioP}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </TabPanel>
            </Grid>
        </Grid>
    );
};

export default EgresadosTab;