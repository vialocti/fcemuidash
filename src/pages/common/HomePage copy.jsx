import {
    Box,
    Container,
    Grid,
    Paper,
    Stack, // Utilizado para apilar elementos verticalmente
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    CircularProgress, // Añadido para manejar el estado de carga
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Iconos de Material-UI
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

// Hook personalizado
import { usePageInicial } from "../../hooks/usepageInicial";
import BarChartSimple from "../../utils/graphics/BarCharSimple";



// --- Componente Auxiliar para Tarjetas de Métrica ---
const MetricCard = ({ title, value, icon, color }) => (
    <Paper elevation={4} sx={{ p: 2, display: 'flex', alignItems: 'center', minHeight: 100, borderLeft: `5px solid ${color}` }}>
        <Box sx={{ color: color, mr: 2, fontSize: 40 }}>{icon}</Box>
        <Stack>
            <Typography variant="caption" color="text.secondary" noWrap>
                {title}
            </Typography>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {value}
            </Typography>
        </Stack>
    </Paper>
);

// --- Lógica del Componente ---

const HomePage = () => {
    const [inscriptos, setInscriptos] = useState({});
    const [inscriptosPer, setInscriptosPer] = useState(null);
    const [plan26I, setPlan26I]=useState(0)
    const [totalRei, setTotalRei]=useState(0)
    const [aluactivos, setAluactivos] = useState({});
    const [aluactivosProU, setAluactivosProU] = useState({});

    const [aluactivospro, setAluactivospro] = useState({});
    const [egresados, setEgresados] = useState({});
    const [cursadas, setCursadas] = useState({})
    const [anioI, setAnioI] = useState("0");
    const anio = new Date().getFullYear();
    const etiquetaPro = ["CPN", "LA", "LE", "LNRG", "LLO", "CP"];
    const [anioCurso, setAnioCurso] = useState(new Date().getFullYear())

    const {
        loading,
        error,
        cantidadSedeEgr,
        cantidadInsc,
        cantidadAlu,
        cantidadAluPro,
        datosAsistencia,
        cantidadInscPeriodo,
        cantidadProvisorios,
        cantidadInscriptosCursada,
        reinscriptos,
        refreshData
    } = usePageInicial(anio);

    const navigate = useNavigate();
    // --- Funciones de Búsqueda ---
    const buscarCount = (arrayEgre, sede) => {
        let seleccion = arrayEgre.find((ele) => ele.sede === sede);
        return seleccion ? seleccion.count : 0;
    };

    const buscarCountCur = (arrayEgre, ubicacion) => {
        return arrayEgre
            .filter(item => item.ubicacion === ubicacion)
            .reduce((sum, item) => sum + Number(item.count), 0);
    };

    const buscarCountP = (arrayEgre, sede) => {
        let seleccion = arrayEgre.find((ele) => ele.codinst === parseInt(sede));
        return seleccion ? seleccion.count : 0;
    };

    const buscarAluactiPro = (arrayAluPro, pro) => {
        let seleccion = arrayAluPro.find((ele) => ele.carrera === pro);
        return seleccion ? seleccion.count : 0;
    };
    const handleCardClick = () => {
        navigate("/alumnos-reinscriptos"); // Cambia esto por tu URL de destino
      };
    // --- Efecto de Refresco ---
    useEffect(() => {
        refreshData();
        // Ejecutar refreshData cada 5 minutos (300000 ms)
        /*
         const intervalId = setInterval(() => {
             refreshData();
         }, 300000);
 
         return () => clearInterval(intervalId);
         */
    }, [anio]); // eslint-disable-line react-hooks/exhaustive-deps

    // --- Efecto de Setear Valores ---
    useEffect(() => {

        const setearValores = () => {
            // Inicialización
            const initialSedeState = { mza: 0, sr: 0, ga: 0, es: 0 };
            setEgresados(initialSedeState);
            setInscriptos(initialSedeState);
            setAluactivos(initialSedeState);
            setCursadas(initialSedeState);
            setAluactivosProU(initialSedeState);
            setInscriptosPer(reinscriptos);
            
            if (cantidadSedeEgr) {
                setEgresados({
                    mza: buscarCount(cantidadSedeEgr, "MZA"),
                    sr: buscarCount(cantidadSedeEgr, "SRF"),
                    ga: buscarCount(cantidadSedeEgr, "GALV"),
                    es: buscarCount(cantidadSedeEgr, "ESTE"),
                });
            }

            if (cantidadAlu) {
                setAluactivos({
                    mza: buscarCount(cantidadAlu, "MZA"),
                    sr: buscarCount(cantidadAlu, "SRF"),
                    ga: buscarCount(cantidadAlu, "GALV"),
                    es: buscarCount(cantidadAlu, "ESTE"),
                });
            }

            if (cantidadInscriptosCursada) {
                setCursadas({
                    mza: buscarCountCur(cantidadInscriptosCursada, 1),
                    sr: buscarCountCur(cantidadInscriptosCursada, 2),
                    ga: buscarCountCur(cantidadInscriptosCursada, 3),
                    es: buscarCountCur(cantidadInscriptosCursada, 4),
                });
            }

            if (cantidadProvisorios) {
                setAluactivosProU({
                    mza: buscarCountP(cantidadProvisorios, "185"), // Mza
                    sr: buscarCountP(cantidadProvisorios, "186"), // San Rafael
                    ga: buscarCountP(cantidadProvisorios, "2714"), // Gral. Alvear
                    es: buscarCountP(cantidadProvisorios, "2970"), // Este
                });
            }

            if (cantidadInsc) {
                setInscriptos({
                    mza: buscarCount(cantidadInsc, "MZA"),
                    sr: buscarCount(cantidadInsc, "SRF"),
                    ga: buscarCount(cantidadInsc, "GALV"),
                    es: buscarCount(cantidadInsc, "ESTE"),
                });
            }
        };

        const setAnioIngreso = () => {
            const fecha = new Date().toISOString().substring(0, 10);
            let anio = new Date().getFullYear();
            let fechacompa = anio + "-04-01";
            if (fecha < fechacompa) {
                setAnioI(anio);
                setAnioCurso(anio - 1);
            } else {
                setAnioI(anio + 1);
            }
        };

        const setValoresPro = () => {
            setAluactivospro({ cpn: 0, la: 0, le: 0, lnrg: 0, llo: 0, cp: 0 });
            if (cantidadAluPro) {
                setAluactivospro({
                    cpn: buscarAluactiPro(cantidadAluPro, "CPN"),
                    la: buscarAluactiPro(cantidadAluPro, "LA"),
                    le: buscarAluactiPro(cantidadAluPro, "LE"),
                    lnrg: buscarAluactiPro(cantidadAluPro, "LNRG"),
                    llo: buscarAluactiPro(cantidadAluPro, "LLO"),
                    cp: buscarAluactiPro(cantidadAluPro, "CP"),
                });
            }
        };
       
        setearValores();
        setValoresPro();
        setAnioIngreso();
    }, [
        cantidadInscPeriodo,
        cantidadAlu,
        cantidadInsc,
        cantidadSedeEgr,
        cantidadAluPro,
        datosAsistencia,
        cantidadInscriptosCursada,
        cantidadProvisorios,
        reinscriptos // Agregado a las dependencias
    ]);

    useEffect(()=>{ 

         const getReinscriptosanio =()=>{
          if (inscriptosPer){
            if(inscriptosPer.data.length>0){
                setTotalRei(inscriptosPer.data.length)
            const targetVersions = [18,19,20];
            const plan20count = inscriptosPer.data.filter(item => targetVersions.includes(item.plan))
            setPlan26I(plan20count.length)
            }
        }
    }

        getReinscriptosanio()

    },[inscriptosPer])


    // Cálculos de Totales para las Cards
    const totalAluActivos = parseInt(aluactivos.mza) + parseInt(aluactivos.sr) + parseInt(aluactivos.ga) + parseInt(aluactivos.es) + parseInt(aluactivosProU.mza) + parseInt(aluactivosProU.sr) + parseInt(aluactivosProU.ga) + parseInt(aluactivosProU.es);
    const totalEgresados = parseInt(egresados.mza) + parseInt(egresados.sr) + parseInt(egresados.ga) + parseInt(egresados.es);
    const totalCursadas = parseInt(cursadas.mza) + parseInt(cursadas.sr) + parseInt(cursadas.ga) + parseInt(cursadas.es);
    const totalInscriptos = parseInt(inscriptos.sr) + parseInt(inscriptos.mza) + parseInt(inscriptos.ga) + parseInt(inscriptos.es);

    // --- Renderizado de Componente ---

    if (loading) {
        return (
            <Container sx={{ py: 5, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>Cargando datos...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 5, textAlign: 'center' }}>
                <Typography variant="h6" color="error">Error de Carga: No se pudieron obtener los datos iniciales.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>

            {/* --- SECCIÓN 1: MÉTRICAS PRINCIPALES (CARDS) --- */}
            <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={2}>
                    <MetricCard
                        title="Alumnos Activos"
                        value={totalAluActivos}
                        icon={<GroupIcon />}
                        color="primary.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <MetricCard
                        title={`Egresados Periodo ${anioCurso}`}
                        value={totalEgresados}
                        icon={<SchoolIcon />}
                        color="success.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <MetricCard
                        title={`Inscripciones a Cursada ${anioCurso}`}
                        value={totalCursadas}
                        icon={<HowToRegIcon />}
                        color="info.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <MetricCard
                        title={`Aspirantes a Ingreso ${anioI}`}
                        value={totalInscriptos}
                        icon={<PeopleOutlineIcon />}
                        color="warning.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                    <MetricCard
                        title={`Total Reinscriptos ${anio}`}
                        value={totalRei}
                        icon={<PeopleOutlineIcon />}
                        color="warning.main"
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <MetricCard
                        title={`Reinscriptos Plan26 ${anio}`}
                        value={plan26I}
                        icon={<PeopleOutlineIcon />}
                        color="warning.main"
                    />
                </Grid>
            </Grid>



            {/* --- SECCIÓN 2: DETALLE POR SEDE (TABLAS Y GRÁFICOS) --- */}
            <Grid container spacing={3}>

                {/* Alumnos en Actividad (Tabla Mejorada) */}
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} sx={{ height: '95%' }}>
                        <Typography
                            variant="h6"
                            sx={{ p: 1, bgcolor: 'primary.dark', color: 'white', textAlign: 'center' }}
                        >
                            Alumnos en Actividad por Sede
                        </Typography>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                                Total Alumnos: <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>{totalAluActivos}</Box>
                            </Typography>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: 'grey.200' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Mza</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>S.Rafael</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Gral.Alvear</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Este</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Alumnos (Legajo)</TableCell>
                                        <TableCell align="right">{aluactivos.mza}</TableCell>
                                        <TableCell align="right">{aluactivos.sr}</TableCell>
                                        <TableCell align="right">{aluactivos.ga}</TableCell>
                                        <TableCell align="right">{aluactivos.es}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ bgcolor: 'primary.light', '&:last-child td': { borderBottom: 0 } }}>
                                        <TableCell>Provisorios (I)</TableCell>
                                        <TableCell align="right">{aluactivosProU.mza}</TableCell>
                                        <TableCell align="right">{aluactivosProU.sr}</TableCell>
                                        <TableCell align="right">{aluactivosProU.ga}</TableCell>
                                        <TableCell align="right">{aluactivosProU.es}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Paper>
                </Grid>

                {/* Egresados (Gráfico Placeholder) */}
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} sx={{ height: '95%' }}>
                        <Typography
                            variant="h6"
                            sx={{ p: 1, bgcolor: 'success.dark', color: 'white', textAlign: 'center' }}
                        >
                            Egresados por Sede ({anioCurso})
                        </Typography>
                        <BarChartSimple data={egresados} title={`Total: ${totalEgresados}`} />
                    </Paper>
                </Grid>

                {/* Inscripciones a Cursada (Gráfico Placeholder) */}
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} sx={{ height: '95%' }}>
                        <Typography
                            variant="h6"
                            sx={{ p: 1, bgcolor: 'info.dark', color: 'white', textAlign: 'center' }}
                        >
                            Inscripciones a Cursada por Sede ({anioCurso})
                        </Typography>
                        <BarChartSimple data={cursadas} title={`Total: ${totalCursadas}`} />
                    </Paper>
                </Grid>

                {/* Aspirantes a Ingreso (Gráfico Placeholder) */}
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} sx={{ height: '95%' }}>
                        <Typography
                            variant="h6"
                            sx={{ p: 1, bgcolor: 'warning.dark', color: 'white', textAlign: 'center' }}
                        >
                            Aspirantes a Ingreso por Sede ({anioI})
                        </Typography>
                        <BarChartSimple data={inscriptos} title={`Total: ${totalInscriptos}`} />
                    </Paper>
                </Grid>
            </Grid>



            {/* --- SECCIÓN 3: ASISTENCIA DE PERSONAL --- */}
            {datosAsistencia ? (
                <Box>
                    <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>
                        Estado de Asistencia Actual
                        <AccessTimeIcon sx={{ verticalAlign: 'middle', ml: 1, color: 'text.secondary' }} />
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3}>
                                <Typography
                                    variant="h6"
                                    sx={{ p: 1, bgcolor: 'secondary.dark', color: 'white', textAlign: 'center' }}
                                >
                                    Personal Docente
                                </Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Reg. Presencial</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Reg. Virtual</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Presentes Pres.</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Presentes Virtual</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{datosAsistencia.docmarcadosP}</TableCell>
                                            <TableCell>{datosAsistencia.docmarcadosV}</TableCell>
                                            <TableCell sx={{ bgcolor: 'success.light' }}>{datosAsistencia.docmarcadosPS}</TableCell>
                                            <TableCell sx={{ bgcolor: 'success.light' }}>{datosAsistencia.docmarcadosVS}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={3}>
                                <Typography
                                    variant="h6"
                                    sx={{ p: 1, bgcolor: 'secondary.dark', color: 'white', textAlign: 'center' }}
                                >
                                    Personal No Docente
                                </Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Reg. Presencial</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Reg. Virtual</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Presentes Pres.</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Presentes Virtual</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{datosAsistencia.NdocmarcadosP}</TableCell>
                                            <TableCell>{datosAsistencia.NdocmarcadosV}</TableCell>
                                            <TableCell sx={{ bgcolor: 'success.light' }}>{datosAsistencia.NdocmarcadosPS}</TableCell>
                                            <TableCell>{datosAsistencia.NdocmarcadosVS}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
                    No hay datos de asistencia de personal disponibles actualmente.
                </Typography>
            )}
        </Container>
    );
};

export default HomePage;