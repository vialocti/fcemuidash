import React, { useEffect, useState } from "react";
import { usePageInicial } from "../../hooks/usepageInicial";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
//import BarChartBasic from '../../utils/graphics/BarChartBasic'

const HomePage = () => {
  const [inscriptos, setInscriptos] = useState({}); //inscriptos hasta la fecha prox. anio
  const [inscriptosPer, setInscriptosPer] = useState([]); //inscriptos hasta la fecha prox. anio por periodos
  const [aluactivos, setAluactivos] = useState({}); //alumnos en calidad de activos por sede
  const [aluactivosProU, setAluactivosProU] = useState({}); //alumnos en calidad de activos por sede

  const [aluactivospro, setAluactivospro] = useState({}); //alumnos en calidad de activos por carrera
  const [egresados, setEgresados] = useState({}); //egresados hasta la fecha periodo lect
  const [cursadas,setCursadas] = useState({})
  const [anioI, setAnioI] = useState("0"); //anio de ingreso
  const anio = new Date().getFullYear(); //anio en curso
  const etiquetaPro = ["CPN", "LA", "LE", "LNRG", "LLO", "CP"];
  const [anioCurso, setAnioCurso]=useState( new Date().getFullYear())

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
    refreshData
  } = usePageInicial(anio);

  //renderizado de la page Home
 //console.log(cantidadProvisorios)
  //funcion para filtrar cada sede valores de insc,egres,alumnos
  const buscarCount = (arrayEgre, sede) => {
    
    let seleccion = arrayEgre.find((ele) => ele.sede === sede);
    if (seleccion) {
      return seleccion.count;
    } else {
      return 0;
    }
  };

  const buscarCountCur = (arrayEgre, sede) => {
    //console.log(arrayEgre, sede)
    let seleccion = arrayEgre.find((ele) => ele.ubicacion === parseInt(sede));
    //console.log(seleccion)
    if (seleccion) {
      return seleccion.tot;
    } else {
      return 0;
    }
  };

  const buscarCountP = (arrayEgre, sede) => {
    let seleccion = arrayEgre.find((ele) => ele.codinst === parseInt(sede));
    if (seleccion) {
      return seleccion.count;
    } else {
      return 0;
    }
  };

  const buscarAluactiPro = (arrayAluPro, pro) => {
    let seleccion = arrayAluPro.find((ele) => ele.carrera === pro);
    // console.log(seleccion)
    if (seleccion) {
      return seleccion.count;
    } else {
      return 0;
    }
  };

  useEffect(() => {
   
    refreshData();

    // Ejecutar refreshData cada minuto
    const intervalId = setInterval(() => {
      refreshData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, [anio]);

  useEffect(() => {
    //poner todos los valores en cero
    const setearValores = () => {
      setEgresados({ mza: 0, sr: 0, ga: 0, es: 0 });

      setInscriptos({ mza: 0, sr: 0, ga: 0, es: 0 });

      setAluactivos({ mza: 0, sr: 0, ga: 0, es: 0 });

      setCursadas({ mza: 0, sr: 0, ga: 0, es: 0 });

      setAluactivosProU({ mza: 0, sr: 0, ga: 0, es: 0})


      /*
      setCursadas({
        mza:0,
        sr:0,
        ga:0,
        es:0
       })
 */
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
          mza: buscarCountP(cantidadProvisorios, "185"),
          sr: buscarCountP(cantidadProvisorios, "186"),
          ga: buscarCountP(cantidadProvisorios, "2714"),
          es: buscarCountP(cantidadProvisorios, "2970"),
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
      const fecha = new Date().toISOString();
      let anio = new Date().getFullYear();
      let fechacompa = anio + "-04-01";
      if (fecha < fechacompa) {
        //console.log(anio, 'anio-1')
        setAnioI(anio);
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
    cantidadInscriptosCursada
  ]);

  //if (loading) return <p>Cargando datos .....</p>;
  if (error) return <p>Error de Carga</p>;

 // console.log(cantidadInscriptosCursada)
  return (
    <Container>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3}>
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Alumnos en Actividad
            </Typography>

            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Total Alumnos: {parseInt(aluactivos.mza) +parseInt(aluactivos.sr) +parseInt(aluactivos.ga) + parseInt(aluactivos.es) + parseInt(aluactivosProU.mza) +parseInt(aluactivosProU.sr) +parseInt(aluactivosProU.ga) + parseInt(aluactivosProU.es)}
            </Typography>

            {cantidadAlu ? (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Mza</TableCell>
                      <TableCell>S.Rafael</TableCell>
                      <TableCell>Gral.Alvear</TableCell>
                      <TableCell>Este</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                     <TableCell>Alumnos(Legajo)</TableCell>
                      <TableCell>{aluactivos.mza}</TableCell>
                      <TableCell>{aluactivos.sr}</TableCell>
                      <TableCell>{aluactivos.ga}</TableCell>
                      <TableCell>{aluactivos.es}</TableCell>
                    </TableRow>
                  
                  <TableRow>  
                      <TableCell>Provisorios(I)</TableCell>
                      <TableCell>{aluactivosProU.mza}</TableCell>
                      <TableCell>{aluactivosProU.sr}</TableCell>
                      <TableCell>{aluactivosProU.ga}</TableCell>
                      <TableCell>{aluactivosProU.es}</TableCell>
                    </TableRow> 
                  </TableBody>
                </Table>
              </>
            ) : null}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3}>
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Egresados Periodo Lectivo{" "}
            </Typography>

            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Total Egresados: {parseInt(egresados.mza) + parseInt(egresados.sr) +parseInt(egresados.ga) + parseInt(egresados.es)}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mza</TableCell>
                  <TableCell>S.Rafael</TableCell>
                  <TableCell>Gral.Alvear</TableCell>
                  <TableCell>Este</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{egresados.mza}</TableCell>
                  <TableCell>{egresados.sr}</TableCell>
                  <TableCell>{egresados.ga}</TableCell>
                  <TableCell>{egresados.es}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3}>
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"blue"}
              color={"white"}
            >
              Inscripciones a Cursada {anioCurso}
            </Typography>
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"blue"}
              color={"white"}
            >
              Total Inscripciones: {parseInt(cursadas.mza) + parseInt(cursadas.sr) + parseInt(cursadas.ga)+ parseInt(cursadas.es)}
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mza</TableCell>
                  <TableCell>S.Rafael</TableCell>
                  <TableCell>Gral.Alvear</TableCell>
                  <TableCell>Este</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{cursadas.mza}</TableCell>
                  <TableCell>{cursadas.sr}</TableCell>
                  <TableCell>{cursadas.ga}</TableCell>
                  <TableCell>{cursadas.es}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3}>
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Aspirantes a Ingreso {anioI}
            </Typography>

           
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Total Aspirantes: {parseInt(inscriptos.sr) + parseInt(inscriptos.mza) + parseInt(inscriptos.ga) + parseInt(inscriptos.es)}
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mza</TableCell>
                  <TableCell>S.Rafael</TableCell>
                  <TableCell>Gral.Alvear</TableCell>
                  <TableCell>Este</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{inscriptos.mza}</TableCell>
                  <TableCell>{inscriptos.sr}</TableCell>
                  <TableCell>{inscriptos.ga}</TableCell>
                  <TableCell>{inscriptos.es}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

      {/*     
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3}>
            <Typography
              variant="h6"
              textAlign={"center"}
              backgroundColor={"black"}
              color={"white"}
            >
              Aspirantes a Ingreso Por Periodos {anioI}
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Fin</TableCell>
                  <TableCell>Inscriptos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cantidadInscPeriodo
                  ? cantidadInscPeriodo.map((ele, index) => (
                      <TableRow key={index}>
                        <TableCell>{ele.fechai}</TableCell>
                        <TableCell>{ele.fechaf}</TableCell>
                        <TableCell>{ele.canti}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

                  */}

        {datosAsistencia ? (
          <>
            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={3}>
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  backgroundColor={"black"}
                  color={"white"}
                >
                  {" "}
                  Asistencia Personal Docente
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reg.Presencial</TableCell>
                      <TableCell>Reg.Virtual</TableCell>
                      <TableCell>Presentes Pres. </TableCell>
                      <TableCell>Presentes Virtual </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableCell>{datosAsistencia.docmarcadosP}</TableCell>
                    <TableCell>{datosAsistencia.docmarcadosV}</TableCell>
                    <TableCell>{datosAsistencia.docmarcadosPS}</TableCell>
                    <TableCell>{datosAsistencia.docmarcadosVS}</TableCell>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Paper elevation={3}>
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  backgroundColor={"black"}
                  color={"white"}
                >
                  Asistencia Personal No Docente
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reg.Presencial</TableCell>
                      <TableCell>Reg.Virtual</TableCell>
                      <TableCell>Presentes Pres.</TableCell>
                      <TableCell>Presentes Virtual</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableCell>{datosAsistencia.NdocmarcadosP}</TableCell>
                    <TableCell>{datosAsistencia.NdocmarcadosV}</TableCell>
                    <TableCell>{datosAsistencia.NdocmarcadosPS}</TableCell>
                    <TableCell>{datosAsistencia.NdocmarcadosVS}</TableCell>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
};

export default HomePage;
