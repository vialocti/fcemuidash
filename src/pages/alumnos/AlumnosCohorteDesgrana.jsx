import React, { useEffect, useState } from "react";

import { traerDesmebraCohorte } from "../../services/servicesAlumnos";
import { traerIngresantesSedePropuestaTipo } from "../../services/servicesIngresantes";

import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import LineChart from "../../utils/graphics/LineChart";
import BarCharts from "../../utils/graphics/BarCharts";

const AlumnosCohorteDesgrana = () => {
  //const [cantidad, setCantidad]= useState(0)
  const [ingreAnio, setIngreAnio] = useState(null);
  const [alumnosDes, setAlumnosDes] = useState(null);
  const [labels, setLabels] = useState(null);
  const [anioI, setAnioI] = useState(2019);
  const [anioFC, setAnioFC] = useState(2023);
  const [sede, setSede] = useState("1");
  const [carrera, setCarrera] = useState("8");
  const [datos, setDatos] = useState(null);
  const [tgrafico, setTgrafico] = useState("1");

  useEffect(() => {
    const getTraerDatos = async () => {
      //console.log('eureka')

      setDatos(alumnosDes.map((data) => data.total.reinsc));
      setLabels(alumnosDes.map((data) => data.anio));
    };
    //datos.unshift(ingreAnio[0].canti)
    //labels.unshift(anioI)
    /*{
            
            labels:alumnosDes.map((data)=>data.anio),
            datasets:[{
              label:"Numero de Reinsc",
              data:alumnosDes.map((data)=>data.total.reinsc)
            }]
          
          }
        )
*/

    if (alumnosDes) {
      getTraerDatos();
    }
  }, [alumnosDes]);

  /*
  const buscarInfo =()=>{

  }
*/
  const onHandleChange = (event) => {
    //console.log(event.target.name)
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
    } else if (event.target.name === "anioFC") {
      setAnioFC(event.target.value);
    } else if (event.target.name === "sede") {
      setSede(event.target.value);
    } else if (event.target.name === "propuesta") {
      setCarrera(event.target.value);
    } else if (event.target.name === "tgrafico") {
      setTgrafico(event.target.value);
    }
  };
  const onHandleinfo = async () => {
    if (anioI > 2014) {
      setIngreAnio(
        await traerIngresantesSedePropuestaTipo(anioI, sede, carrera, 1)
      );
      setAlumnosDes(
        await traerDesmebraCohorte(anioI, sede, carrera, anioFC, 1)
      );
    }
  };

  const traerCarrera = (carrera) => {
    if (carrera === "1") {
      return "Contador Pub.Nacional";
    } else if (carrera === "2") {
      return "Lic.Administración";
    } else if (carrera === "3") {
      return "Lic.Economía";
    } else if (carrera === "6") {
      return "Lic.Gestión Neg.Regionales";
    } else if (carrera === "7") {
      return "Lic.Logogistica";
    } else if (carrera === "8") {
      return "Contador Público";
    }
  };

  const traerSede = (sede) => {
    if (sede === "1") {
      return "Mendoza";
    } else if (sede === "2") {
      return "San Rafael";
    } else if (sede === "3") {
      return "Gral.Alvear";
    } else if (sede === "4") {
      return "Sede Este";
    } else {
      return "";
    }
  };


  
  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
      <Grid container>
        

        <Box
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 2,
            backgroundColor: "beige",
            width: "100%",
            p: 2,
            flexWrap: "wrap",
          }}
        >
          <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>

          
          <Typography variant="h6" textAlign={"center"}>
            Desgranamiento Cohorte por Sede Carrera{" "}
          </Typography>
        </Grid>


          <Grid item xs={12} md={1} sx={{ mr: 1 }}>
            <InputLabel id="anioI">Ingreso</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioI"
              name="anioI"
              onChange={onHandleChange}
              value={anioI}
            />
          </Grid>

          <Grid item xs={12} md={1} sx={{ mr: 1 }}>
            <InputLabel id="anioFC">AñoU.Re</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioFC"
              name="anioFC"
              onChange={onHandleChange}
              value={anioFC}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <InputLabel id="sede">Sede</InputLabel>
            <Select
              variant="standard"
              name="sede"
              id="sede"
              onChange={onHandleChange}
              value={sede}
            >
              <MenuItem value={"1"}>Mendoza</MenuItem>
              <MenuItem value={"2"}>San Rafael</MenuItem>
              <MenuItem value={"3"}>Gral.Alvear</MenuItem>
              <MenuItem value={"4"}>Este</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={4}>
            <InputLabel id="propuesta">Propuesta Academica</InputLabel>
            <Select
              variant="standard"
              name="propuesta"
              id="propuesta"
              onChange={onHandleChange}
              value={carrera}
            >
              <MenuItem value={"1"}>CONTADOR PUBLICO NACIONAL</MenuItem>
              <MenuItem value={"2"}>LICENCIATURA EN ADMINISTRACION</MenuItem>
              <MenuItem value={"3"}>LICENCIATURA EN ECONOMIA</MenuItem>
              <MenuItem value={"6"}>LGN.REGIONALES</MenuItem>
              <MenuItem value={"7"}>LICENCIADO EN LOGISTICA</MenuItem>
              <MenuItem value={"8"}>CONTADOR PUBLICO</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={1}>
            <InputLabel id="labelGrafica">T.Grafica</InputLabel>
            <Select
              variant="standard"
              labelId="tgrafico"
              id="tgrafico"
              name="tgrafico"
              value={tgrafico}
              onChange={onHandleChange}
            >
              <MenuItem value={"1"}>Lineal</MenuItem>
              <MenuItem value={"2"}>Barras</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleinfo}>
              Aceptar
            </Button>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 2,
            backgroundColor: "beige",
            width: "100%",
            p: 2,
            mt: 1,
            mb: 2,
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography>
              Sede:{sede ? traerSede(sede) : "Mendoza"}, Carrera:
              {carrera ? traerCarrera(carrera) : "Contador Publico"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography>Año Ingreso: {anioI > 2014 ? anioI : null}</Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography>
              Ingresantes:{ingreAnio ? ingreAnio[0].canti : 0}
            </Typography>
          </Grid>
        </Box>

        {ingreAnio ? (
          ingreAnio[0].canti > 0 ? (
            alumnosDes ? (
              <>
                <Grid item xs={12} md={4}>
                  <Typography textAlign={"center"}>
                    Datos Reinscripciones
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Año</TableCell>
                        <TableCell>Reinscriptos</TableCell>
                        <TableCell>% Ref.Ingresantes</TableCell>
                        <TableCell>Egre.Acumul.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alumnosDes
                        ? alumnosDes.map((ele, index) => (
                            <TableRow key={index}>
                              <TableCell>{ele.anio}</TableCell>
                              <TableCell>{ele.total.reinsc}</TableCell>
                              <TableCell>
                                {Number(
                                  (ele.total.reinsc / ingreAnio[0].canti) * 100
                                ).toFixed(2)}
                              </TableCell>
                              <TableCell>{ele.tote}</TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12} md={1}></Grid>

                <Grid item xs={12} md={7}>
                  <Box sx={{ width: "100%", height: "300px", mb: 4 }}>
                    {tgrafico === "1" ? (
                      alumnosDes ? (
                        <LineChart
                          datos={datos}
                          etiquetas={labels}
                          anioI={anioI}
                          ingre={ingreAnio[0].canti}
                        />
                      ) : null
                    ) : alumnosDes ? (
                      <BarCharts
                        datos={datos}
                        etiquetas={labels}
                        anioI={anioI}
                        ingre={ingreAnio[0].canti}
                      />
                    ) : null}
                  </Box>
                </Grid>

                <Grid xs={12} md={12}>
                  <Typography variant="h6" textAlign={"center"}>
                    Referencias
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Paper elevation={3}>
                    <Table size="small">
                      <TableRow>
                        <TableCell>
                          Cohorte Nro de Ingresantes a una Carrera en un Año
                          Lectivo
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Tipo_ingreso 1(con título secundario), 3(mayor 25
                          años)
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={2}></Grid>

                <Grid item xs={12} md={5}>
                  <Paper elevation={3}>
                    <Table size="small">
                      <TableRow>
                        <TableCell>
                          En la Tabla se muestra las reinscripciones en años
                          Lectivos sucesivos
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          El porcentaje es el nro de reinscriptos respectos a
                          los ingresantes{" "}
                        </TableCell>

                      </TableRow>
                    </Table>
                  </Paper>
                </Grid>
              </>
            ) : null
          ) : (
            <>
              <Grid>
                <Paper elevation={3} sx={{ padding: "15px" }}>
                  <Typography variant="h6">
                    Aviso: Sin Datos de la Consulta
                  </Typography>
                  <Typography>
                    Carrera no corresponde a la sede, CPN no vigente desde 2019,
                    LNRG pudo no haber Inscripcion en ese año
                  </Typography>
                  <Typography>
                    Sede Mendoza: todas las carreras excepto LNRG
                  </Typography>
                  <Typography>Sede Gral Alvear:solo LNRG</Typography>
                  <Typography>Sede Este:LNRG y Logística</Typography>
                  <Typography>
                    Sede San Rafael: Solo dicta Contador Público
                  </Typography>
                </Paper>
              </Grid>
            </>
          )
        ) : null}
      </Grid>
    </Container>
  );
};

export default AlumnosCohorteDesgrana;
